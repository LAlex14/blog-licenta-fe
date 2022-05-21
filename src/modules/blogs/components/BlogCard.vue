<template>
  <div class="flex flex-col rounded-lg shadow overflow-hidden">
    <div class="flex-shrink-0">
      <img :src="blogImage" alt="" class="h-48 w-full object-cover rounded-t-lg"/>
    </div>
    <div class="flex-1 p-6 bg-white bg-opacity-40 flex flex-col justify-between">
      <div class="flex-1">
        <router-link :to="blogsByCategory" class="inline-block">
                <span
                  :class="[blog.category?.color || 'bg-indigo-100 text-indigo-800', 'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium']">
                  {{ blog.category?.name }}
                </span>
        </router-link>
        <router-link class="block mt-2" to="/blogs/3">
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
          <div class="flex space-x-1 text-sm text-gray-500">
            <time :datetime="blog.created_at">
              {{ createdAt }}
            </time>
            <span aria-hidden="true"> &middot; </span>
            <span> {{ blog.readings }} read </span>
            <span aria-hidden="true"> &middot; </span>
            <span> {{ blog.views }} views  </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const defaultImageUrl = 'https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg'
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
      return this.blog?.image || defaultImageUrl;
    },
    blogCreatorAvatar() {
      return this.blog?.creator.avatar || defaultImageUrl;
    },
    blogsByCategory() {
      return `/blogs?category_id=${this.blog.category.id}`;
    },
    blogCreatorLink() {
      return `/blogs/creators/${this.blog.creator.id}`
    },
    blogCreatorName() {
      return this.blog.creator?.first_name;
    },
    createdAt() {
      let event = new Date(this.blog.created_at);
      return event.toLocaleDateString('ro-RO')
    }
  },
  created() {
    console.log(this.blog)
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
