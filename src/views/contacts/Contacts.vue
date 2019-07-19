<template>
  <vue-route-layout>
    <NavigationBar
      title="通讯录"
      :right-item="addFriendsItem"
      @right-click="rightItemDidClicked"
    ></NavigationBar>
    <div class="_content-padding-top44 _content-padding-bottom49">
      <SlotTest>
        <!-- <div slot="header">我是头部</div>
      <div>我是默认</div>
      <div slot="footer">我是尾部</div> -->
        <template v-slot:header>
          <div slot="header">我是头部</div>
        </template>
        <template v-slot:default="slotProps">{{
          slotProps.user.lastName
        }}</template>
        <template v-slot:footer>
          <div>我是尾部</div>
        </template>
      </SlotTest>
    </div>
  </vue-route-layout>
</template>

<script>
import NavigationBar from "../../components/navigationBar/NavigationBar";
import MHBarButtonItem from "../../assets/js/MHBarButtonItem.js";
import SlotTest from "./Slot";
export default {
  name: "contact",
  components: {
    NavigationBar,
    SlotTest
  },
  data() {
    return {
      slotName: "CoderMikeHe",
      show: true,
      addFriendsItem: new MHBarButtonItem("", "nav_bar_addfriends", 1),
      enterAnimate: "", // 页面进入动效
      leaveAnimate: "" // 页面离开动效
    };
  },

  methods: {
    rightItemDidClicked(index) {
      console.log(index);
      this.$router.push("/contacts/contact-info");
    }
  }
};
</script>

<style lang="scss" scoped></style>
