<template>
  <div class="_full-content _content-padding-top44 _content-padding-bottom49">
    <NavigationBar title="通讯录" :right-item="addFriendsItem" @right-click="rightItemDidClicked"></NavigationBar>

    <!-- <transition
      name="custom-classes-transition"
      enter-active-class="animated tada"
      leave-active-class="animated bounceOutRight"
    >
      
    </transition>-->
    <router-link to="/contacts/contact-info">Toggle render</router-link>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeInRight"
    >
      <p v-if="show">hello</p>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import NavigationBar from "../../components/navigationBar/NavigationBar";
import MHBarButtonItem from "../../assets/js/MHBarButtonItem.js";
export default {
  data() {
    return {
      show: true,
      addFriendsItem: new MHBarButtonItem("", "nav_bar_addfriends", 1),
      enterAnimate: "", // 页面进入动效
      leaveAnimate: "" // 页面离开动效
    };
  },
  components: {
    NavigationBar
  },
  methods: {
    rightItemDidClicked(index) {
      console.log(index);
      this.$router.push("/contacts/contact-info");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
