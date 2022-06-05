<template>
  <div class="flex items-center justify-center my-2">
    <loader-icon :class="{
                  'h-8 w-8': size === 'lg',
                  'h-6 w-6': size === 'md',
                 'h-4 w-4': size === 'xs',
                 'h-5 w-5': size === 'sm',
               }"
                 class="spin-animation"/>
  </div>
</template>
<script lang="ts">
import {LoaderIcon} from '@zhuowenli/vue-feather-icons'
import {defineComponent} from "vue";

export default defineComponent({
  components: {
    LoaderIcon,
  },
  props: {
    size: {
      type: String,
      default: 'md'
    }
  }
})
</script>
<style>
</style>
