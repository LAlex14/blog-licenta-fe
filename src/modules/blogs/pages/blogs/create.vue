<template>
  <BlogForm
    v-model="blog"
    @submit="createBlog"
  />
</template>

<script>
import BlogsService from "@/modules/blogs/services/BlogsService";
import BlogForm from '@/modules/blogs/components/BlogForm.vue'

export default {
  name: "createBlog",
  components: {BlogForm},
  data() {
    return {
      blog: {
        title: '',
        content: '',
        category: {},
        image: '',
        private: false,
      }
    }
  },
  methods: {
    async createBlog() {
      try {
        const blog = await BlogsService.createBlog(this.blog)
        await this.$store.dispatch('blogs/getBlogs');
        await this.$router.push({name: 'ViewBlog', params: {slug: blog.attributes.slug}});
        this.$success(this.$t('Blog was created successfully'));
      } catch (error) {
        throw error
      }
    }
  }
}
</script>

<route>
{
name: "CreateBlog",
meta: {
requiresAuth: true
}
}
</route>

<style scoped>

</style>
