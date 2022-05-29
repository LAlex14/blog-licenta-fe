<template>
  <div class="mx-auto w-full max-w-sm lg:w-96">
    <div>
      <img alt="Workflow" class="h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"/>
      <h2 class="mt-6 text-3xl font-extrabold text-gray-900">{{ $t('Create your account') }}</h2>
    </div>

    <div class="mt-8">
      <BaseForm
        v-slot="{ meta }"
        @submit="onFormSubmit">

        <BaseInput
          v-model="model.first_name"
          :label="$t('First Name')"
          :placeholder="$t('John')"
          name="first name"
          rules="required"
        />

        <BaseInput
          v-model="model.last_name"
          :label="$t('Last Name')"
          :placeholder="$t('Kennedy')"
          name="last name"
          rules="required"
        />

        <BaseInput
          v-model="model.email"
          :label="$t('Email address')"
          :placeholder="$t('user@email.com')"
          name="email"
          rules="required|email"
        />

        <BaseInput
          v-model="model.job_title"
          :label="$t('Job title')"
          :placeholder="$t('Developer')"
          name="job title"
        />

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
          :label="$t('Sign Up')"
          block
          class="mt-5 mb-8"
          type="submit"
        />
      </BaseForm>

      <div class="flex items-center justify-end">
        <router-link
          class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          to="/auth"
        >
          {{ $t('Already have an Account? Sign in') }}
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
        first_name: '',
        last_name: '',
        email: '',
        job_title: '',
        password: '',
        password_confirmation: '',
      },
    }
  },
  methods: {
    async onFormSubmit(_, {resetForm}) {
      try {
        await this.$store.dispatch('auth/register', this.model);
        resetForm();
        this.$success(this.$t('Your account has been created successfully. Please confirm your email.'))
      } catch (e) {
        console.warn(e)
      }
    }
  }
})
</script>
<route>
{
name: 'Register'
}
</route>
<style>
</style>
