import Vue from "vue";
import Vuex from "vuex";
import modules from "../modules"
// 存储类
import Storage from '../assets/js/MHPreferenceSettingHelper'
// 常量类
import Constant from '../assets/js/constant/constant';

// 类似单利
// PS： root store 只处理用户信息，其他的请放在 modules 中，例如：badge.js
Vue.use(Vuex);

// 获取本地缓存的用户信息
let user = JSON.parse(Storage.getItem(Constant.MH_USER_INFO_KEY) || '{}');
console.log('🔥😴😿 ** USER ** 😴😿🔥', user);

export default new Vuex.Store({
  state: {
    // 当前登陆用户
    user: user
  },
  mutations: {
    // 登陆用户
    loginUser(state, user) {
      // 0 记录User
      state.user = user;
      // 1 归档用户数据
      // 0. 对象转json字符串
      let jsonStr = JSON.stringify(user);
      // 1. 归档数据
      Storage.setItem(Constant.MH_USER_INFO_KEY, jsonStr);
    },
    // 登出用户
    logoutUser(state) {
      // 只需要将 vuex 的user置位空对象即可，无需删除本地数据
      state.user = {};
    }
  },
  getters: {},
  actions: {},
  modules:modules(require.context('./modules', true, /.+\.js$/))
});