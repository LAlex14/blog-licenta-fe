import {camelCase, upperFirst} from 'lodash-es'
import {App} from "vue";
import {Form as VeeForm} from 'vee-validate'

const components = import.meta.globEager('../components/**/(Base|Icon)*.(vue|js)')
const icons = import.meta.globEager('../assets/icons/(Icon)*.svg')

/**
 * This will require and make global all components starting with **Base** (e.g BaseButton, BaseInput etc) or **Icon** (e.g IconPhone)
 */
export default {
  install(Vue: App) {

    function importComponents(components: any) {
      for (let filePath in components) {
        // @ts-ignore
        const componentPath = filePath
          .split('/')
          .pop()
          .replace(/\.\w+$/, '')

        const componentName = upperFirst(camelCase(componentPath))
        const componentConfig = components[filePath]
        // Register component globally
        Vue.component(
          componentName,
          // Look for the component options on `.default`, which will
          // exist if the component was exported with `export default`,
          // otherwise fall back to module's root.
          componentConfig.default || componentConfig
        )
      }
    }

    importComponents(components);
    importComponents(icons);

    Vue.component('BaseForm', VeeForm)
  }
}

