<template>
  <div :class="$attrs.class">
    <slot>

    </slot>
    <div
      class="min-h-error my-0.5"
      v-if="rules"
    >
      <div>
        <p
          class="text-xs leading-none text-red-600"
          :key="error"
        >
          {{ error }}
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'FormItemError',
  inheritAttrs: false,
  props: {
    error: {
      type: String,
      default: ''
    },
    rules: {
      type: [String, Object],
      default: ''
    },
  },
})
</script>
<style scoped>
.min-h-error {
  min-height: 12px;
}
</style>
