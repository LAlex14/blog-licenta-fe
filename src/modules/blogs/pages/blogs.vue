<template>
  <MainTemaplate>
    <router-view></router-view>
  </MainTemaplate>
</template>

<script setup>
import MainTemaplate from "@/modules/common/components/MainTemplate.vue";</script>

<script>
export default {
  name: "blogs.vue",
  props: {
    id: {
      type: String,
      default: '1',
    }
  },
  async created() {
    await this.$store.dispatch('blogs/getPublicBlogs');
  }
}
</script>
