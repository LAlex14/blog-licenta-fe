<template>
  <BaseDialog
    v-if="modelValue"
    v-model="modelValue"
  >
    <div>
      <div class="self-start px-3.5 space-x-4 pt-2 text-grey-700 border-b pb-1">
        <span
          v-for="option in options"
          :key="option"
          :class="{ 'text-black font-medium' : selectedOption.value === option.value }"
          class="cursor-pointer"
          @click="selectedOption = option"
        >
          {{ option.label }}
        </span>
      </div>
    </div>
    <div class="w-full">
      <div v-show="selectedOption.value === 'stock_images'">
        <PexelsPhotoSearch
          v-model="selectedImg"
          :keyphrase="keyphrase"
        />
      </div>
      <div
        v-if="selectedOption.value === 'custom_image'"
        class="w-full px-3 my-4 space-y-4"
      >
        <BaseInput
          v-model="selectedImg.src"
          :label="$t('Source')"
          inline-errors
        />
        <BaseInput
          v-model="selectedImg.alt"
          :label="$t('Alternative description')"
        />
      </div>
    </div>
    <template #footer>
      <BaseButton
        :disabled="!selectedImg.src"
        :label="$t('Insert image')"
        class="my-3"
        @click="onInsert"
      />
    </template>
  </BaseDialog>
</template>

<script>
import PexelsPhotoSearch from "@/modules/blogs/components/PexelsPhotoSearch.vue";

export default {
  name: "InsertImagePopup",
  components: {
    PexelsPhotoSearch
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    keyphrase: {
      type: String,
      default: ''
    },
    per_page: {
      type: Number,
      default: 15
    }
  },
  data() {
    return {
      options: [
        {
          value: "stock_images",
          label: this.$t('Stock Images')
        },
        {
          value: "custom_image",
          label: this.$t('Custom Image')
        }
      ],
      selectedOption: null,
      selectedImg: {
        src: '',
        alt: '',
        url: '',
        photographer: ''
      },
    }
  },
  methods: {
    resetSelectedImg() {
      this.selectedImg = {
        src: '',
        alt: '',
        url: '',
        photographer: ''
      }
    },
    onInsert() {
      this.$emit('insert-image', this.selectedImg);
    }
  },
  async created() {
    this.selectedOption = this.options[0];
  },
}
</script>
