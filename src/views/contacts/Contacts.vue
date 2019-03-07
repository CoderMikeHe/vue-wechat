<template>
  <div>
    <NavigationBar title="通讯录" :right-item="addFriendsItem"></NavigationBar>
  </div>
</template>

<script>
import NavigationBar from "../../components/navigationBar/NavigationBar";
import MHBarButtonItem from "../../assets/js/MHBarButtonItem.js";
export default {
  data() {
    return {
      addFriendsItem: new MHBarButtonItem("", "nav_bar_addfriends", 1)
    };
  },
  components: {
    NavigationBar
  }
};
</script>

<style lang="scss" scoped>
</style>
