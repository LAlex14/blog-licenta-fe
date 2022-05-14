<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  beforeRouteEnter(to, from, next) {
    // Handle auth logic here, redirect to login or home if logged in
    next('/auth')
  },
  created() {
    console.log(this.$route)
  }
})
</script>
