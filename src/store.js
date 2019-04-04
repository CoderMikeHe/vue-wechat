import Vue from "vue";
import Vuex from "vuex";

import MHPreferenceSettingHelper from './assets/js/MHPreferenceSettingHelper'

// 类似单利
Vue.use(Vuex);

// 获取本地缓存的用户信息
let user = JSON.parse(MHPreferenceSettingHelper.getItem('491273090') || '{}');
console.log('user---' + user);

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
      MHPreferenceSettingHelper.setItem(user.qq, jsonStr);
    },
    // 登出用户
    logoutUser(state) {
      // 0 清除掉用户数据
      MHPreferenceSettingHelper.removeItem(state.user.qq);
      // 1 记录
      state.user = {};
    }
  },
  getters: {},
  actions: {}
});