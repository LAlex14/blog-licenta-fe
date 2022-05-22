<template>
  <BlogsList :blogs="blogs"/>
</template>

<script setup>
import BlogsList from "@/modules/blogs/components/BlogsList.vue";</script>

<script>

export default {
  name: "index.vue",
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
    publicBlogs() {
      return this.$store.state.publicBlogs.blogs;
    },
    authBlogs() {
      return this.$store.state.blogs.blogs;
    },
    blogs() {
      return this.isLoggedIn ? this.authBlogs : this.publicBlogs;
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
