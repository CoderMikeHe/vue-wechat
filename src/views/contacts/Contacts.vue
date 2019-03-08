<template>
  <div>
    <NavigationBar title="通讯录" :right-item="addFriendsItem" @right-click="rightItemDidClicked"></NavigationBar>
    <transition
        name="custom-classes-transition"
        :enter-active-class="enterAnimate"
        :leave-active-class="leaveAnimate"
      >
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import NavigationBar from "../../components/navigationBar/NavigationBar";
import MHBarButtonItem from "../../assets/js/MHBarButtonItem.js";
export default {
  data() {
    return {
      addFriendsItem: new MHBarButtonItem("", "nav_bar_addfriends", 1),
      enterAnimate: "", // 页面进入动效
      leaveAnimate: "" // 页面离开动效
    };
  },
  components: {
    NavigationBar
  },
  methods: {
    rightItemDidClicked(index) {
      console.log(index);
      this.$router.push("/contacts/add-friends");
    }
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
        toDepth > fromDepth ? "animated slideInRight" : "animated slideInLeft";
      this.leaveAnimate =
        toDepth > fromDepth ? "animated slideOutLeft" : "animated slideOutRight";
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
