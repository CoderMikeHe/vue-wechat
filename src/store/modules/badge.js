// 处理全局的红点点
const state = {
  // 微信
  mainframe: {
    type: 'digit',
    value: 0,
    text:'',
    show: false,
    dot: false
  },
  // 发现页
  discover: {
    moments: {
      type: 'dot',
      value: 1,
      text:'',
      show: true,
      dot: true
    },
    type: 'dot',
    value: 1,
    text:'',
    show: true,
    dot: true
  },
  // 我
  profile: {
    camera: {
      type: 'dot',
      value: 1,
      text:'',
      show: true,
      dot: true
    },
    type: 'new',
    value: 1,
    text:'NEW',
    show: true,
    dot: false
  },
  
}

const getters = {
  
}

const actions = {

}

const mutations = {
  // 修改mainframe的badge
  changeMainframe(state, badge) {
    // Mutation 需遵守 Vue 的响应规则 https://vuex.vuejs.org/zh/guide/mutations.html
    state.mainframe = Object.assign({}, badge)
  },
  // 修改discover的badge
  changeDiscover(state, badge) {
    // Mutation 需遵守 Vue 的响应规则 https://vuex.vuejs.org/zh/guide/mutations.html
    state.discover = Object.assign({}, badge)
  },
  // 修改profile的badge
  changeProfile(state, badge) {
    // Mutation 需遵守 Vue 的响应规则 https://vuex.vuejs.org/zh/guide/mutations.html
    state.profile = Object.assign({}, badge)
  }
}



export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
