<template>
  <div class="flex gap-2">
    <LikeIcon
      v-if="likeValue !== 0"
      class="rotate-180 w-6 cursor-pointer"
      @click="likeBlog(0)"
    />
    <LikeFilledIcon
      v-if="likeValue === 0"
      class="rotate-180 w-6 cursor-pointer"
      @click="deleteLike"
    />
    <LikeIcon
      v-if="likeValue !== 1"
      class="w-6 cursor-pointer"
      @click="likeBlog(1)"
    />
    <LikeFilledIcon
      v-if="likeValue === 1"
      class="w-6 cursor-pointer"
      @click="deleteLike"
    />
  </div>
</template>

<script>
import {ThumbUpIcon as LikeFilledIcon} from '@heroicons/vue/solid'
import {ThumbUpIcon as LikeIcon} from '@heroicons/vue/outline'

export default {
  name: "LikeBlog",
  components: {
    LikeFilledIcon,
    LikeIcon,
  },
  computed: {
    blog() {
      return this.$store.getters['blogs/blogBySlug'](this.$route.params.slug);
    },
    blogLike() {
      return this.blog?.is_liked
    },
    likeValue() {
      return this.blogLike?.value;
    }
  },
  methods: {
    likeBlog(value) {
      this.$store.dispatch('blogs/likeBlog', {
        blogId: this.blog.id,
        value,
      });
    },
    deleteLike() {
      this.$store.dispatch('blogs/deleteLike', {
        blogId: this.blog.id,
        like: this.blogLike,
      });
    }
  }
}
</script>

<style scoped>

</style>
