import Vue from "vue";
import Router from "vue-router";

// 四个大模块
import MainFarme from "./views/mainframe/MainFrame";
import Contacts from "./views/contacts/Contacts";
import Discover from "./views/discover/Discover";
import Profile from "./views/profile/Profile";

Vue.use(Router);

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "/",
      redirect: "/mainframe"
    },
    {
      path: "/mainframe",
      name: "mainframe",
      component: MainFarme
    },
    {
      path: "/contacts",
      name: "contacts",
      component: Contacts
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
    }
  ]
});