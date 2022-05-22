<template>
  <div class="relative max-w-4xl mx-auto">
    <form class="space-y-8 divide-y divide-gray-200">
      <div class="space-y-8 divide-y divide-gray-200">

        <div>
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
            <p class="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
          </div>
          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label class="block text-sm font-medium text-gray-700" for="first-name"> {{ $t('Title') }} </label>
              <div class="mt-1">
                <input
                  id="first-name"
                  autocomplete="given-name"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  name="first-name"
                  type="text"/>
              </div>
            </div>

            <div class="sm:col-span-2">
              <BaseSelect/>
            </div>

          </div>

          <div class="pt-6">
            <label class="block text-sm font-medium text-gray-700" for="cover-image"> {{ $t('Cover image') }} </label>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div class="space-y-1 text-center">
                <svg aria-hidden="true" class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor"
                     viewBox="0 0 48 48">
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label
                    class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    for="file-upload">
                    <span>Upload a file</span>
                    <input id="file-upload" class="sr-only" name="file-upload" type="file"/>
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          <div class="pt-6">
            <label class="block text-sm font-medium text-gray-700" for="comment">{{ $t('Content') }}</label>
            <div class="mt-1">
            <textarea id="comment"
                      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      name="comment"
                      rows="10"/>
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
                  class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" name="comments"
                  type="checkbox"
                />
              </div>
              <div class="ml-3 text-sm">
                <label class="font-medium text-gray-700" for="comments">{{ $t('Private') }}</label>
                <p class="text-gray-500">{{ $t('Get notified when someones posts a comment on a posting.') }}</p>
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="pt-5">
        <div class="flex justify-end">
          <button
            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="button">
            {{ $t('Cancel') }}
          </button>
          <button
            class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit">
            {{ $t('Post') }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import BaseSelect from "@/components/form/BaseSelect.vue";

export default {
  name: "create",
  components: {BaseSelect}
}
</script>

<route>
{
name: "CreateBlog",
meta: {
requiresAuth: true
}
}
</route>

<style scoped>

</style>
