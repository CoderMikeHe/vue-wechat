<template>
  <div id="app">
    <transition>
      <router-view></router-view>
    </transition>

    <!-- tabBar -->
    <tabBar></tabBar>
  </div>
</template>

<script>
import tabBar from "./components/tabBar/TabBar";
import navigationBar from "./components/navigationBar/NavigationBar";
import MHBarButtonItem from "./assets/js/MHBarButtonItem.js";
export default {
  name: "app",
  data() {
    return {
      backItem: new MHBarButtonItem(
        "返回",
        "./assets/images/navBar/nav_bar_back_arrow.png",
        1
      ),
      enterAnimate: "", // 页面进入动效
      leaveAnimate: "" // 页面离开动效
    };
  },
  components: {
    tabBar,
    navigationBar
  }
};
</script>


<style scoped>
/* https://blog.csdn.net/weixin_41000111/article/details/80450397 */
/* .ssss /deep/ .mint-header{
    background-color: #000;
  } */
</style>

