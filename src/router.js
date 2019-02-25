import Vue from "vue";
import Router from "vue-router";

// 四个大模块
import Mainfarme from "./views/mainframe/Mainframe";
import Contacts from "./views/contacts/Contacts";
import Discover from "./views/discover/Discover";
import Profile from "./views/profile/Profile";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "mainframe",
      component: Mainfarme
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
