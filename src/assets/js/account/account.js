// 处理账号相关的逻辑
// 1、处理登陆账号
// 2、登陆登出
// 3、重置根路由

// 这里就不做多账号处理了，这里只针对单账号登陆
/// 登录账号的key
const MH_RAW_LOGIN_KEY = 'MHRawLoginKey'

import router from '@/router';
import store from '@/store/store'
// 配置偏好设置
import Storage from '@/assets/js/MHPreferenceSettingHelper'
export default {
  // 获取账号
  rawLogin() {
    return Storage.getItem(MH_RAW_LOGIN_KEY) || ''
  },
  // 设置账号
  setRawLogin(rawLogin) {
    // 必须的有值，否则不存储
    if (rawLogin && rawLogin.length !== 0) {
      Storage.setItem(MH_RAW_LOGIN_KEY, rawLogin)
    }
  },
  // 删除账号
  deleteRawLogin() {
    Storage.removeItem(MH_RAW_LOGIN_KEY)
  },

  // 登陆
  login(user, rawLogin) {
    // 归档登陆账号
    this.setRawLogin(rawLogin)
    // 归档用户信息
    store.commit('loginUser', user)
    // 跳转登陆
    router.push('/homepage')
  },

  // 登出
  logout() {
    // 删除登陆账号
    this.deleteRawLogin()

    // 归档用户信息
    store.commit('logoutUser')
    // 清除
    router.push("/current-login");
  },

  // 更新
  update() { },

  // delete
  delete() { },

  // 重置根路由
  resetRootRouterView() {
    // 获取用户信息
    let user = store.state.user
    // 获取账号信息
    let account = this.rawLogin()
    console.log('------------- 🔥跳转逻辑🔥 -------------',user);
    console.log('------------- 🔥跳转逻辑🔥 -------------',account);
    // 跳转逻辑判断处理
    if (Object.keys(user).length !== 0 && account.length !== 0) {
      /// 有账号+有用户数据  已经登录，跳转到主页
      router.push('/homepage')
    } else if (Object.keys(user).length !== 0 && account.length === 0) {
      /// 没有账号+有用户数据 退出登录，跳转到账号登陆页面
      router.push('/current-login')
    } else {
      /// 没有账号+没有用户数据 用户初次登陆，跳转到登陆/注册界面
      router.push('/login')
    }
  }
}
