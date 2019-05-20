import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 导入animate.css
import 'animate.css'

// 导入mui
// 导入 MUI 的样式
// import "./assets/vendor/mui/css/mui.min.css";
// 导入扩展图标样式
// import "./assets/vendor/mui/css/icons-extra.css";

// 导入全部mint-ui
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

// 导入weui
import 'weui'

// 全局app常量css
import './assets/css/common.css'
import './assets/css/wechat.css'
import './assets/css/iconfont.css'

// 全局导航栏
import NavigationBar from 'components/navigationBar'
Vue.use(NavigationBar)

import utils from 'assets/utils/utils'
Vue.use(utils)

// import VuePreview from 'vue-preview'
// Vue.use(VuePreview);
// console.log(VuePreview);


// 配置偏好设置
import MHPreferenceSettingHelper from './assets/js/MHPreferenceSettingHelper'
MHPreferenceSettingHelper.initialize()

// 获取用户信息
// let user = MHPreferenceSettingHelper.getItem('491273090') || {}
// if (Object.keys(user).length === 0) {
//   router.replace('/current-login')
// } else {
//   router.replace('/mainframe')
// }

// 记录样式
router.afterEach((to, from) => {
  // ...
  console.log('afterEach-to', to)
  console.log('afterEach-from', from)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// {
//   "workbench.iconTheme": "vscode-icons",
//   "editor.fontSize": 18,
//   "workbench.editor.enablePreview": false,
//   "explorer.confirmDelete": false,
//   "beautify.language": {
//     "js": {
//       "type": ["javascript", "json"],
//       "filename": [".jshintrc", ".jsbeautifyrc"]
//     },
//     "css": ["css", "scss"],
//     "html": ["htm", "html"]
//   },
//   "editor.formatOnSave": true,
//   "git.autofetch": true,
//   "editor.tabSize": 2,
//   "window.restoreWindows": "all"
// }

/// --------🔥 Must Study 🔥-------------
// 👉vue-cli3.0配置详解
// - [vue-cli3.0配置详解](http://www.php.cn/js-tutorial-394518.html)
// - [vue-cli3.0之vue.config.js的配置项（注解）](https://blog.csdn.net/Allen_Fei_/article/details/82691420)
// - [vue-cli3.0-vueadmin](https://github.com/loveRandy/vue-cli3.0-vueadmin)
// - [使用Vue-cli 3.0搭建Vue项目](https://www.jianshu.com/p/6307c568832d)

// 👉css px/em/rem 的区别
// - [css中单位em和rem的区别](https://www.cnblogs.com/wind-lanyan/p/6978084.html)

// 👉inline/block/inline-blockd 的区别
// - [常见的inline元素、block元素、inline-block元素有哪些？它们之间有什么区别？](https://www.jianshu.com/p/cca9f037a6b9)
// - [block，inline和inline-block概念和区别](http://www.cnblogs.com/KeithWang/p/3139517.html)
// - [inline ， block， inline-blockd的区别](inline ， block， inline-blockd的区别)

// 👉CSS line-height
// - [CSS行高——line-height](https://www.cnblogs.com/dolphinX/p/3236686.html)
// - [CSS line-height概念与举例](https://www.cnblogs.com/zhangyachen/p/8035661.html)
// - [真正的能理解CSS中的line-height，height与line-height](https://blog.csdn.net/a2013126370/article/details/82786681)
// - [深入了解css的行高Line Height属性](http://www.cnblogs.com/fengzheng126/archive/2012/05/18/2507632.html)
// - [CSS深入理解之line-height](https://blog.csdn.net/muzi187/article/details/79171735)
// - [[学习笔记] css中的line-height](https://segmentfault.com/a/1190000003038583)

// 👉设置git提交时的用户名和邮箱
// - [设置git提交时的用户名和邮箱](https://blog.csdn.net/yinxing2008/article/details/82796219)

// 👉重学Web
// - [重学Web](https://www.w3cplus.com/)

// 👉input[type=search]
// - [你不知道的input[type=search]](https://blog.csdn.net/xxxxxMiss/article/details/51534626)

// 👉JS中如何判断一个对象是否为空对象
// - [JS中如何判断一个对象是否为空对象](https://blog.csdn.net/qq_38627581/article/details/77353015)

// 👉CSS BEM规范
// - [编写模块化CSS：BEM](https://www.w3cplus.com/css/css-architecture-1.html)
// - [BEM入门+精通](https://www.w3cplus.com/blog/tags/325.html)
// - [BEM quick-start](https://en.bem.info/methodology/quick-start/)

// 👉谷歌跨域问题
// - [Mac上解决Chrome浏览器跨域问题](https://www.jianshu.com/p/2db73311fcbe)

// 👉Fixed布局的坑
// - [移动端onTouchMove事件 以及Fixed定位的坑](https://juejin.im/post/5b28d6cf51882574d20baa1c)
// - [fixed定位问题](https://www.jianshu.com/p/33da1c0b079c)
// - [深入研究-webkit-overflow-scrolling:touch及ios滚动](https://www.cnblogs.com/xiahj/p/8036419.html)
// - [移动Web开发实践——解决position:fixed自适应BUG](https://www.cnblogs.com/Megasu/p/4104096.html)
// - [移动端web页面使用position:fixed问题总结](https://github.com/maxzhang/maxzhang.github.com/issues/2)
// - [Web移动端Fixed布局的解决方案](https://efe.baidu.com/blog/mobile-fixed-layout/)
// - [解决页面使用overflow: scroll在iOS上滑动卡顿的问题](https://www.jianshu.com/p/1f4693d0ad2d)
// - [fixed兼容性](https://www.cnblogs.com/cina33blogs/p/7251055.html)
// - [小技巧css解决移动端ios不兼容position:fixed属性，无需插件](https://blog.csdn.net/liu__hua/article/details/40106595)
// - [移动端整体布局-解决ios下fixed定位抖动的问题](https://blog.csdn.net/cengjingcanghai123/article/details/51511116)

// 👉数组去重
// - [JS数组去重的几种常见方法](https://www.cnblogs.com/baiyangyuanzi/p/6726258.html)
// - [JavaScript数组去重（12种方法，史上最全）](https://segmentfault.com/a/1190000016418021)

// 👉行内元素和块状元素
// - [https://blog.csdn.net/cc18868876837/article/details/78060347](常用的块级元素（block）、行内元素（inline）以及行内块元素（inline-block）的解析)
// - [Html中行内元素有哪些？块级元素有哪些？](https://www.cnblogs.com/Jackie0714/p/4923639.html)
// - [HTML哪些是块级元素，哪些是行内元素](https://www.cnblogs.com/yxm440/p/7667539.html)

// 👉 Vue.js 源码学习九 —— 过渡效果 transition 学习
// - [Vue.js 源码学习九 —— 过渡效果 transition 学习](https://www.jianshu.com/p/f283b39aa212)

// 👉 JS正则表达式
// - [JS正则表达式详解](http://www.cnblogs.com/moqiutao/p/6513628.html)
// - [JS正则表达式完整教程](http://www.cnblogs.com/guaidianqiao/p/7615228.html)
// - [JS正则表达式](https://www.runoob.com/regexp/regexp-rule.html)
// - [JS正则表达式](https://www.jianshu.com/p/b88e19474ab3)
// - [js中的正则表达式入门](https://www.cnblogs.com/chenmeng0818/p/6370819.html)

// 👉 web页面emoji表情
// - [web页面如何显示emoji表情呢？](https://segmentfault.com/q/1010000004356514)
// - [umoji](https://github.com/channg/umoji)
// - [emoji](https://github.com/node-modules/emoji)

// 👉 数组嵌套对象响应式
// - [vue如何修改数组中对象的值？](https://segmentfault.com/q/1010000012375354)
// - [vue 数组中嵌套的对象添加新属性--页面更新](https://www.jianshu.com/p/8f0e5bb13735)
// - [vue 列表渲染](https://cn.vuejs.org/v2/guide/list.html)

// 👉 JS 长按实现方案
// - [HTML5-长按事件](https://blog.csdn.net/yqj234/article/details/51923626)
// - [Js实现长按事件](https://www.jianshu.com/p/884ed3939f0c)
// - [javascript长按事件实现方式](https://www.cnblogs.com/wulishun111/p/8857073.html)
// - [移动端长按事件](https://www.cnblogs.com/imsomnus/p/6429074.html)
// - [Js实现移动端长按事件](https://www.jianshu.com/p/11bb9629aa09)



/// --------🔥 Third Lib 🔥-------------
// - [vue-lazyload)](https://github.com/hilongjw/vue-lazyload)
// - [better-scroll](https://github.com/ustbhuangyi/better-scroll)
// - [cube-ui](https://github.com/didi/cube-ui/)
// - [当 better-scroll 遇见 Vue](https://zhuanlan.zhihu.com/p/27407024)
// - [IScroll 实践指南(上)](https://qbaty.iteye.com/blog/1221061)
// - [ChinaMobilePhoneNumberRegex](https://github.com/VincentSit/ChinaMobilePhoneNumberRegex)
// - [JSVerbalExpressions](https://github.com/VerbalExpressions/JSVerbalExpressions)
// - [精致的下拉刷新和上拉加载 js框架](https://github.com/mescroll/mescroll)
// - [zepto](https://github.com/madrobby/zepto)
// - [vue-preview](https://github.com/LS1231/vue-preview)
// - [PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe)
// - [viewerjs](https://github.com/fengyuanchen/viewerjs)
// - [vue点击图片预览放大（可旋转、翻转、缩放、上下切换、键盘操作viewerjs](https://blog.csdn.net/guozhangqiang/article/details/82251893)
// - [专注于移动端的fullPage.js](https://github.com/yanhaijing/zepto.fullpage)
// - [强烈推荐优秀的Vue UI组件库](https://www.jianshu.com/p/398a3b2e535f)
// https://github.com/SunshineBrother/JHBlog

/** 
 * 
 * {
  "explorer.confirmDragAndDrop": false,
  "workbench.sideBar.location": "left",
  "workbench.editor.showTabs": false,
  "editor.fontSize": 18,
  "explorer.confirmDelete": false,
  "editor.tabSize": 2,
  "window.restoreWindows": "all",
  "editor.formatOnSave": true,
  "css.fileExtensions": ["css", "scss"],
  "editor.quickSuggestions": {
    "other": true,
    "comments": true,
    "strings": true
  },
  "diffEditor.ignoreTrimWhitespace": true,
  "files.autoSave": "off",
  "workbench.iconTheme": "vscode-icons",

  "prettier.singleQuote": true,
  "prettier.semi": false,
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    {
      "language": "vue",
      "autoFix": true
    },
    {
      "language": "html",
      "autoFix": true
    },
    {
      "language": "javascript",
      "autoFix": true
    },
    {
      "language": "javascriptreact",
      "autoFix": true
    },
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "typescriptreact",
      "autoFix": true
    }
  ],
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}

*/
