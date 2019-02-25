<template>
  <div>
    <nav class="mh-tab-bar">
      <router-link class="mh-tab-item mui-active" to="/">
        <img class="mh-tab-icon" src="../../assets/images/tabBar/tabbar_mainframe_25x23.png" alt="">
        <span class="mh-tab-label">微信</span>
      </router-link>
      <router-link class="mh-tab-item" to="/contacts">
        <!-- <span class="mh-tab-icon mui-icon-email">
          <span class="mui-badge">9</span>
        </span> -->
        <img class="mh-tab-icon" src="../../assets/images/tabBar/tabbar_mainframe_25x23.png" alt="">
        <span class="mh-tab-label">通讯录</span>
      </router-link>
      <router-link class="mh-tab-item" to="/discover">
        <!-- <span class="mui-icon mui-icon-contact"></span> -->
        <img class="mh-tab-icon" src="../../assets/images/tabBar/tabbar_mainframe_25x23.png" alt="">
        <span class="mh-tab-label">发现</span>
      </router-link>
      <router-link class="mh-tab-item" to="/profile">
        <!-- <span class="mui-icon mui-icon-gear"></span> -->
        <img class="mh-tab-icon" src="../../assets/images/tabBar/tabbar_mainframe_25x23.png" alt="">
        <span class="mh-tab-label">我</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
import "weui";
// import mui from "../../assets/vendor/mui/js/mui.min.js";
export default {
  data() {
    return {};
  },
  methods: {
    itemClick(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="scss" scoped>
// tabBar
.mh-tab-bar {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  // flex: auto; // 1 1 auto
  flex-grow: 1;
  position: fixed;
  z-index: 10;
  right: 0;
  left: 0;
  bottom: 0;
  height: 49px;
  width: 100%;
  background-color: antiquewhite;
  align-items: center;
}

// 该类名，解决 tabbar 点击无法切换的问题
// .mui-bar-tab .mh-tab-item {
//   color: #0f0;
// }

.mh-tab-bar .mh-tab-item {
  overflow: hidden;
  height: 49px;
  // width: 25%;
  text-align: center;
  // vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
  display: block;
}

.mh-tab-bar .mh-tab-item .mh-tab-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mh-tab-bar .mh-tab-item .mh-tab-icon ~ .mh-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
