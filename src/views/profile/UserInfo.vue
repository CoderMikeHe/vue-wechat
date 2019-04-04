// 个人信息
<template>
  <div class="_full-container">
    <NavigationBar title="个人信息" :left-item="backItem" @left-click="$router.back()"></NavigationBar>
    <div class="_full-content _content-padding-top44">
      <div class="mh-common-group" v-for="(group,section) in dataSource" :key="section">
        <common :group="group" :section="section" @did-select-row="didSelectRow"></common>
      </div>
      <!-- SwitchAccount -->
      <transition
        enter-active-class="animated slideInUp faster"
        leave-active-class="animated slideOutDown faster"
      >
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import common from "components/common/Common";
import {
  MHCommonGroup,
  MHCommonItem,
  MHCommonItemAvatar
} from "assets/js/MHCommonGroup.js";

export default {
  name: "userinfo",
  data() {
    return {
      dataSource: [],
      showActionSheet: false, // 显示ActionSheet
      items: [],
      show: false
    };
  },
  created() {
    console.log("---+++---");
    this.configData();
  },
  mounted() {
    console.log(this.$route.name + "  👉  " + window.history.length);
  },
  methods: {
    // 配置数据
    configData() {
      // group0
      const group0 = new MHCommonGroup();
      // 账号与安全
      const avatar = new MHCommonItemAvatar({
        title: "头像",
        avatar: this.$store.state.user.profileImageUrl
      });
      // 名字
      const screenName = new MHCommonItem({
        title: "名字",
        subtitle: this.$store.state.user.screenName
      });
      // 微信号
      const wechatId = new MHCommonItem({
        title: "微信号",
        subtitle: this.$store.state.user.wechatId,
        tapHighlight: false,
        type: 1
      });
      // 我的二维码
      const qrCode = new MHCommonItem({
        title: "我的二维码",
        type: 4
      });
      // 更多
      const moreInfo = new MHCommonItem({
        title: "更多",
        name: "moreinfo"
      });

      group0.items = [avatar, screenName, wechatId, qrCode, moreInfo];

      // group1
      const group1 = new MHCommonGroup();
      // 新消息通知
      const myAddress = new MHCommonItem({
        title: "我的地址"
      });
      group1.items = [myAddress];

      this.dataSource = [group0, group1];
    },

    // item点击事件
    didSelectRow(section, row) {
      const item = this.dataSource[section].items[row];
      console.log(item.name);
      this.$router.push({ name: item.name });
    },
    // 切换账号
    switchAccount() {
      this.$router.push("/profile/setting/switch-account");
    },

    abcd() {
      console.log("OOOOOOO");
      this.show = false;
    },

    // 登出
    logout() {
      this.showActionSheet = true;
    }
  },
  components: {
    common
  }
};
</script>

<style scoped>
.mh-common-group {
  margin-top: 8px;
}
.mh-common-group:first-child {
  margin-top: 0;
}

/* cell 组 */
.mh-center-cell {
  background-color: white;
  overflow: hidden;
  position: relative;
  font-size: 17px;
  color: #191919;
  text-align: center;
}

.mh-center-content {
  display: block;
  line-height: 56px;
  text-decoration: none;
  color: #191919;
}

/* top分割线 */
.mh-center-cell:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #d8d8d8;
  color: #d8d8d8;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
/* bottom分割线 */
.mh-center-cell:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #d8d8d8;
  color: #d8d8d8;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
</style>
