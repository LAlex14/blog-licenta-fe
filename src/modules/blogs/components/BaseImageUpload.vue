<template>
  <div>
    <label
      class="block text-sm font-medium text-gray-700"
      htmlFor="cover-image"
    >
      {{ $t('Cover image') }}
    </label>
    <div
      class="relative mt-1 cursor-pointer flex justify-center p-4 border-2 border-gray-300 border-dashed rounded-md"
      @click="$refs.imageInput.click()"
    >
      <div
        :class="{
                  'hidden': image,
                }"
        class="space-y-1 text-center"
      >
        <svg aria-hidden="true" class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor"
             viewBox="0 0 48 48">
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
        </svg>
        <div class="flex text-sm justify-center text-gray-600">
          <label
            class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            htmlFor="file-upload"
            @click.stop
          >
            <span>Upload a file</span>
            <input
              id="file-upload"
              ref="imageInput"
              accept="image/*"
              class="sr-only"
              name="file-upload"
              type="file"
              @change="showImage($event.target.files)"
            />
          </label>
        </div>
        <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
      </div>
      <img
        v-if="image"
        :src="image"
        alt="cover image"
        class="rounded-lg mx-auto max-h-80"
      />
      <div
        v-if="image"
        class="absolute bottom-2 right-2"
      >
        <div class="flex space-x-4">
          <BaseButton
            :label="$t('Change')"
            @click.stop="$refs.imageInput.click()"
          />
          <BaseButton
            :label="$t('Delete')"
            variant="danger"
            @click.stop="deleteBlogImg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {computed} from 'vue';
import {toBase64} from "@/modules/common/utils/imageUtils";

export default {
  name: "BaseImageUpload",
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup(props, {emit}) {
    const image = computed({  // Use computed to wrap the object
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    return {image};
  },
  methods: {
    deleteBlogImg() {
      this.$refs.imageInput.value = null;
      this.showImage('remove');
    },
    async showImage(files) {
      if (typeof files !== 'string') {
        this.image = await toBase64(files[0]);
      }
      if (files === 'remove') {
        this.image = '';
      }
    },
  },
}
</script>

<style scoped>

</style>
