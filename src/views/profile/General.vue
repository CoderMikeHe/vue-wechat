<template>
  <div>
    <NavigationBar
      title="通用"
      :left-item="backItem"
      @left-click="$router.back()"
    ></NavigationBar>
    <div class="_full-content _content-padding-top44">
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
        <div class="mh-center-cell" @click="clearChatHistory">
          <a class="mh-center-content _mh-cell-access">清空聊天记录</a>
        </div>
      </div>
      <!-- ActionSheet -->
      <actionSheet
        v-model="showActionSheet"
        :items="items"
        title="将删除所有个人和群的聊天记录"
        @did-click-item="didClickItem"
      ></actionSheet>
    </div>
  </div>
</template>

<script>
import common from "components/common/Common";
import {
  MHCommonGroup,
  MHCommonItem,
  MHCommonItemSwitch
} from "assets/js/MHCommonGroup.js";
import MHPreferenceSettingHelper from "assets/js/MHPreferenceSettingHelper.js";
import actionSheet, {
  ActionSheetItem
} from "components/actionSheet/ActionSheet";
export default {
  name: "general",
  data() {
    return {
      dataSource: [],
      showActionSheet: false, // 显示ActionSheet,
      items: []
    };
  },
  created() {
    this.configData();
    this.configItems();
  },
  methods: {
    // 配置数据
    configData() {
      // group0
      const group0 = new MHCommonGroup();
      // 多语言
      const language = new MHCommonItem({
        title: "多语言"
      });
      group0.items = [language];

      // group1
      const group1 = new MHCommonGroup();
      // 字体大小
      const fontSize = new MHCommonItem({
        title: "字体大小"
      });
      // 聊天背景
      const chatBg = new MHCommonItem({
        title: "聊天背景"
      });
      // 我的表情
      const myEmotion = new MHCommonItem({
        title: "我的表情"
      });
      // 照片、视频和文件
      const resource = new MHCommonItem({
        title: "照片、视频和文件"
      });
      group1.items = [fontSize, chatBg, myEmotion, resource];

      // group2
      const group2 = new MHCommonGroup();
      // 听筒模式
      const receiverMode = new MHCommonItemSwitch({
        title: "听筒模式",
        key: MHPreferenceSettingHelper.MHReceiverModeKey
      });

      group2.items = [receiverMode];

      // group3
      const group3 = new MHCommonGroup();
      // 发现页管理
      const discoverManager = new MHCommonItem({
        title: "发现页管理",
        name: "discover-manager"
      });
      // 辅助功能
      const additionalFunction = new MHCommonItem({
        title: "辅助功能"
      });
      group3.items = [discoverManager, additionalFunction];

      // group4
      const group4 = new MHCommonGroup();
      // 聊天记录备份与迁移
      const chatRecord = new MHCommonItem({
        title: "聊天记录备份与迁移"
      });
      // 存储空间
      const storageSpace = new MHCommonItem({
        title: "存储空间"
      });
      group4.items = [chatRecord, storageSpace];

      this.dataSource = [
        group0,
        group1,
        group2,
        group3,
        group4,
        group0,
        group1,
        group2,
        group3,
        group4
      ];
    },
    // item点击事件
    didSelectRow(section, row) {
      const item = this.dataSource[section].items[row];
      this.$router.push({ name: item.name });
    },
    // 清除历史记录
    clearChatHistory() {
      this.showActionSheet = true;
      console.log(
        "document.documentElement.scrollTop  ==== " +
          document.documentElement.scrollTop
      );
      console.log("document.body.scrollTop  ==== " + document.body.scrollTop);
    },
    // 配置actionsheet items
    configItems() {
      const deleteItem = new ActionSheetItem({
        title: "删除联系人",
        destructive: true
      });
      this.items = [deleteItem];
    },
    didClickItem(index) {
      if (index === 0) {
        // 0是取消按钮 默认
        return;
      }
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
  color: black;
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
