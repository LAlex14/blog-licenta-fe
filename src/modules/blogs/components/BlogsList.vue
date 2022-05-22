<template>
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

