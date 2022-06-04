<template>
  <div
    :class="[{
      'has-error': errorMessage,
      'flex items-center leading-3': $attrs.type === 'checkbox'
    }, otherClasses]"
    class="my-3 w-full"
  >
    <label
      v-if="(label || $slots.label) && $attrs.type !== 'checkbox'"
      :for="String($attrs.id)"
      class="block text-sm font-medium text-gray-700"
    >
      <slot name="label">
        {{ label }}
        <span v-if="isRequiredField" class="text-gray-500">
          *
        </span>
      </slot>
    </label>

    <div class="relative rounded-md">
      <FormItemError
        :error="errorMessage"
        :rules="rules"
        :show-tooltip="inlineErrors"
      >
        <slot
          :errorMessage="errorMessage"
          :handleBlur="handleBlur"
          :handleChange="handleChange"
          :inputValue="inputValue"
        />

      </FormItemError>
    </div>

    <label
      v-if="(label || $slots.label) && $attrs.type === 'checkbox'"
      :for="String($attrs.id)"
      class="ml-2 block text-sm font-medium text-gray-900 hover:cursor-pointer"
      @click="$emit('click-checkbox')"
    >
      <slot name="label">
        {{ label }}
        <span v-if="isRequiredField" class="text-gray-500">
          *
        </span>
      </slot>
    </label>
  </div>
</template>
<script lang="ts">
import {defineComponent, provide} from "vue";
import {useField} from "vee-validate";
import {InfoIcon, XCircleIcon} from '@zhuowenli/vue-feather-icons'
import FormItemError from "@/components/form/FormItemError.vue";

export default defineComponent({
  inheritAttrs: false,
  components: {
    InfoIcon,
    XCircleIcon,
    FormItemError,
  },
  props: {
    maxLength: {
      type: [Number, String],
      default: ''
    },
    name: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    labelInfo: {
      type: String,
      default: '',
    },
    infoText: {
      type: String,
      default: '',
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    inlineErrors: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: [String, Object],
      default: ''
    },
    layout: {
      type: String,
      default: 'vertical'
    },
    columnCount: {
      type: Number,
      default: 4,
    },
    showErrorIcon: {
      type: Boolean,
      default: true
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    // we don't provide any rules here because we are using form-level validation
    // https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
    const name = props.name || props.label
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(name, props.rules, {
      initialValue: props.modelValue,
    });

    provide('handleChange', handleChange)
    provide('handleBlur', handleBlur)

    return {
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
    };
  },
  computed: {
    hasSuffix() {
      return this.$slots.suffix || (this.clearable && this.modelValue)
    },
    otherClasses() {
      if (this.$attrs.class) {
        return this.$attrs.class
      }
      return ''
    },
    isRequiredField() {
      const hasRequiredAttr = this.$attrs?.required || false;
      const hasRequiredRule = typeof this.rules === 'object' ? this.rules?.required : this.rules?.includes('required');
      return hasRequiredRule || hasRequiredAttr;
    },
  },
  watch: {
    modelValue(val, oldVal) {
      if (val && this.maxLength && val.length > this.maxLength) {
        this.$emit('update:modelValue', oldVal)
        this.inputValue = oldVal
        return
      }

      if (val !== this.inputValue) {
        this.inputValue = val
      }
    }
  }
})
</script>
