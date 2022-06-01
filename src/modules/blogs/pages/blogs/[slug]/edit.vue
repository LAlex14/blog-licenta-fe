<template>
  <BlogForm
    v-model="blogToEdit"
    @submit="editBlog"
  />
</template>

<script>
import BlogForm from '@/modules/blogs/components/BlogForm.vue'
import BlogsService from "@/modules/blogs/services/BlogsService";

export default {
  name: "edit",
  components: {BlogForm},
  data() {
    return {
      blog: {},
      blogToEdit: {},
      blogId: null,
    }
  },
  computed: {
    isAuthor() {
      return String(this.$store.state.auth.user.id) === String(this.blog.creator.id)
    }
  },
  methods: {
    async editBlog() {
      try {
        const blog = await BlogsService.editBlog(this.blogToEdit, this.blog.id);
        await this.$store.dispatch('blogs/getBlogs');
        await this.$router.push({name: 'ViewBlog', params: {slug: blog.attributes.slug}});
        this.$success(this.$t('Blog was edited successfully'));
      } catch (error) {
        throw error
      }
    },
    initiateBlog() {
      this.blog = this.$store.getters['blogs/blogBySlug'](this.$route.params.slug);
      if (!this.isAuthor) {
        this.$router.push('/blogs');
        this.$error(this.$t('You are not authorized to edit this blog'));
      }
      this.blogToEdit = {
        title: this.blog.title,
        content: this.blog.content,
        category: this.blog.category,
        image: this.blog.image,
        private: this.blog?.private,
      }
    }
  },
  created() {
    this.initiateBlog();
  }
}
</script>

<route>
{
name: 'EditBlog',
meta: {
requiresAuth: true
}
}
</route>

<style scoped>

</style>
