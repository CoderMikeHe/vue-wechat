<template>
  <div id="app">
    <transition
        name="custom-classes-transition"
        :enter-active-class="enterAnimate"
        :leave-active-class="leaveAnimate"
      >
        <router-view></router-view>
    </transition>
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
  },
  watch: {
    // 监听路由变化 设置页面的过度效果
    $route(to, from) {
      console.log(to, from);
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;

      console.log(toDepth);
      console.log(fromDepth);

      //同一级页面无需设置过渡效果
      if (toDepth === fromDepth) {
        return;
      }

      
      this.enterAnimate =
        toDepth > fromDepth ? "animated fadeInRight" : "animated fadeInLeft";
      this.leaveAnimate =
        toDepth > fromDepth ? "animated fadeOutLeft" : "animated fadeOutRight";
    }
  }
};
</script>


<style scoped>
/* https://blog.csdn.net/weixin_41000111/article/details/80450397 */
/* .ssss /deep/ .mint-header{
    background-color: #000;
  } */
</style>

