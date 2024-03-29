<template>
  <Listbox
    :modelValue="modelValue"
    as="div"
    @update:modelValue="(value) => {$emit('update:modelValue', value)}"
  >
    <ListboxLabel class="block text-sm font-medium text-gray-700">{{ label }}</ListboxLabel>
    <div class="mt-1 relative">
      <ListboxButton
        class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        <span class="block truncate">{{ modelValue?.name || '' }}</span>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <SelectorIcon aria-hidden="true" class="h-5 w-5 text-gray-400"/>
        </span>
      </ListboxButton>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                  leave-to-class="opacity-0">
        <ListboxOptions
          class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          <ListboxOption
            v-for="option in options" :key="option.id"
            v-slot="{ active, selected }"
            :value="option"
            as="template"
          >
            <li
              :class="[active ? 'text-white bg-indigo-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-3 pr-9']">
              <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                {{ option.name }}
              </span>

              <span v-if="selected"
                    :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                <CheckIcon aria-hidden="true" class="h-5 w-5"/>
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script>
import {Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions} from '@headlessui/vue'
import {CheckIcon, SelectorIcon} from '@heroicons/vue/solid'

export default {
  name: "BaseSelect",
  components: {Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions, CheckIcon, SelectorIcon},
  emits: ['update:modelValue'],
  props: {
    label: {
      type: String,
      default: '',
    },
    options: {
      required: true,
    },
    modelValue: {
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    if (!props.required) {
      return
    }
    if (!props.modelValue || !Object.keys(props.modelValue).length) {
      emit('update:modelValue', props.options[0])
    }
  },
}
</script>

<style scoped>

</style>
