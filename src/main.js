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