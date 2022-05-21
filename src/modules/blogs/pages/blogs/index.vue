<template>
  <div class="max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
    <BlogCard
      v-for="blog in blogs"
      :key="blog.id"
      :blog="blog"
    />
  </div>
</template>

<script setup>
import BlogCard from "@/modules/blogs/components/BlogCard.vue";</script>

<script>

export default {
  name: "index.vue",
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
    blogs() {
      return this.$store.state.blogs.blogs;
    }
  },
}
</script>
<route>
{
name: 'Blogs'
}
</route>

<style scoped>

</style>
