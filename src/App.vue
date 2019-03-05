<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />-->
    <header class="ssss">
      <!-- <navigationBar title="微信" :left-item="backItem"></navigationBar> -->
      <!-- <mt-button type="danger">退出登录</mt-button> -->
      <mt-header fixed title="固定在顶部">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
          <mt-button @click="handleClose">关闭</mt-button>
        </router-link>
      </mt-header>
    </header>
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
  .ssss /deep/ .mint-header{
    background-color: #000;
  }
</style>

