// 全局工具类  （变量 or Methods）

// 导航栏返回按钮
import { blackBackItem } from '../js/MHBarButtonItem'

const utils = {
  install(Vue) {
    // 导航栏返回按钮
    Vue.prototype.blackBackItem = blackBackItem
  },

  // 🔥判断对象是否为数组
  // - [JavaScript 判断该对象是否为数组](http://www.runoob.com/w3cnote/javascript-check-arrayisobject.html)
  // - [JS中判断对象是不是数组的方法](https://www.cnblogs.com/heshan1992/p/6927690.html)
  objIsArray(obj) {
    if (typeof Array.isArray === 'function') {
      return Array.isArray(obj)
    } else {
      return Object.prototype.toString.call(obj) === '[object Array]'
    }
  },

  // 🔥数组去重
  // - [JS数组去重的几种常见方法](https://www.cnblogs.com/baiyangyuanzi/p/6726258.html)
  // - [JavaScript数组去重（12种方法，史上最全）](https://segmentfault.com/a/1190000016418021)
  uniqueArray(arr) {
    return Array.from(new Set(arr))
  },

  // 🔥是否为有效电话号码
  // - [一组匹配中国大陆手机号码的正则表达式](https://github.com/VincentSit/ChinaMobilePhoneNumberRegex)
  validMobile(mobile) {
    let regex = /((?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[35678]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|66\d{2})\d{6})+?/g
    return regex.test(mobile)
  },

  // 🔥格式化手机号为344
  // - [手机格式化](https://blog.csdn.net/Wangdanting123/article/details/86938915)
  // - [格式化手机号](https://segmentfault.com/q/1010000004508861)
  formatMobile344(mobile) {
    let regex = /((?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[35678]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|66\d{2})\d{6})+?/g
    if (!regex.test(mobile)) {
      return mobile
    }
    return (mobile + '').replace(/(^\d{3}|\d{4}\B)/g, '$1 ')
  },

  // 🔥是否包含中文字符
  includeChinese(str) {
    var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi
    if (!patrn.exec(str)) {
      return false
    } else {
      return true
    }
  }
}

// 导出组件
export default utils
