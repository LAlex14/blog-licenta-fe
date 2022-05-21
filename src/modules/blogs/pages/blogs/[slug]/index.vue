<template>
  <div>
    <div class="text-lg">
      <h1>
        <span
          class="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase"
        >
          {{ blog?.category?.name }}
        </span>
        <span
          class="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
        >
          {{ blog?.title }}
        </span>
      </h1>
      <p class="mt-8 text-xl text-gray-500 leading-8">Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem.
        At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque
        id at vitae feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget. Eleifend egestas fringilla
        sapien.</p>
    </div>
    <div
      class="mt-6 prose-indigo prose-lg text-gray-500"
      v-html="blog?.content"
    />
  </div>
</template>


<script>

export default {
  name: "[slug]",
  props: {
    slug: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      blog: ''
    }
  },
  methods: {
    async getBlog() {
      try {
        this.blog = await this.$store.dispatch('publicBlogs/getBlogBySlug', this.slug);
      } catch (e) {
        await this.$router.push('/blogs');
      }
    }
  },
  async created() {
    await this.getBlog();
  }
}
</script>

<route>
{
name: 'ViewBlog'
}
</route>
