<template>
  <BlogsList :blogs="sortedBlogs"/>
</template>

<script setup>
import BlogsList from "@/modules/blogs/components/BlogsList.vue";</script>

<script>
import BlogsMixin from "@/modules/blogs/mixins/BlogsMixin";

export default {
  name: "saved",
  mixins: [BlogsMixin],
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
