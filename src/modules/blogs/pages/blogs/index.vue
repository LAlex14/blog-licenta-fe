<template>
  <BlogsList :blogs="filteredBlogs"/>
</template>

<script setup>
import BlogsList from "@/modules/blogs/components/BlogsList.vue";</script>

<script>

export default {
  name: "index.vue",
  computed: {
    blogs() {
      return this.$store.getters['blogs/blogs'];
    },
    filteredBlogs() {
      return this.blogs.filter(blog => {
        const categoryId = blog.category.id;
        const userId = blog.creator.id;
        const queryUserIds = this.$route.query['user_id']?.split(',');
        const queryCategoryIds = this.$route.query['category_id']?.split(',');
        if (queryUserIds && queryCategoryIds) {
          return queryUserIds.includes(userId) && queryCategoryIds.includes(categoryId);
        }
        if (queryUserIds) {
          return queryUserIds.includes(userId);
        }
        if (queryCategoryIds) {
          return queryCategoryIds.includes(categoryId);
        }
        return this.blogs
      })
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
