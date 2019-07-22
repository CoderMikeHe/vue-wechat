// 处理账号相关的逻辑
/// 登录账号的key
const MH_RAW_LOGIN = 'MHRawLogin'
export default {
  // 获取账号
  rawLogin() {
    return localStorage.getItem(MH_RAW_LOGIN)
  },
  // 设置账号
  setRawLogin(rawLogin) {
    // 必须的有值，否则不存储
    if (rawLogin && rawLogin.length !== 0) {
      localStorage.setItem(MH_RAW_LOGIN, rawLogin)
    }
  },
  // 删除账号
  deleteRawLogin() {
    localStorage.removeItem(MH_RAW_LOGIN)
  }
}
