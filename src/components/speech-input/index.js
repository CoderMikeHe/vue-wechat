import SpeechInput from './SpeechInput.vue'

const install = function (Vue) {
  Vue.component(SpeechInput.name, SpeechInput)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
