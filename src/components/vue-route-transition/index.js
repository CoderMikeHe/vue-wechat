import RouteTransition from './RouteTransition.vue'
import RouteLayout from './RouteLayout.vue'

const install = function (Vue) {
  Vue.component(RouteTransition.name, RouteTransition)
  Vue.component(RouteLayout.name, RouteLayout)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
