<template>
  <div class="_full-container">
    <NavigationBar
      :left-item="blackBackItem"
      :right-item="moreItem"
      :title="title"
      @left-click="$router.back()"
      @right-click="rightItemClick"
    ></NavigationBar>
    <div class="_full-content _content-padding-top44"></div>
  </div>
</template>

<script>
import { moreItem } from "@/assets/js/MHBarButtonItem.js";
export default {
  name: "chat-message",
  data() {
    return {
      moreItem,
      title: ""
    };
  },
  created() {
    this.title = this.$route.params.title;
  },
  methods: {
    rightItemClick() {
      console.log("More More");
    }
  }
};
</script>

<style scoped></style>
