<template>
  <div class="flex w-full items-baseline justify-between px-3">
    <BaseInput
      v-model="searchInput"
      class="mr-2"
      inline-errors
      @keypress.enter="onSearch"
    />
    <BaseButton
      :disabled="!searchInput"
      :label="$t('Search')"
      class="h-full"
      variant="secondary"
      @click="onSearch"
    />
  </div>
  <div
    ref="images-box"
    class="w-full h-full min-h-24 max-h-80 overflow-y-scroll px-3 relative"
  >
    <BaseLoading
      v-if="loading"
      size="lg"
    />
    <div class="grid grid-cols-3 gap-1.5">
      <img
        v-for="img in images"
        :key="img"
        :alt="img.alt"
        :class="{'border-2 border-indigo-600' : isSelected(img)}"
        :src="img.src"
        class="hover:cursor-pointer rounded-sm"
        object-fit="cover"
        @click="updateModelValue(img)"
      >
    </div>
    <BaseLoading
      v-if="loading && images.length"
      size="md"
    />
    <div
      v-if="noMoreResults"
      class="flex justify-center text-grey-700 py-3"
    >
      {{ $t('No more images') }}
    </div>
  </div>
</template>

<script>
import {pexelImages} from "@/modules/blogs/utils/pexelUtils";

export default {
  name: "PexelsPhotoSearch",
  props: {
    keyphrase: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      vite_pexels_api_key: import.meta.env.VITE_PEXELS_API_KEY,
      images: [],
      searchInput: '',
      searchInputOld: '',
      page: 1,
      imagesBox: null,
      loading: false,
      noMoreResults: false
    }
  },
  methods: {
    updateModelValue(img) {
      let selectedImg;
      if (img.src === this.modelValue.src) {
        selectedImg = {
          src: '',
          alt: '',
          photographer: ''
        }
      } else {
        selectedImg = {
          src: img.src,
          alt: img.alt,
          photographer: img.photographer,
        }
      }
      this.$emit('update:modelValue', selectedImg);
    },
    onSearch() {
      if (this.searchInputOld === this.searchInput) {
        return
      }
      this.searchInputOld = this.searchInput;
      this.noMoreResults = false;
      this.page = 1;
      this.images.length = 0;
      this.getImages(this.searchInput, this.page)
    },
    isSelected(img) {
      return this.modelValue.src === img.src;
    },
    async imagesInfinityLoading() {
      const scrollBottomOfBox = this.imagesBox.scrollHeight - this.imagesBox.scrollTop <= this.imagesBox.clientHeight + 3;
      if (scrollBottomOfBox && this.searchInput && !this.loading && !this.noMoreResults) {
        this.page++;
        await this.getImages(this.searchInput, this.page);
      }
    },
    async getImages(keyphrase, page, per_page) {
      if (this.noMoreResults) {
        return
      }
      this.loading = true;
      const images = await pexelImages({keyphrase, page, per_page})

      for (let i = 0; i < images['photos'].length || 0; i++) {
        const image = images['photos'][i];
        this.images.push({
          src: image.src.large,
          alt: image.alt,
          photographer: image.photographer || this.$t('Unknown'),
        });
      }
      if (images['total_results'] === this.images.length || !images['total_results']) {
        this.noMoreResults = true;
      }
      this.loading = false;
    }
  },
  async created() {
    this.searchInput = this.keyphrase;
    this.searchInputOld = this.searchInput;
    await this.getImages(this.searchInput, this.page);
    this.imagesBox = this.$refs['images-box'];
    this.imagesBox.addEventListener('scroll', this.imagesInfinityLoading);
  }
}
</script>
