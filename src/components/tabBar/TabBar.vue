<template>
  <div>
    <nav class="mh-tab-bar">
      <router-link class="mh-tab-item" to="/" exact>
        <img class="mh-tab-icon" src="../../assets/images/tabBar/tabbar_mainframe_25x23.png" alt>
        <span class="mh-tab-label">微信</span>
      </router-link>
      <router-link class="mh-tab-item" to="/contacts">
        <!-- <span class="mh-tab-icon mui-icon-email">
          <span class="mui-badge">9</span>
        </span>-->
        <img class="mh-tab-icon" src="../../assets/images/tabBar/tabbar_contacts_27x23.png" alt>
        <span class="mh-tab-label">通讯录</span>
      </router-link>
      <router-link class="mh-tab-item" to="/discover">
        <img class="mh-tab-icon" src="../../assets/images/tabBar/tabbar_discover_23x23.png" alt>
        <span class="mh-tab-label">发现</span>
      </router-link>
      <router-link class="mh-tab-item" to="/profile">
        <img class="mh-tab-icon" src="../../assets/images/tabBar/tabbar_me_23x23.png" alt>
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
    return {
      selectedMainFrame: 1,
      selectedContacts: 0,
      selectedDiscover: 0,
      selectedProfile: 0
    };
  },
  methods: {
    itemClick(e) {
      console.log(e);
    }
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
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
  position: fixed;
  z-index: 10;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: white;
}

// 该类名，解决 tabbar 点击无法切换的问题
.mh-tab-bar .mh-tab-item {
  flex: auto;
  overflow: hidden;
  height: 49px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}
.mh-tab-bar .mh-tab-item.router-link-active {
  color: #0f0;
}
.mh-tab-bar .mh-tab-item .mh-tab-icon {
  position: relative;
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
