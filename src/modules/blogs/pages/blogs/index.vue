<template>
  <BlogsList :blogs="sortedBlogs"/>
</template>

<script setup>
import BlogsList from "@/modules/blogs/components/BlogsList.vue";</script>

<script>
import BlogsMixin from "@/modules/blogs/mixins/BlogsMixin";

export default {
  name: "index.vue",
  mixins: [BlogsMixin],
}
</script>
<route>
{
name: 'Blogs'
}
</route>

<style scoped>

</style>
