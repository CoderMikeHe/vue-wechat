// 当前账号登陆
<template>
  <div class="_full-container">
    <!-- 底部更多 -->
    <div class="mh-current-login__more">
      <span class="mh-current-login__more-item" @click="itemDidClick(0)">找回密码</span>
      <span class="mh-current-login__more-item" @click="itemDidClick(1)">紧急冻结</span>
      <span class="mh-current-login__more-item" @click="itemDidClick(2)">更多选项</span>
    </div>

    <!-- ActionSheet -->
    <ActionSheet
      v-model="showActionSheet"
      @did-click-item="didClickItem"
      :items="items"
      title="退出后不会删除任何历史数据，下次登录依然可以使用本账号"
    ></ActionSheet>
  </div>
</template>

<script>
import ActionSheet, {
  ActionSheetItem
} from "components/actionSheet/ActionSheet";
export default {
  name: "CurrentLogin",
  data() {
    return {
      showActionSheet: false, // 显示ActionSheet
      items: []
    };
  },
  created() {
    this.configItems();
  },
  methods: {
    itemDidClick(idx) {
      switch (idx) {
        case 0:
          break;
        case 1:
          break;
        default:
          this.showActionSheet = true;
          break;
      }
    },
    // 配置actionsheet items
    configItems() {
      const logoutItem = new ActionSheetItem({
        title: "退出登录",
        destructive: true
      });
      this.items = [logoutItem];
    },
    didClickItem(index) {}
  },
  components: {
    ActionSheet
  }
};
</script>

<style scoped>
.mh-current-login__more {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
  color: blue;
  text-align: center;
  font-size: 16px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
}
.mh-current-login__more-item {
  position: relative;
  padding: 0 10px;
}

.mh-current-login__more-item:not(:last-child)::after {
  content: "";
  position: absolute;
  width: 1px;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: red;
  -webkit-transform: scale(0.5);
  -ms-transform: scale(0.5);
  transform: scale(0.5);
}
</style>
