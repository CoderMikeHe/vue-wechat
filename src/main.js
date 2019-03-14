import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// 导入animate.css
import "animate.css"

// 导入mui
// 导入 MUI 的样式
import "./assets/vendor/mui/css/mui.min.css";
// 导入扩展图标样式
import "./assets/vendor/mui/css/icons-extra.css";

// 导入全部mint-ui
import Mint from "mint-ui";
import 'mint-ui/lib/style.css';
Vue.use(Mint);

// 导入weui
import "weui";


// 全局app常量css
import './assets/css/common.css';
import './assets/css/wechat.css';

// 全局导航栏
import NavigationBar from "components/navigationBar";
Vue.use(NavigationBar);

import utils from "assets/utils/utils";
Vue.use(utils);

// 配置偏好设置
import MHPreferenceSettingHelper from './assets/js/MHPreferenceSettingHelper'
MHPreferenceSettingHelper.initialize();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");


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