<template>

</template>

<script>
export default {
  name: "index",
  beforeCreate() {
    this.$router.push(`/auth?token=${this.$route.query.token},email=${this.$route.query.email}`)
  }
}
</script>

<route>
{
name: 'Verify'
}
</route>

<style scoped>

</style>
