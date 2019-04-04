import Vue from "vue";
import Router from "vue-router";


import MainFrame from "./views/mainframe/Mainframe.vue";
import Contacts from "./views/contacts/Contacts.vue";
// 发现
import Discover from "./views/discover/Discover.vue";
// 朋友圈
import Moments from "./views/discover/Moments.vue";


import Profile from "./views/profile/Profile.vue";
import AddFriends from "./views/contacts/AddFriends.vue";
// 我-设置
import Setting from "./views/profile/Setting.vue";
// 我-设置-切换账号
import SwitchAccount from "./views/profile/SwitchAccount.vue";
// 我-个人信息
import UserInfo from "./views/profile/UserInfo.vue"
// 我-个人信息-更多
import MoreInfo from "./views/profile/MoreInfo.vue"

import General from "./views/profile/General.vue";
import DiscoverManager from "./views/profile/DiscoverManager.vue";
import MessageNotify from "./views/profile/MessageNotify.vue";
// 联系人信息
import ContactInfo from './views/contacts/ContactInfo.vue'
// 资料设置
import DataSetting from './views/contacts/DataSetting.vue'

// 当前账号登陆
import CurrentLogin from './views/login/CurrentLogin.vue';
// 其他账号登陆
import OtherLogin from './views/login/OtherLogin.vue';

Vue.use(Router);

// 路由只是匹配规则
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "/",
      redirect: "/current-login"
    },
    {
      path: "/current-login",
      name: "current-login",
      component: CurrentLogin
    },
    {
      path: "/current-login/other-login",
      name: "other-login",
      component: OtherLogin
    },
    {
      path: "/mainframe",
      name: "mainframe",
      component: MainFrame
    },
    {
      path: "/contacts",
      name: "contacts",
      component: Contacts
    },
    {
      path: "/contacts/add-friends",
      name: "add-friends",
      component: AddFriends
    },
    {
      path: "/contacts/contact-info",
      name: "contact-info",
      component: ContactInfo
    },
    {
      path: "/contacts/contact-info/data-setting",
      name: "data-setting",
      component: DataSetting
    },
    {
      path: "/discover",
      name: "discover",
      component: Discover
    },
    {
      path: "/discover/moments",
      name: "moments", // 朋友圈
      component: Moments
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/profile/userinfo",
      name: "userinfo",
      component: UserInfo
    },
    {
      path: "/profile/userinfo/moreinfo",
      name: "moreinfo",
      component: MoreInfo
    },
    {
      path: "/profile/setting",
      name: "setting", // 设置
      component: Setting,
      children: [{
        path: 'switch-account',
        name: "switch-account",
        component: SwitchAccount
      }, ]
    },
    {
      path: "/profile/setting/general",
      name: "general", // 通用
      component: General
    },
    {
      path: "/profile/setting/message-notify",
      name: "message-notify", // 新消息通知
      component: MessageNotify
    },
    {
      path: "/profile/setting/general/discover-manager",
      name: "discover-manager",
      component: DiscoverManager
    }
  ]
});