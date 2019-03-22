// 朋友圈
<template>
  <div class="_full-container">
    <NavigationBar
      title="朋友圈"
      :left-item="backItem"
      :right-item="moreItem"
      @left-click="$router.back()"
      @right-click="rightItemClick"
    ></NavigationBar>
    <!-- ActionSheet -->
    <actionSheet v-model="showActionSheet" @did-click-item="didClickItem" :items="items"></actionSheet>
  </div>
</template>

<script>
import MHBarButtonItem, { moreItem } from "assets/js/MHBarButtonItem.js";
import actionSheet, {
  ActionSheetItem
} from "components/actionSheet/ActionSheet";
export default {
  name: "moments",
  data() {
    return {
      moreItem: moreItem,
      items: [],
      showActionSheet: false // 显示ActionSheet
    };
  },
  created() {
    this.configItems();
  },
  methods: {
    rightItemClick() {
      this.showActionSheet = true;
    },
    // 配置actionsheet items
    configItems() {
      const takePhoto = new ActionSheetItem({
        title: "拍摄",
        subtitle: "照片或视频"
      });
      const album = new ActionSheetItem({
        title: "从手机相册选取"
      });
      this.items = [takePhoto, album];
    },
    didClickItem(index) {
      console.log(index);
    }
  },
  components: {
    actionSheet
  }
};
</script>

<style scoped>
</style>
