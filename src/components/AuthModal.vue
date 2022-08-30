<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot :show="modelValue" as="template">
    <Dialog as="div" class="relative z-50" @close="closeModal">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                       leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
      </TransitionChild>

      <div class="fixed z-40 inset-0 overflow-y-auto">
        <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
                           enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                           enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                           leave-from="opacity-100 translate-y-0 sm:scale-100"
                           leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-md sm:w-full sm:p-6">
              <div>
                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <ExclamationIcon aria-hidden="true" class="h-6 w-6 text-red-600"/>
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                    {{ $t('In order to continue you must be logged in') }}
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius
                      aliquam laudantium explicabo pariatur iste dolorem animi vitae error totam. At sapiente aliquam
                      accusamus facere veritatis.
                    </p>
                  </div>
                  <ul class="mt-6 space-y-4" role="list">
                    <li v-for="reason in reasons" :key="reason" class="flex">
                      <CheckIcon class="flex-shrink-0 w-6 h-6 text-green-500"/>
                      <span class="ml-3 text-gray-500">{{ reason }}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <router-link
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  to="/auth"
                >
                  {{ $t('Sign in') }}
                </router-link>
                <button
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  @click="closeModal"
                >
                  {{ $t('Cancel') }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'
import {CheckIcon, ExclamationIcon} from '@heroicons/vue/outline'

const reasons = [
  'Filter blogs by categories and authors',
  'Sort blogs by views or readings',
  'See all authors and their stats',
  'Read private blogs completely',
  'Create and edit Blogs',
  'Write and read comments',
  'Save blogs',
  'Rate blogs',
];

</script>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    closeModal() {
      this.$emit('update:modelValue', false);
    }
  }
}
</script>
