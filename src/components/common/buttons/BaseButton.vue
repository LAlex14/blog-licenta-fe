<template>
  <div
    :class="{
           'block w-full': block,
           'inline-flex': !block,
           'shadow-sm': !variant.includes('link'),
           [customClass]: customClass
           }"
    class="relative"
  >
    <button
      ref="button"
      :class="{
              'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500': variant === 'primary',
              'text-white bg-gray-400 hover:bg-gray-500 focus:ring-gray-500': variant === 'secondary',
              'text-white bg-red-500 hover:bg-red-700 focus:ring-red-500': variant === 'danger',
              'text-xs px-2.5 py-1.5 leading-4': size === 'xs',
              'text-sm px-4 py-2 leading-4': size === 'sm',
              'text-sm px-5 py-2 leading-5': size === 'md',
              'text-base px-6 py-4 leading-6': size === 'lg',
              'text-base px-8 py-4 leading-6': size === 'xl',
              'opacity-80 cursor-not-allowed': disabled || loading,
              'inline-flex': !block,
              'w-full flex justify-center': block,
            }"
      :disabled="disabled || loading"
      :type="type"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
      v-bind="$attrs"
    >
        <span v-if="loading"
              class="absolute flex w-full items-center justify-center">
            <LoadingIcon :size="size"/>
        </span>

      <span
        :class="{'opacity-0': loading}"
        class="flex flex-wrap items-center font-medium"
      >
            <slot>
                {{ label }}
            </slot>
        </span>
    </button>
  </div>
</template>
<script lang="ts">
import LoadingIcon from "@/components/common/buttons/LoadingIcon.vue";
import {defineComponent, PropType} from "vue";

type ButtonType = "button" | "submit" | "reset" | undefined

export default defineComponent({
  inheritAttrs: false,
  components: {
    LoadingIcon,
  },
  props: {
    block: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'primary'
    },
    type: {
      type: String as PropType<ButtonType>,
      default: 'button',
    },
    size: {
      type: String,
      default: 'md' // xs|sm|md|lg|xl
    },
    customClass: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: '',
    },
  },
  methods: {
    focus() {
      this.$refs.button?.focus()
    }
  },
})
</script>
