// 项目主页
<template>
  <!-- 搞个绝对定位的盒子 -->
  <vue-route-layout>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- <TabBar></TabBar> -->
  </vue-route-layout>
</template>

<script>
import TabBar from "@/components/tabBar/TabBar";

export default {
  name: "homepage",
  components: {
    TabBar
  },
  data() {
    return {};
  },
  created() {
    console.log("Homepage -- =++created");
  },
  mounted() {
    console.log("Homepage -- =++mounted");
  },
  activated() {
    console.log("Homepage -- activated");
  }
};
</script>

<style scoped></style>
