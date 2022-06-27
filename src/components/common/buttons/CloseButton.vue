<template>
  <button
    aria-label="Close"
    class="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
    type="button"
    v-bind="$attrs"
  >
    <BaseLoading v-if="loading"/>
    <svg
      v-else
      :class="{
        'h-4 w-4': size === 'sm',
        'h-6 w-6': size === 'md',
      }"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"
        stroke-width="2"
      />
    </svg>
  </button>
</template>
<script>

export default {
  props: {
    loading: Boolean,
    size: {
      type: String,
      default: 'md'
    }
  }
}
</script>
<style>
</style>
