<template>
  <div class="bg-white bg-opacity-60 shadow px-4 py-5 sm:px-6 rounded-lg">
    <img
      v-if="blogImage"
      :alt="$t('blog cover image')"
      :src="blogImage"
      class="object-cover mx-auto mb-5 rounded-lg max-h-80"
    />
    <div class="text-lg text-center">
      <div class="flex justify-between items-center">
        <div class="w-14"/>
        <span
          :class="categoryColorClasses"
          class="px-3 py-1 rounded-full text-base text-center text-indigo-600 font-semibold tracking-wide uppercase"
        >
        {{ blog?.category?.name }}
        </span>
        <LikeBlog class="justify-self-end"/>
      </div>
      <span class="mt-2 block text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
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
        @click="showAuthModal = true"
      />
    </div>
    <div class="mt-7 sm:flex justify-between text-sm font-medium text-gray-600">
      <button
        class="text-indigo-500"
        @click="goToAuthorPage"
      >
        @{{ authorFullName }}
      </button>
      <div>{{ $t('Posted on:') }} {{ createdDate }}</div>
    </div>
    <div
      v-if="isLoggedIn"
      class="flex space-x-1 text-sm text-gray-500"
    >
      <span>{{ (blog.views || 0) + ' ' + $t('views') }}</span>
      <span> &middot; {{ (blog.likes_count || 0) + ' ' + $t('likes') }} </span>
      <span> &middot; {{ (blog.readings || 0) + ' ' + $t('readings') }} </span>
    </div>
  </div>
  <div
    v-if="isLoggedIn"
    class="mt-8"
  >
    <CommentCreate
      :blog-id="blog.id"
      class="mb-4"
    />
    <div
      v-if="blog?.comments.length"
      class="space-y-4"
    >
      <CommentView
        v-for="comment in [].concat(blog.comments).reverse()"
        :key="comment.id"
        :comment="comment"
      />
    </div>
  </div>
  <AuthModal v-model="showAuthModal"/>
</template>

<script setup>
import AuthModal from "@/components/AuthModal.vue";
import CommentView from "@/modules/blogs/components/CommentView.vue";
import CommentCreate from "@/modules/blogs/components/CommentCreate.vue";
import LikeBlog from "@/modules/blogs/components/LikeBlog.vue";</script>

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
      required: true,
    },
  },
  data() {
    return {
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
    blogImage() {
      return this.blog?.public_image || this.blog?.image;
    },
    categoryColorClasses() {
      return this.$store.state.blogs.categoryColorsClass[this.blog?.category_id] || '';
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
    },
    blog() {
      return this.$store.getters['blogs/blogBySlug'](this.slug);
    }
  },
  methods: {
    goToAuthorPage() {
      if (this.isLoggedIn) {
        this.$router.push(`/blogs/authors/${this.blog.creator.id}`);
        return
      }
      this.showAuthModal = true;
    }
  },
  async created() {
    if (this.isLoggedIn) {
      await this.$store.dispatch('blogs/addViewOnBlog', this.blog.id);
    }
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
