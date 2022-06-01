<template>
  <div class="relative">
    <form class="space-y-8 divide-y divide-gray-200">
      <div class="space-y-8 divide-y divide-gray-200">
        <div>
          <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 items-center">
            <div class="sm:col-span-4">
              <div class="mt-1">
                <BaseInput
                  v-model="blog.title"
                  :label="$t('Title')"
                  class="w-full"
                />
              </div>
            </div>

            <div class="sm:col-span-2 mb-1">
              <BaseSelect
                :label="$t('Category')"
                :modelValue="blog.category || categories[0]"
                :options="categories"
                required
                @update:modelValue="(value) => {this.blog.category = value}"
              />
            </div>

          </div>

          <div class="pt-6">
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
                  'hidden': previewImage,
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
                v-if="previewImage"
                :src="previewImage"
                alt="cover image"
                class="rounded-lg mx-auto max-h-80"
              />
              <div
                v-if="previewImage"
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

          <div class="pt-6">
            <label class="block text-sm font-medium text-gray-700" htmlFor="comment">{{ $t('Content') }}</label>
            <div class="mt-1">
            <textarea
              id="comment"
              v-model="blog.content"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              name="comment"
              rows="10"
            />
            </div>
          </div>

        </div>


        <div class="pt-6">

          <fieldset>
            <legend class="text-base font-medium text-gray-900">{{ $t('Settings') }}</legend>
            <div class="mt-4 relative flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="comments"
                  v-model="blog.private"
                  class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" name="comments"
                  type="checkbox"
                />
              </div>
              <div class="ml-3 text-sm">
                <label class="font-medium text-gray-700" htmlFor="comments">{{ $t('Private') }}</label>
                <p class="text-gray-500">{{ $t('Only authenticated users will be able to see it') }}</p>
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="pt-5">
        <div class="flex justify-end space-x-4">
          <BaseButton
            :label="$t('Cancel')"
            variant="secondary"
            @click="$router.go(-1)"
          />
          <BaseButton
            :label="$t('Save')"
            @click="$emit('submit')"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import BaseSelect from "@/components/form/BaseSelect.vue";
import {computed} from "vue";

export default {
  name: "BlogForm",
  components: {BaseSelect},
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, {emit}) {
    const blog = computed({  // Use computed to wrap the object
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    return {blog};
  },
  computed: {
    categories() {
      return this.$store.state.blogs.categories;
    }
  },
  data() {
    return {
      previewImage: null,
    };
  },
  methods: {
    deleteBlogImg() {
      this.$refs.imageInput.value = null;
      this.showImage('remove');
    },
    showImage(files) {
      if (typeof files !== 'string') {
        this.blog.image = files[0];
        this.previewImage = URL.createObjectURL(this.blog.image);
      }
      if (files === 'remove') {
        this.blog.image = '';
        this.previewImage = this.blog.image;
      }
    },
  },
  created() {
    if (this.blog.image) {
      this.previewImage = this.blog.image;
    }
  }
}

</script>

