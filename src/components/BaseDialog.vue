<template>
  <div
    class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center sm:-mt-32 dialog-wrapper"
    @keydown.esc="onClose"
    v-bind="$attrs"
  >
    <transition
      enter-active-class="ease-out duration-300"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-class="opacity-0"
      leave-to-class="opacity-100"
      appear
    >
      <div
        v-if="showModal"
        class="fixed inset-0 top-0 transition-opacity"
      >
        <div
          class="absolute inset-0 bg-white opacity-75"
          @click="onClose"
        >
        </div>
      </div>
    </transition>

    <transition
      enter-active-class="ease-out duration-300"
      enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100"
      leave-active-class="ease-out duration-200"
      leave-class="opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      appear
      @after-enter="onAfterEnter"
      @after-leave="onCloseFinished"
    >
      <div
        v-if="showModal"
        class="dialog-container relative bg-white rounded-lg shadow-xl transform transition-all sm:w-full max-h-screen"
        :class="{
          'overflow-hidden overflow-y-auto': !overflowVisible,
          'overflow-visible': overflowVisible,
          'px-4 pt-5 pb-4 sm:p-6': hasBodyMargin,
          'sm:max-w-lg': size === 'md',
          'sm:max-w-2xl': size === 'lg',
          'sm:max-w-4xl': size === 'xlg',
          'sm:max-w-full': size === 'full'
        }"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="absolute top-2 right-2">
          <CloseButton @click="onClose"/>
        </div>
        <div>
          <slot />
        </div>
        <div
          v-if="$slots.footer"
          class="el-dialog__footer flex justify-center border-t border-grey-light"
        >
          <slot name="footer" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import i18n from "@/i18n";
import CloseButton from "@/components/common/buttons/CloseButton.vue";

export default {
  name: "BaseDialog",
  inheritAttrs: false,
  components: {
    CloseButton,
  },
  props: {
    modelValue: Boolean,
    title: {
      type: String,
      default: i18n.t('Delete Information'),
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    hasBodyMargin: {
      type: Boolean,
      default: false
    },
    overflowVisible: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      default: i18n.t('Are you sure ? This will permanently remove the information you are about to delete.'),
    },
    deleteText: {
      type: String,
      default: i18n.t('Delete'),
    },
    cancelText: {
      type: String,
      default: i18n.t('Cancel'),
    },
    type: {
      type: String,
      default: 'danger'
    },
    size: {
      type: String,
      default: 'md'
    }
  },
  emits: ['update:modelValue', 'delete'],
  data() {
    return {
      showModal: this.modelValue
    }
  },
  methods: {
    onDelete() {
      this.showModal = false
      this.$emit('delete')
    },
    onClose() {
      this.showModal = false
    },
    onCloseFinished() {
      this.$emit('update:modelValue', false)
      this.$emit('close', false)
    },
    onAfterEnter() {
      if (!this.$refs.cancel) {
        return
      }
      this.$refs.cancel.focus()
    }
  },
  watch: {
    modelValue(value) {
      this.showModal = value
    }
  },
  mounted() {
    if (this.appendToBody) {
      document.body.appendChild(this.$el);
    }
    document.addEventListener("keyup", event => {
      if (event.code === 'Escape' && this.modelValue) {
        this.onClose()
      }
    })
  },
  unmounted() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
}
</script>
<style scoped>
.dialog-wrapper {
  z-index: 1001;
  top: max(10vh, 140px)
}
</style>
