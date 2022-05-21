<template>
  <MainTemplate>
    <router-view></router-view>
  </MainTemplate>
</template>

<script setup>
import MainTemplate from "@/modules/common/components/MainTemplate.vue";</script>

<script>
export default {
  name: "blogs.vue",
  props: {
    slug: {
      type: String,
    },
  },
  async created() {
    await this.$store.dispatch('publicBlogs/getPublicBlogs');
  }
}
</script>
