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
  }
}

// 导出组件
export default utils
