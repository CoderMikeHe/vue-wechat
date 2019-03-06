<template>
  <div id="app">
    <section class="app-content">
      <router-view></router-view>
    </section>
    <footer>
      <tabBar></tabBar>
    </footer>
  </div>
</template>

<script>
import tabBar from "./components/tabBar/TabBar";
import navigationBar from "./components/navigationBar/NavigationBar";
import MHBarButtonItem from './assets/js/MHBarButtonItem.js'
export default {
  name: "app",
  data() {
    return {
      backItem:new MHBarButtonItem('返回','./assets/images/navBar/nav_bar_back_arrow.png',1)
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

