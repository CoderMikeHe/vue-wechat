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
  </div>
</template>

<script>
import MHBarButtonItem, { moreItem } from "assets/js/MHBarButtonItem.js";
import actionSheet from "components/actionSheet/ActionSheet";
import ActionSheetItem from "components/actionSheet/ActionSheetItem.js";
export default {
  name: "moments",
  data() {
    return {
      moreItem: moreItem
    };
  },
  methods: {
    rightItemClick() {}
  }
};
</script>

<style scoped>
</style>
