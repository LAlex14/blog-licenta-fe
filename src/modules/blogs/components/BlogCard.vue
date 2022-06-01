<template>
  <div class="flex flex-col rounded-lg shadow overflow-hidden">
    <div class="flex-shrink-0">
      <img :src="blogImage" alt="" class="h-48 w-full object-cover rounded-t-lg"/>
    </div>
    <div class="flex-1 p-6 bg-white bg-opacity-80 hover:bg-opacity-40 flex flex-col justify-between">
      <div class="flex-1">
        <div class="flex justify-between items-center">
          <router-link :to="blogsByCategory" class="inline-block">
                <span
                  :class="categoryColorClasses"
                  class="px-3 py-0.5 rounded-full text-sm font-medium"
                >
                  {{ blog.category?.name }}
                </span>
          </router-link>
          <div
            v-if="isLoggedIn"
            class="cursor-pointer"
            @click="pinBlog"
          >
            <PinnedIcon
              v-if="blog.is_pinned"
              class="h-5"
            />
            <UnpinnedIcon
              v-else
              class="h-5"
            />
          </div>
        </div>
        <router-link :to="`/blogs/${blog.slug}`" class="block mt-2">
          <p class="text-xl font-semibold text-gray-900">
            {{ blog.title }}
          </p>
          <p class="mt-3 text-base text-gray-500 truncate-content">
            {{ blog.content }}
          </p>
        </router-link>
      </div>
      <div class="mt-6 flex items-center">
        <div class="flex-shrink-0">
          <router-link :to="blogCreatorLink">
            <span class="sr-only">{{ blogCreatorName }}</span>
            <img :src="blogCreatorAvatar" alt="" class="h-10 w-10 rounded-full"/>
          </router-link>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900">
            <router-link :to="blogCreatorLink" class="hover:underline">
              {{ blogCreatorName }}
            </router-link>
          </p>
          <div class="flex flex-wrap space-x-1 text-sm text-gray-500">
            <time :datetime="blog.created_at">
              {{ createdAt }}
            </time>
            <span> &middot; {{ (blog.views || 0) + ' ' + $t('views') }}</span>
            <span> &middot; {{ (blog.readings || 0) + ' ' + $t('readings') }} </span>
            <span v-if="isLoggedIn"> &middot; {{ (blog.likes_count || 0) + ' ' + $t('likes') }} </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {BookmarkIcon as PinnedIcon} from '@heroicons/vue/solid'
import {BookmarkIcon as UnpinnedIcon} from '@heroicons/vue/outline'</script>

<script>
import {STORAGE_URL, DEFAULT_USER_AVATAR, DEFAULT_BLOG_IMAGE} from "@/modules/common/utils/linkUtils";

export default {
  name: "BlogCard",
  props: {
    blog: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
    blogImage() {
      return this.blog?.public_image || this.blog?.image || DEFAULT_BLOG_IMAGE;
    },
    blogCreatorAvatar() {
      const avatar = this.blog?.creator.avatar;
      if (avatar) {
        return avatar.includes('http') ? avatar : STORAGE_URL + avatar;
      }
      return DEFAULT_USER_AVATAR;
    },
    blogsByCategory() {
      return `/blogs?category_id=${this.blog.category.id}`;
    },
    categoryColorClasses() {
      return this.$store.state.blogs.categoryColorsClass[this.blog.category_id] || '';
    },
    blogCreatorLink() {
      return `/blogs/authors/${this.blog.creator.id}`
    },
    blogCreatorName() {
      return `${this.blog.creator?.first_name} ${this.blog.creator?.last_name}`;
    },
    createdAt() {
      let event = new Date(this.blog.created_at);
      return event.toLocaleDateString('ro-RO')
    },
    userId() {
      return this.$store.state.auth.user.id;
    }
  },
  methods: {
    async pinBlog() {
      await this.$store.dispatch('blogs/pinBlog', {
        blogId: this.blog.id,
        users: [`${this.userId}`],
      })

    }
  }
}
</script>

<style scoped>
.truncate-content {
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
