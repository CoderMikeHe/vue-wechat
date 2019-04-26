// 项目主页

<template>
  <!-- 搞个绝对定位的盒子 -->
  <div class="_full-container">
    <div class="_full-content">
      <!-- <keep-alive> -->
      <router-view></router-view>
      <!-- </keep-alive> -->
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from "../../components/tabBar/TabBar";

export default {
  name: "homepage",
  data() {
    return {};
  },
  components: {
    TabBar
  }
};
</script>

<style scoped></style>
