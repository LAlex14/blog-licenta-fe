<template>
  <div class="mx-auto w-full max-w-sm lg:w-96">
    <div>
      <img alt="Workflow" class="h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"/>
      <h2 class="mt-6 text-3xl font-extrabold text-gray-900">{{ $t('Sign in to your account') }}</h2>
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

        <BaseInput
          v-model="model.password"
          :label="$t('Password')"
          :placeholder="$t('Password')"
          name="password"
          rules="required"
          type="password"
        />

        <router-link
          class="flex justify-end text-sm font-medium text-indigo-600 hover:text-indigo-500"
          to="/auth/forgot-password"
        >
          {{ $t('Forgot your password?') }}
        </router-link>

        <BaseButton
          :disabled="!meta.valid"
          :label="$t('Sign In')"
          block
          class="my-6"
          type="submit"
          variant="primary"
        />
      </BaseForm>

      <div class="flex items-center justify-end">
        <router-link
          class="text-sm block font-medium text-indigo-600 hover:text-indigo-500"
          to="/auth/register"
        >
          {{ $t("Don't have an account? Register") }}
        </router-link>
      </div>
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
      }
    }
  },
  methods: {
    onFormSubmit() {
      this.login(this.model);
    },
    async login(data) {
      await this.$store.dispatch('auth/login', data);
    },
    async verifyEmail() {
      if (!this.$route.query.token) {
        return;
      }
      const data = {
        token: this.$route.query.token
      }
      await this.login(data);
      this.$success(this.$t('Your account has been activated successfully'))
    }
  },
  mounted() {
    this.verifyEmail();
  }

})
</script>
<route>
{
name: 'Login'
}
</route>
<style>
</style>
