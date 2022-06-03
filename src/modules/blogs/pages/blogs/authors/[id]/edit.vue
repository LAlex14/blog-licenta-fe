<template>
  <div class="space-y-6">
    <div>
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Profile</h3>
        <p class="mt-1 text-sm text-gray-500">This information will be displayed publicly so be careful what you
          share.</p>
      </div>

    </div>

    <div class="mt-6 grid grid-cols-1 gap-y-4 gap-x-10 sm:grid-cols-2">
      <BaseInput
        v-model="form.first_name"
        :label="$t('First name')"
        class="w-full"
      />

      <BaseInput
        v-model="form.last_name"
        :label="$t('Last name')"
        class="w-full"
      />

      <BaseInput
        v-model="form.email"
        :label="$t('Email')"
        class="w-full"
      />

      <BaseInput
        v-model="form.job_title"
        :label="$t('Job title')"
        class="w-full"
      />

      <BaseInput
        v-model="form.twitter_link"
        :label="$t('Twitter link')"
        class="w-full"
      />

      <BaseInput
        v-model="form.linkedin_link"
        :label="$t('Linkedin link')"
        class="w-full"
      />

      <BaseImageUpload v-model="form.avatar"/>

      <div class="h-full flex flex-col">
        <label class="block text-sm font-medium text-gray-700" for="about"> About </label>
        <div class="mt-1 flex flex-grow">
              <textarea
                id="about"
                v-model="form.description"
                class="flex-grow shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                name="about"
              />
        </div>
        <p class="mt-1 text-sm text-gray-500">Write a few sentences about yourself.</p>
      </div>
    </div>
  </div>

  <div class="mt-5 flex justify-end space-x-4">
    <BaseButton
      :label="$t('Cancel')"
      variant="secondary"
      @click="$router.go(-1)"
    />
    <BaseButton
      :label="$t('Save')"
      @click="updateProfile"
    />
  </div>
</template>

<script>
import BaseImageUpload from "@/modules/blogs/components/BaseImageUpload.vue";

export default {
  name: "edit",
  components: {
    BaseImageUpload
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      form: {
        first_name: "",
        last_name: "",
        email: "",
        job_title: "",
        description: "",
        twitter_link: "",
        linkedin_link: "",
      }
    }
  },
  methods: {
    initiateUser() {
      if (String(this.$user.id) !== String(this.id)) {
        this.$router.push('/blogs/authors');
        this.$error(this.$t('You are not authorized to do this action'));
      }
      this.form = {
        first_name: this.$user.first_name,
        last_name: this.$user.last_name,
        job_title: this.$user.job_title,
        description: this.$user.description,
        twitter_link: this.$user.twitter_link,
        linkedin_link: this.$user.linkedin_link,
        email: this.$user.email,
        avatar: this.$user.avatar,
      }
    },
    async updateProfile() {
      try {
        await this.$store.dispatch('auth/updateProfile', this.form)
        this.$success(this.$t('Profile updated successfully'));
        await this.$router.push(`/blogs/authors/${this.$user.id}`);
      } catch (e) {
        this.$error(this.$t('Something went wrong'));
      }
    }
  },
  created() {
    this.initiateUser();
  }
}
</script>

<route>
{
name: 'EditProfile',
meta: {
requiresAuth: true
}
}
</route>

<style scoped>

</style>
