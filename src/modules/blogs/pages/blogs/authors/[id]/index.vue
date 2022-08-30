<template>
  <div class="my-8">
    <div class="pb-10 bg-indigo-600 lg:pb-0 lg:z-10 lg:relative rounded-lg">
      <div class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">
        <div class="relative lg:-my-8">
          <div aria-hidden="true" class="absolute inset-x-0 top-0 h-1/2 bg-gray-50 lg:hidden"/>
          <div class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:p-0 lg:h-full">
            <div
              class="aspect-w-10 aspect-h-6 rounded-xl shadow-xl overflow-hidden sm:aspect-w-16 sm:aspect-h-7 lg:aspect-none lg:h-full">
              <img
                v-if="author.avatar"
                :src="author.avatar"
                alt="author avatar"
                class="object-cover lg:h-full lg:w-full"
              />
              <div
                v-else
                class="min-h-full bg-indigo-600 bg-opacity-90 flex items-center justify-center"
              >
                <UserCircleIcon class="max-w-full max-h-full text-gray-50"/>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-10 lg:m-0 lg:col-span-2 lg:pl-8">
          <div class="relative mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:py-8 lg:max-w-none h-full">
            <div class="flex flex-col justify-between h-full">
              <div class="absolute -top-4 lg:top-4 right-4 tracking-wider">
                <div class="flex">
                  <div>
                    <p class="text-lg font-extrabold text-gray-50">{{ `${author.first_name} ${author.last_name}` }}</p>
                    <p class="text-base text-right font-medium text-indigo-100 leading-none">
                      {{ author.job_title || $t('user') }}
                    </p>
                  </div>
                  <div>

                  </div>
                </div>
              </div>
              <div>
                <p class="text-gray-50 text-3xl opacity-40">
                  {{ $t('About:') }}
                </p>
                <p class="mt-3 text-lg font-medium text-gray-50">
                  {{ author.description || $t('No data...') }}
                </p>
              </div>
              <dl class="mt-10 text-center flex justify-around items-end">
                <div class="flex flex-col">
                  <dd class="text-gray-50 text-3xl font-extrabold text-gray-50">{{ author.blogs_count || 0 }}+</dd>
                  <dt class="font-medium text-indigo-200">{{
                      $t('articles', {
                        n: author.blogs_count
                      })
                    }}
                  </dt>
                </div>
                <div class="flex flex-col mt-10 sm:mt-0">
                  <dd class="text-gray-50 text-3xl font-extrabold text-gray-50">{{ author.views_count || 0 }}+</dd>
                  <dt class="font-medium text-indigo-200">{{ $t('Views') }}</dt>
                </div>
                <div class="flex flex-col mt-10 sm:mt-0">
                  <dd class="text-gray-50 text-3xl font-extrabold text-gray-50">{{ author.readings_count || 0 }}+</dd>
                  <dt class="font-medium text-indigo-200">{{ $t('Readings') }}</dt>
                </div>
                <div class="flex flex-col mt-10 sm:mt-0">
                  <dd class="text-gray-50 text-3xl font-extrabold text-gray-50">{{ author.likes_count || 0 }}+</dd>
                  <dt class="font-medium text-indigo-200">{{ $t('Likes') }}</dt>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p class="mt-10 lg:mt-20 text-center text-4xl font-extrabold text-gray-900 sm:tracking-tight sm:text-6xl">
    {{ $t('Written Blogs') }}
  </p>
  <BlogsList
    :blogs="blogs"
    class="mt-12"
  />
</template>

<script setup>
import BlogsList from "@/modules/blogs/components/BlogsList.vue";
import {UserCircleIcon} from '@heroicons/vue/solid';</script>

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
