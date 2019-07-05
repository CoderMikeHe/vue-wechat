<template>
  <nav class="mh-tab-bar" id="tabBar">
    <router-link
      class="mh-tab-item"
      to="/homepage/mainframe"
      replace
      @click.native.prevent="itemDidClicked(0)"
    >
      <span class="mh-tab-icon-box">
        <img class="mh-tab-icon" :src="getMainFrameImage" alt />
        <span
          v-show="mainframe.show"
          class="weui-badge"
          :class="{ 'weui-badge_dot': mainframe.dot }"
          >{{ mainframe.text }}
        </span>
      </span>
      <span class="mh-tab-label">微信</span>
    </router-link>
    <router-link
      class="mh-tab-item"
      to="/homepage/contacts"
      replace
      @click.native.prevent="itemDidClicked(1)"
    >
      <span class="mh-tab-icon-box">
        <img class="mh-tab-icon" :src="getContactsImage" alt />
      </span>
      <span class="mh-tab-label">通讯录</span>
    </router-link>
    <!-- 发现 -->
    <router-link
      class="mh-tab-item"
      to="/homepage/discover"
      replace
      @click.native.prevent="itemDidClicked(2)"
    >
      <span class="mh-tab-icon-box">
        <img class="mh-tab-icon" :src="getDiscoverImage" alt />
        <span
          v-show="discover.show"
          class="weui-badge"
          :class="{ 'weui-badge_dot': discover.dot }"
          >{{ discover.text }}
        </span>
      </span>
      <span class="mh-tab-label">发现</span>
    </router-link>
    <!-- 我 -->
    <router-link
      class="mh-tab-item"
      to="/homepage/profile"
      replace
      @click.native.prevent="itemDidClicked(3)"
    >
      <span class="mh-tab-icon-box">
        <img class="mh-tab-icon" :src="getProfileImage" alt />
        <span
          v-show="profile.show"
          class="weui-badge"
          :class="{ 'weui-badge_dot': profile.dot }"
          >{{ profile.text }}
        </span>
      </span>
      <span class="mh-tab-label">我</span>
    </router-link>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "tab-bar",
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

  mounted() {
    console.log("回答哈哈都是");
    console.log(this.profile);
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
    },
    ...mapState({
      profile: state => state.badge.profile,
      mainframe: state => state.badge.mainframe,
      discover: state => state.badge.discover
    })
  }
};
</script>

<style lang="scss" scoped>
// 第三方样式
.weui-badge {
  position: absolute;
  left: 18px;
  top: -2px;
}

// tabBar
.mh-tab-bar {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  background-color: #f6f6f6;
  /* 适当增加z-index，因为fixed总是相对窗口的层级 */
  z-index: 3;
  height: 49px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}

// 该类名，解决 tabbar 点击无法切换的问题
.mh-tab-bar .mh-tab-item {
  flex: auto;
  height: 49px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #191919;
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
</style>
