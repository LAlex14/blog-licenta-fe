<template>
  <div class="my-8">
    <div class="pb-16 bg-indigo-600 lg:pb-0 lg:z-10 lg:relative rounded-lg">
      <div class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">
        <div class="relative lg:-my-8">
          <div aria-hidden="true" class="absolute inset-x-0 top-0 h-1/2 bg-gray-50 lg:hidden"/>
          <div class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:p-0 lg:h-full">
            <div
              class="aspect-w-10 aspect-h-6 rounded-xl shadow-xl overflow-hidden sm:aspect-w-16 sm:aspect-h-7 lg:aspect-none lg:h-full">
              <img
                :src="author.avatar"
                alt="author avatar"
                class="object-cover lg:h-full lg:w-full"
              />
            </div>
          </div>
        </div>
        <div class="mt-12 lg:m-0 lg:col-span-2 lg:pl-8">
          <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:py-20 lg:max-w-none">
            <blockquote>
              <div>
                <p class="text-white text-2xl opacity-40">
                  {{ $t('About:') }}
                </p>
                <p class="mt-3 text-2xl font-medium text-white">
                  {{ author.description }}
                </p>
              </div>
              <footer class="mt-6">
                <p class="text-base font-medium text-white">{{ `${author.first_name} ${author.last_name}` }}</p>
                <p class="text-base font-medium text-indigo-100">{{ author.job_title || $t('user') }}</p>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p class="mt-20 text-center text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
    {{ $t('Written Blogs') }}
  </p>
  <BlogsList
    :blogs="blogs"
    class="mt-12"
  />
</template>

<script setup>
import BlogsList from "@/modules/blogs/components/BlogsList.vue";</script>

<script>
export default {
  name: "authors",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    blogs() {
      return this.$store.state.blogs.blogs.filter(blog => blog.creator.id === this.id)
    },
    author() {
      return this.$store.state.blogs.authors.find(author => author.id === this.id)
    }
  }
}
</script>

<route>
{
name: 'ViewAuthor',
meta: {
requiresAuth: true
}
}
</route>
