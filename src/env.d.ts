/// <reference types="vite/client" />
import {DefineComponent} from 'vue'
import {NotificationStoreType} from "@/components/common/NotificationPlugin";

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $refs: {
      [key: string]: HTMLElement | any,
    },

    $success(notification: Notification | string): void,

    $error(notification: Notification | string): void,

    $info(notification: Notification | string): void,

    $warning(notification: Notification | string): void,

    $notify(notification: { showClose: boolean; icon: string; message: string; timeout: number }): void,

    $copyToClipboard(value: string, message?: string): void,

    $formatDate(date: Date | string, format: string): void,

    $notifications: NotificationStoreType,
  }
}

declare module '*.vue' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
