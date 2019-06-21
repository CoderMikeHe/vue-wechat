// 表情相关的业务
console.log('🔥🔥 表情相关业务 🔥🔥🔥')
// 默认表情
import Default from './default'
// 取出emoji
import Emoji from './emoji'
// 取出lxh
import Lxh from './lxh'

// 图片表情的路径地址 (default + lxh)
let emoticons = {}

// 获取default
fetchEmoticons(Default.emoticons, 'emoticons/default/', '@3x')
// 获取浪小花
fetchEmoticons(Lxh.emoticons, 'emoticons/lxh/', '@2x')
// 获取表情
function fetchEmoticons(emos, relativePath, scale) {
  // 取出default的数据
  for (let i = 0; i < emos.length; i++) {
    const emo = emos[i]
    // 取出 key-value
    let png = emo.png
    let key = emo.chs
    // key or png 都必须有值
    if (png.length !== 0 && key.length !== 0) {
      // 🔥 public文件夹的使用
      // - [public 文件夹](https://cli.vuejs.org/zh/guide/html-and-static-assets.html#public-%E6%96%87%E4%BB%B6%E5%A4%B9)
      // - [vue-cli 3.0 图片路径问题（何时使用 public 文件夹）](http://www.cnblogs.com/cckui/p/10315204.html)
      // - [vue-cli3静态资源static assets项目结构](https://segmentfault.com/a/1190000014456796?utm_source=index-hottest)
      // - [vue-cli 自定义路径别名 assets和static文件夹的区别 --save-dev和--save的区别](https://juejin.im/post/59be4d325188257e764c8485)
      // - [vue 动态加载图片src的解决办法](https://blog.csdn.net/Mr_YanYan/article/details/78783091)
      // - [Vue中img的src属性绑定与static文件夹](https://www.jianshu.com/p/f82c5ecbd3a5)
      // - [vue+webpack动态设置图片src导致404错误](https://segmentfault.com/q/1010000006743502)
      // - [vue动态定义图片路径](https://www.jianshu.com/p/fab484498e4e)
      // relativePath <PS: 不需要取到 /public/xxx>
      // 查找 @3x @2x @1x 的图片
      // 🔥 JS获取文件扩展名方法几种方法
      // - [JS获取文件扩展名方法](https://www.cnblogs.com/FallIntoDarkness/p/9757334.html)
      let spl = png.split('.')
      let fileName = spl[0]
      let suffix = spl[1]
      
      // public 绝对路径
      // 🔥 public文件夹的资源文件引用，'/emoticons/default/d_aini@3x.png' 这样在开发调试是可以的，但是一旦打包（build）后，就找不到了
      // - [Vue CLI 3 搭建的项目中路径相关问题](https://segmentfault.com/a/1190000016120011)
      // - [vue-cli项目打包需要修改的路径问题](https://www.cnblogs.com/zly1022/p/10108548.html)
      // - [[Vue CLI 3] public 目录没用吗](https://segmentfault.com/a/1190000016414534)
      // - [vue-cli打包上线遇到各文件找不到问题](https://www.cnblogs.com/yszblog/p/10239712.html)
      let path = process.env.BASE_URL + relativePath + fileName + scale + '.' + suffix

      console.log('baseUrl ---  ' + process.env.BASE_URL);

      // 🔥 JS中给一个对象动态追加key
      // - [JS中给一个对象动态追加key](https://blog.csdn.net/wml00000/article/details/85334850)
      // - [JS--数组和字典](https://www.cnblogs.com/bigberg/p/9237856.html)
      // - [js之字典的学习和使用](https://blog.csdn.net/ganyingxie123456/article/details/78163154)
      // - [Javascript字典操作](https://blog.csdn.net/limlimlim/article/details/9088161)
      emoticons[key] = path
    }
  }
}

// 🔥 判断本地图片是否存在
// - [利用JS判断图片，文件是否存在的几种方法](https://blog.csdn.net/yu17310133443/article/details/53183930)
// PS：有时候不准 why?
function imgIsExist(path) {
  var ImgObj = new Image()
  ImgObj.src = path
  if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
    return true
  } else {
    return false
  }
}

export default emoticons
