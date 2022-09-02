import {App} from "vue";
import copyToClipboard from "@/plugins/copyToClipboard";
import NotificationsPlugin from "@/components/common/NotificationPlugin";
import dateFormatPlugin from "@/plugins/dateFormatPlugin";
import veeValidate from "@/plugins/veeValidate";
import store from "@/store";

export default {
  install(Vue: App) {
    Vue.use(copyToClipboard)
    Vue.use(dateFormatPlugin)
    Vue.use(veeValidate)
    Vue.use(NotificationsPlugin)
    Vue.mixin({
      computed: {
        $user() {
          const userId = this.$store.state.auth?.user?.id;
          return store.state.blogs.authors.find((item) => String(item.id) === String(userId));
        },
      }
    })
  }
}
