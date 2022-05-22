<template>
  <BlogsList :blogs="blogs"/>
</template>

<script setup>
import BlogsList from "@/modules/blogs/components/BlogsList.vue";</script>

<script>
export default {
  name: "saved",
  computed: {
    blogs() {
      return this.$store.state.blogs.blogs.filter(blog => blog.is_pinned);
    }
  }
}
</script>
<route>
{
name: 'SavedBlogs',
meta: {
requiresAuth: true
}
}
</route>

<style scoped>

</style>
