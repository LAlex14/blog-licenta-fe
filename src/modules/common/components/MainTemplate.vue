<template>
  <Navbar/>

  <main class="fixed top-16 bottom-0 bg-gray-50 min-w-full overflow-x-hidden">
    <FilterBar v-if="showFilterBar"/>
    <div class="hidden lg:block lg:absolute lg:inset-y-0 lg:w-full">
      <div aria-hidden="true" class="relative text-lg max-w-prose mx-auto">
        <svg class="absolute top-12 left-full transform translate-x-32" fill="none" height="384" viewBox="0 0 404 384"
             width="404">
          <defs>
            <pattern id="74b3fd99-0a6f-4271-bef2-e80eeafdf357" height="20" patternUnits="userSpaceOnUse" width="20"
                     x="0" y="0">
              <rect class="text-gray-200" fill="currentColor" height="4" width="4" x="0" y="0"/>
            </pattern>
          </defs>
          <rect fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" height="384" width="404"/>
        </svg>
        <svg class="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32" fill="none" height="384"
             viewBox="0 0 404 384" width="404">
          <defs>
            <pattern id="f210dbf6-a58d-4871-961e-36d5016a0f49" height="20" patternUnits="userSpaceOnUse" width="20"
                     x="0" y="0">
              <rect class="text-gray-200" fill="currentColor" height="4" width="4" x="0" y="0"/>
            </pattern>
          </defs>
          <rect fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" height="384" width="404"/>
        </svg>
        <svg class="absolute bottom-12 left-full transform translate-x-32" fill="none" height="384"
             viewBox="0 0 404 384" width="404">
          <defs>
            <pattern id="d3eb07ae-5182-43e6-857d-35c643af9034" height="20" patternUnits="userSpaceOnUse" width="20"
                     x="0" y="0">
              <rect class="text-gray-200" fill="currentColor" height="4" width="4" x="0" y="0"/>
            </pattern>
          </defs>
          <rect fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" height="384" width="404"/>
        </svg>
      </div>
    </div>
    <div class="relative min-h-full px-4 sm:px-6 lg:px-8 pb-20">
      <div class="py-16 max-w-7xl mx-auto">
        <slot/>
      </div>
      <Footer/>
    </div>
  </main>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import FilterBar from "@/modules/blogs/components/FilterBar.vue";</script>

<script>
export default {
  name: "MainTemplate.vue",
  computed: {
    showFilterBar() {
      const routeName = this.$route.name;
      return routeName === 'Blogs' || routeName === 'Authors';
    }
  }
}
</script>
