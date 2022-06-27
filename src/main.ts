import {createApp} from 'vue'
import App from './App.vue'
import router from './router/router'
import '@/assets/css/index.scss'
import i18n from "@/i18n";
import store from "@/store";
import globalPlugins from "@/plugins/globalPlugins";
import globalComponents from "@/plugins/globalComponents";
// @ts-ignore
import authMiddleware from "@/modules/auth/middleware/authMiddleware";
import './modules/common/apiConfig'

authMiddleware(router)

createApp(App)
  .use(store)
  .use(i18n)
  .use(router)
  .use(globalPlugins)
  .use(globalComponents)
  .mount('#app')

