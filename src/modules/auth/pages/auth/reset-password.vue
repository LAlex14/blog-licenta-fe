<template>
  <div class="mx-auto w-full max-w-sm lg:w-96">
    <div>
      <img alt="Workflow" class="h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"/>
      <h2 class="mt-6 text-3xl font-extrabold text-gray-900">{{ $t('Reset password') }}</h2>
    </div>

    <div class="mt-8">
      <BaseForm
        v-slot="{ meta }"
        @submit="onFormSubmit">

        <BaseInput
          v-model="model.password"
          :label="$t('Password')"
          :placeholder="$t('Password')"
          name="password"
          rules="required"
          type="password"
        />

        <BaseInput
          v-model="model.password_confirmation"
          :label="$t('Confirm Password')"
          :placeholder="$t('Password')"
          name="password confirmation"
          rules="required|confirmed:@password"
          type="password"
        />

        <BaseButton
          :disabled="!meta.valid"
          :label="$t('Send Email')"
          block
          class="mt-5 mb-8"
          type="submit"
          variant="primary"
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
        token: '',
        password: '',
        password_confirmation: '',
      }
    }
  },
  methods: {
    async onFormSubmit() {
      try {
        const {data} = await AuthService.resetPassword(this.model);
        if (data.message) {
          this.$success(data?.message);
          await this.$router.push('/auth');
        }
      } catch (e) {
        console.warn(e)
      }
    },
  },
  mounted() {
    this.model.email = this.$route?.query?.email;
    this.model.token = this.$route?.query?.token;
  }
})
</script>

<route>
{
name: 'ResetPassword'
}
</route>

<style>
</style>
