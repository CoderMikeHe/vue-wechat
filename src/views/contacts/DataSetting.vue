// 资料设置
<template>
  <div class="_full-container">
    <NavigationBar title="资料设置" :left-item="backItem" @left-click="$router.back()"></NavigationBar>
    <div class="_full-content _content-padding-top44">
      <div class="mh-common-group" v-for="(group,section) in dataSource" :key="section">
        <common :group="group" :section="section" @did-select-row="didSelectRow"></common>
      </div>
      <!-- 删除 CMH TODO 增加ActionSheet-->
      <div class="mh-common-group">
        <div class="mh-center-cell _mh-tap-highlight" @click="deleteContact">删除</div>
      </div>
      <!-- ActionSheet -->
      <actionSheet
        v-model="showActionSheet"
        :items="items"
        :title="'将联系人“'+username+'”删除，同时删除与该联系人的聊天记录'"
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
  name: "data-setting",
  data() {
    return {
      dataSource: [],
      showActionSheet: false, // 显示ActionSheet,
      items: [],
      username: "吴亦凡"
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
      // 设置备注和标签
      const remarkSetting = new MHCommonItem({
        title: "设置备注和标签"
      });
      group0.items = [remarkSetting];

      // group1
      const group1 = new MHCommonGroup();
      // 把他推荐给朋友
      const recommend = new MHCommonItem({
        title: "把他推荐给朋友"
      });
      group1.items = [recommend];

      // group2
      const group2 = new MHCommonGroup();
      // 设为星标朋友
      const starTarget = new MHCommonItemSwitch({
        title: "设为星标朋友"
      });
      group2.items = [starTarget];

      // group3
      const group3 = new MHCommonGroup({ header: "朋友圈和视频动态" });
      // 不让他看
      const heCanNotSeeMe = new MHCommonItemSwitch({
        title: "不让他看"
      });
      // 不看他
      const iCanNotSeeHe = new MHCommonItemSwitch({
        title: "不看他"
      });
      group3.items = [heCanNotSeeMe, iCanNotSeeHe];

      // group4
      const group4 = new MHCommonGroup();
      // 加入黑名单
      const blacklist = new MHCommonItemSwitch({
        title: "加入黑名单"
      });
      // 投诉
      const complain = new MHCommonItem({
        title: "投诉"
      });
      group4.items = [blacklist, complain];

      this.dataSource = [group0, group1, group2, group3, group4];
    },

    // item点击事件
    didSelectRow(section, row) {
      const item = this.dataSource[section].items[row];
      console.log(item.name);
      this.$router.push({ name: item.name });
    },
    deleteContact() {
      this.showActionSheet = true;
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
  background-color: #fff;
  overflow: hidden;
  position: relative;
  font-size: 17px;
  color: red;
  text-align: center;
  line-height: 56px;
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
