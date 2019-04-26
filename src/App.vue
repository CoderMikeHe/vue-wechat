<template>
  <div class="app__wrapper">
    <transition
      name="custom-classes-transition"
      :enter-active-class="enterAnimate"
      :leave-active-class="leaveAnimate"
    >
      <!-- <keep-alive> -->
      <router-view></router-view>
      <!-- </keep-alive> -->
    </transition>
    <!-- tabBar -->
    <!-- <tabBar></tabBar> -->
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
      const toDepth = 3;
      //  to.path.split("/").length;
      const fromDepth = 2;
      //  from.path.split("/").length;

      console.log(toDepth + this.enterAnimate);
      console.log(fromDepth + this.leaveAnimate);

      //同一级页面无需设置过渡效果
      if (toDepth === fromDepth) {
        this.enterAnimate = "";
        this.leaveAnimate = "";
        return;
      }

      // 动画
      this.enterAnimate =
        toDepth > fromDepth
          ? "animated slideInRight faster"
          : "animated slideInLeft faster";
      this.leaveAnimate =
        toDepth > fromDepth
          ? "animated slideOutLeft faster"
          : "animated slideOutRight faster";
    }
  }
};
</script>

<style scoped>
/* app 容器 */
.app__wrapper {
  overflow: hidden;
  position: relative;
  height: 100%;
}
</style>
