<template>
  <div>
    <img
      v-if="blog.image"
      :alt="$t('blog cover image')"
      :src="blog.image"
      class="object-cover mx-auto mb-5 rounded-lg max-h-80"
    />
    <div class="text-lg">
      <span class="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
        {{ blog?.category?.name }}
      </span>
      <span class="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          {{ blog?.title }}
      </span>
    </div>
    <div
      :class="{
        'blog-private': hidePrivateBlog
      }"
      class="mt-6 prose-indigo prose-lg text-gray-500"
      v-html="blog?.content"
    />
    <div class="flex justify-center mt-2 mb-8">
      <BaseButton
        v-if="hidePrivateBlog"
        :label="$t('Read more')"
        variant="primary"
        @click="showAuthModal = true"
      />
    </div>
    <div class="mt-7 sm:flex justify-between text-sm font-medium text-gray-600">
      <div class="text-indigo-500">
        @{{ authorFullName }}
      </div>
      <div>{{ $t('Posted on:') }} {{ createdDate }}</div>
    </div>
    <div class="flex space-x-1 text-sm text-gray-500">
      <span> {{ blog.readings }} read </span>
      <span aria-hidden="true"> &middot; </span>
      <span> {{ blog.views }} views  </span>
    </div>
  </div>
  <AuthModal v-model="showAuthModal"/>
</template>

<script setup>
import AuthModal from "@/components/AuthModal.vue";</script>

<script>
const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export default {
  name: "[slug]",
  props: {
    slug: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      blog: '',
      showAuthModal: false
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
    hidePrivateBlog() {
      return this.blog?.private && !this.isLoggedIn;
    },
    authorFullName() {
      return `${this.blog?.creator?.first_name} ${this.blog?.creator?.last_name}`
    },
    createdDate() {
      if (!this.blog) {
        return ''
      }
      let date = new Date(this.blog.created_at);
      return date.toLocaleDateString(this.$t('locales'), dateOptions);
    }
  },
  methods: {
    async getBlog() {
      try {
        this.blog = await this.$store.dispatch('publicBlogs/getBlogBySlug', this.slug);
      } catch (e) {
        await this.$router.push('/blogs');
      }
    }
  },
  async created() {
    await this.getBlog();
  }
}
</script>

<route>
{
name: 'ViewBlog'
}
</route>

<style>
.blog-private {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.blog-private:after {
  content: "";
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  pointer-events: none;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(249, 250, 251, 1) 90%);
  width: 100%;
  height: 12em;
}
</style>
