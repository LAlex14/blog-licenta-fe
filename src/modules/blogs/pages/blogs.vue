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
      default: ''
    },
    id: {
      type: String,
      default: '1'
    }
  },
  watch: {
    '$route.path': {
      handler(val, oldVal) {
        if (val === oldVal) {
          return
        }
        document.getElementsByTagName('main')[0].scrollTop = 0;
      }
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
  },
  methods: {
    async getInitialData() {
      await Promise.all([
        this.$store.dispatch('blogs/getBlogs'),
        this.$store.dispatch('blogs/getCategories'),
        this.$store.dispatch('blogs/getAuthors'),
      ]);
    },
    async getPublicData() {
      await Promise.all([
        this.$store.dispatch('blogs/getPublicBlogs')
      ]);
    },
    async getData() {
      if (this.isLoggedIn) {
        await this.getInitialData();
        return;
      }
      await this.getPublicData();
    }
  },
  async created() {
    await this.getData();
  }
}
</script>
