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

          <div class="mt-6 relative flex items-start">
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

          <BaseImageUpload
            v-model="blog.image"
            class="mt-6"
          />

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
      </div>


      <div class="mt-5 flex justify-end space-x-4">
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
    </form>
  </div>
</template>

<script>
import BaseSelect from "@/components/form/BaseSelect.vue";
import BaseImageUpload from "@/modules/blogs/components/BaseImageUpload.vue";
import {computed} from "vue";

export default {
  name: "BlogForm",
  components: {
    BaseSelect,
    BaseImageUpload,
  },
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
}

</script>

