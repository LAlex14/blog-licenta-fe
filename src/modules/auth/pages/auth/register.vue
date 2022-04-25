<template>
  <div class="mx-auto w-full max-w-sm lg:w-96">
    <div>
      <img class="h-12 w-auto" alt="Workflow" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"/>
      <h2 class="mt-6 text-3xl font-extrabold text-gray-900">{{ $t('Sign in to your account') }}</h2>
    </div>

    <div class="mt-8">
      <BaseForm
        v-slot="{ meta }"
        @submit="onSubmit">

        <BaseInput
          v-model="model.email"
          :label="$t('Email address')"
          :name="$t('Email')"
          :placeholder="$t('user@email.com')"
          rules="required|email"
        />

        <BaseInput
          v-model="model.password"
          :label="$t('Password')"
          :name="$t('Password')"
          :placeholder="$t('Password')"
          rules="required"
          type="password"
        />

        <div class="flex items-center justify-between">
          <BaseInput
            class="my-0"
            v-model="model.remember_me"
            :label="$t('Remember me')"
            :name="$t('Remember')"
            type="checkbox"
          />

          <div class="text-sm">
            <a
              class="font-medium text-indigo-600 hover:text-indigo-500"
              href="#"
            >
              {{ $t('Forgot your password ?') }}
            </a>
          </div>
        </div>

        <BaseButton
          class="mt-8"
          :disabled="!meta.valid"
          :label="$t('Sign In')"
          block
          type="submit"
          variant="primary"
        />
      </BaseForm>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  data() {
    return {
      model: {
        email: '',
        password: '',
        remember_me: false
      }
    }
  },
  methods: {
    onSubmit() {
      this.$error(this.$t('Login not implemented yet'))
    }
  }
})
</script>
<route lang="yaml">
name: Register
</route>
<style>
</style>
