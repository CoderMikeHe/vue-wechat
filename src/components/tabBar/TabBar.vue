<template>
  <div>
    <nav class="mh-tab-bar">
      <router-link class="mh-tab-item" to="/mainframe" @click.native.prevent="itemDidClicked(0)">
        <span class="mh-tab-icon-box">
          <img class="mh-tab-icon" :src="getMainFrameImage" alt>
          <span class="mh-tab-badge">9</span>
        </span>
        <span class="mh-tab-label">微信</span>
      </router-link>
      <router-link class="mh-tab-item" to="/contacts" @click.native.prevent="itemDidClicked(1)">
        <img class="mh-tab-icon" :src="getContactsImage" alt>
        
        <span class="mh-tab-label">通讯录</span>
      </router-link>
      <router-link class="mh-tab-item" to="/discover" @click.native.prevent="itemDidClicked(2)">
        <img class="mh-tab-icon" :src="getDiscoverImage" alt>
        <span class="mh-tab-label">发现</span>
      </router-link>
      <router-link class="mh-tab-item" to="/profile" @click.native.prevent="itemDidClicked(3)">
        <img class="mh-tab-icon" :src="getProfileImage" alt>
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
      // 初始化数据
      selectedMainFrame: 0,
      selectedContacts: 0,
      selectedDiscover: 0,
      selectedProfile: 0
    };
  },
  created() {
    // vm 刚创建好，赋值初始值
    const name = this.$route.name;
    this.selectedMainFrame = name === "mainframe" ? 1 : 0;
    this.selectedContacts = name === "contacts" ? 1 : 0;
    this.selectedDiscover = name === "discover" ? 1 : 0;
    this.selectedProfile = name === "profile" ? 1 : 0;
  },

  methods: {
    // 按钮点击
    itemDidClicked(index) {
      this.selectedMainFrame = index === 0 ? 1 : 0;
      this.selectedContacts = index === 1 ? 1 : 0;
      this.selectedDiscover = index === 2 ? 1 : 0;
      this.selectedProfile = index === 3 ? 1 : 0;
    }
  },
  computed: {
    getMainFrameImage() {
      let sel = require("../../assets/images/tabBar/tabbar_mainframeHL_25x23.png");
      let nor = require("../../assets/images/tabBar/tabbar_mainframe_25x23.png");
      return this.selectedMainFrame ? sel : nor;
    },
    getContactsImage() {
      let sel = require("../../assets/images/tabBar/tabbar_contactsHL_27x23.png");
      let nor = require("../../assets/images/tabBar/tabbar_contacts_27x23.png");
      return this.selectedContacts ? sel : nor;
    },
    getDiscoverImage() {
      let sel = require("../../assets/images/tabBar/tabbar_discoverHL_23x23.png");
      let nor = require("../../assets/images/tabBar/tabbar_discover_23x23.png");
      return this.selectedDiscover ? sel : nor;
    },
    getProfileImage() {
      let sel = require("../../assets/images/tabBar/tabbar_meHL_23x23.png");
      let nor = require("../../assets/images/tabBar/tabbar_me_23x23.png");
      return this.selectedProfile ? sel : nor;
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
  color: #181818;
}
// 选中高亮
.mh-tab-bar .mh-tab-item.router-link-active {
  color: #57be6a;
}
.mh-tab-bar .mh-tab-item .mh-tab-icon {
  position: relative;
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
.mh-tab-bar .mh-tab-item .mh-tab-label {
  font-size: 12px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mh-tab-bar .mh-tab-item .mh-tab-icon-box {
  top: 2px;
  position: relative;
  text-align: center;
  display: inline-block;
  text-overflow: ellipsis;
}

.mh-tab-bar .mh-tab-item .mh-tab-icon-box .mh-tab-badge {
  position: absolute;
  top: -2px;
  left: 100%;
  margin-left: -10px;

  font-size: 10px;
  line-height: 1;
  display: inline-block;
  border-radius: 12px;
  padding: 3px 5px;
  color: #fff;
  background-color: red;
}
</style>
