import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;


// 导入mui
// 导入 MUI 的样式
import "./assets/vendor/mui/css/mui.min.css";
// 导入扩展图标样式
import "./assets/vendor/mui/css/icons-extra.css";


// 导入全部mint-ui
import Mint from "mint-ui";
import 'mint-ui/lib/style.css';
Vue.use(Mint);

// 全局app常量css
import './assets/css/common.css';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");