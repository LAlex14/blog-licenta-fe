<template>
  <div class="flex min-h-screen min-w-screen">
    <div class="hidden lg:block relative w-0 flex-1">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        alt=""
        src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"/>
    </div>
    <div class="flex-1 flex flex-col justify-center items-center py-8 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style>
</style>
