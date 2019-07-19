<template>
  <vue-route-layout>
    <NavigationBar
      :left-item="blackBackItem"
      @left-click="$router.back()"
    ></NavigationBar>
    <div class="_content-padding-top44">
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
import {
  MHCommonGroup,
  MHCommonItem,
  MHCommonItemAvatar
} from "assets/js/MHCommonGroup.js";

export default {
  name: "userinfo",
  data() {
    return {
      dataSource: [],
      showActionSheet: false, // 显示ActionSheet
      items: [],
      show: false
    };
  },
  created() {
    this.configData();
  },
  mounted() {
    console.log(this.$route.name + "  👉  " + window.history.length);
  },
  methods: {
    // 配置数据
    configData() {
      // group0
      const group0 = new MHCommonGroup();
      // 性别
      const gender = new MHCommonItem({
        title: "性别",
        subtitle: this.$store.state.user.gender === 0 ? "男" : "女"
      });
      // 地址
      const address = new MHCommonItem({
        title: "地址",
        subtitle: "广东 深圳"
      });
      // 个性签名
      const sign = new MHCommonItem({
        title: "个性签名",
        subtitle: this.$store.state.user.featureSign
      });
      group0.items = [gender, address, sign];
      this.dataSource = [group0];
    },

    // item点击事件
    didSelectRow(section, row) {
      const item = this.dataSource[section].items[row];
      console.log(item.name);
      this.$router.push({ name: item.name });
    }
  },
  components: {
    common
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
</style>
