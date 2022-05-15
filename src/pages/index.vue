<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  beforeRouteEnter(to, from, next) {
    // Handle auth logic here, redirect to login or home if logged in
    next('/blogs')
  },
  created() {
    console.log(this.$route)
  }
})
</script>
