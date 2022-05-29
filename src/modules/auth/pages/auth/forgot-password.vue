<template>
  <div class="mx-auto w-full max-w-sm lg:w-96">
    <div>
      <img alt="Workflow" class="h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"/>
      <h2 class="mt-6 text-3xl font-extrabold text-gray-900">{{ $t('Request reset email') }}</h2>
    </div>

    <div class="mt-8">
      <BaseForm
        v-slot="{ meta }"
        @submit="onFormSubmit">

        <BaseInput
          v-model="model.email"
          :label="$t('Email address')"
          :placeholder="$t('user@email.com')"
          name="email"
          rules="required|email"
        />

        <BaseButton
          :disabled="!meta.valid"
          :label="$t('Send Email')"
          block
          class="mt-5 mb-8"
          type="submit"
        />
      </BaseForm>

      <div class="flex items-center justify-end">
        <router-link
          class="text-sm block font-medium text-indigo-600 hover:text-indigo-500"
          to="/auth"
        >
          {{ $t("Back to login page") }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import AuthService from "@/modules/auth/services/AuthService.js";

export default defineComponent({
  data() {
    return {
      model: {
        email: '',
      }
    }
  },
  methods: {
    async onFormSubmit() {
      try {
        const {data} = await AuthService.forgotPassword(this.model);
        if (!data.message) {
          this.$success(data?.message);
        }
      } catch (e) {
        console.warn(e)
      }
    },
  },
})
</script>

<route>
{
name: 'ForgotPassword'
}
</route>

<style>
</style>
