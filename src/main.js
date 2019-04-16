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

// 配置偏好设置
import MHPreferenceSettingHelper from './assets/js/MHPreferenceSettingHelper'
MHPreferenceSettingHelper.initialize()

// 获取用户信息
let user = MHPreferenceSettingHelper.getItem('491273090') || {}
if (Object.keys(user).length === 0) {
  router.replace('/current-login')
} else {
  router.replace('/mainframe')
}

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

/// --------🔥 Third Lib 🔥-------------
// - [vue-lazyload)](https://github.com/hilongjw/vue-lazyload)

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
