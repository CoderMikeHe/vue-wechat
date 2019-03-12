import Vue from "vue";
import Router from "vue-router";

// 四个大模块
import MainFrame from "./views/mainframe/Mainframe.vue";
import Contacts from "./views/contacts/Contacts.vue";
import Discover from "./views/discover/Discover.vue";
import Profile from "./views/profile/Profile.vue";
import AddFriends from "./views/contacts/AddFriends.vue";
import Setting from './views/profile/Setting.vue';
import General from './views/profile/General.vue';
import DiscoverManager from './views/profile/DiscoverManager.vue';
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "/",
      redirect: "/mainframe"
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
      path: "/discover",
      name: "discover",
      component: Discover
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/profile/setting",
      name: "setting",
      component: Setting
    },
    {
      path: "/profile/setting/general",
      name: "general",
      component: General
    },
    {
      path: "/profile/setting/general/discover-manager",
      name: "discover-manager",
      component: DiscoverManager
    }
  ]
});