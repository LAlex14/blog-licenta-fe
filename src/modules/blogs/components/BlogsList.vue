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
  name: "BlogsList",
  props: {
    blogs: {
      type: Array,
      default: []
    }
  }
}
</script>

