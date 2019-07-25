<template>
  <vue-route-layout>
    <div class="_content-padding-top44">
      <NavigationBar
        title="设置"
        :left-item="blackBackItem"
        @left-click="$router.back()"
      ></NavigationBar>
      <div
        class="mh-common-group"
        v-for="(group, section) in dataSource"
        :key="section"
      >
        <common
          :group="group"
          :section="section"
          @did-select-row="didSelectRow"
        ></common>
      </div>
      <!-- 切换账号 -->
      <div class="mh-common-group">
        <div class="mh-center-cell">
          <a class="mh-center-content _mh-cell-access" @click="switchAccount"
            >切换账号</a
          >
        </div>
      </div>
      <!-- 退出登录 -->
      <div class="mh-common-group">
        <div class="mh-center-cell">
          <a class="mh-center-content _mh-cell-access" @click="logout"
            >退出登录</a
          >
        </div>
      </div>
      <!-- ActionSheet -->
      <actionSheet
        v-model="showActionSheet"
        @did-click-item="didClickItem"
        :items="items"
        title="退出后不会删除任何历史数据，下次登录依然可以使用本账号"
      ></actionSheet>

      <!-- SwitchAccount -->
      <transition
        enter-active-class="animated slideInUp faster"
        leave-active-class="animated slideOutDown faster"
      >
        <router-view></router-view>
      </transition>
    </div>
  </vue-route-layout>
</template>

<script>
import common from "components/common/Common";
import actionSheet, {
  ActionSheetItem
} from "components/actionSheet/ActionSheet";

import { MHCommonGroup, MHCommonItem } from "assets/js/MHCommonGroup.js";
// import SwitchAccount from "components/switchAccount/SwitchAccount";
// 账号存储
import AccountHelper from "@/assets/js/account/account";
export default {
  name: "setting",
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
    this.configItems();
  },
  mounted() {
    console.log("---___---");
    console.log(this.$route.name + "  👉  " + window.history.length);
  },
  activated() {
    console.log("---XXX---");
  },
  methods: {
    // 配置数据
    configData() {
      // group0
      const group0 = new MHCommonGroup();
      // 账号与安全
      const accountSecurity = new MHCommonItem({
        title: "账号与安全"
      });
      group0.items = [accountSecurity];

      // group1
      const group1 = new MHCommonGroup();
      // 新消息通知
      const messageNotify = new MHCommonItem({
        title: "新消息通知",
        name: "message-notify"
      });
      // 隐私
      const privates = new MHCommonItem({
        title: "隐私"
      });
      // 通用
      const general = new MHCommonItem({
        title: "通用",
        name: "general"
      });
      group1.items = [messageNotify, privates, general];

      // group2
      const group2 = new MHCommonGroup();
      // 帮助与反馈
      const help = new MHCommonItem({
        title: "帮助与反馈",
        name: "setting"
      });
      // 关于微信
      const aboutUs = new MHCommonItem({
        title: "关于微信",
        subtitle: "微信7.0.3"
      });
      group2.items = [help, aboutUs];

      // group3
      const group3 = new MHCommonGroup();
      // 插件
      const plugin = new MHCommonItem({
        title: "插件"
      });
      group3.items = [plugin];

      this.dataSource = [group0, group1, group2, group3];
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
    },
    // 配置actionsheet items
    configItems() {
      const logoutItem = new ActionSheetItem({
        title: "退出登录",
        destructive: true
      });
      this.items = [logoutItem];
    },
    // actionSheet事件点击
    didClickItem(index) {
      if (index === 0) return;
      // 显示loading
      let loading = this.$weui.loading("正在加载中...");
      setTimeout(() => {
        loading.hide();
        // 退出登录
        AccountHelper.logout();
      }, 1000);
    }
  },
  components: {
    common,
    actionSheet
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
