<template>
  <div>
    <div class="mh-common-group" v-for="(group,section) in dataSource" :key="section">
      <common :group="group" :section="section" @did-select-row="didSelectRow"></common>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import common from "../../components/common/Common";
import { MHCommonGroup, MHCommonItem } from "../../assets/js/MHCommonGroup.js";
export default {
  name: "profile",

  data() {
    return {
      dataSource: []
    };
  },
  created() {
    // 配置数据
    this.configData();
  },
  methods: {
    // 配置数据
    configData() {
      // group0
      const group0 = new MHCommonGroup();
      // 支付
      const pay = new MHCommonItem({
        title: "支付",
        icon: "WeChatPay_25x25"
      });
      group0.items = [pay];

      // group1
      const group1 = new MHCommonGroup();
      // 收藏
      const collect = new MHCommonItem({
        title: "收藏",
        icon: "MoreMyFavorites_25x25"
      });
      // 相册
      const album = new MHCommonItem({
        title: "相册",
        icon: "MoreMyAlbum_25x25"
      });
      // 卡包
      const card = new MHCommonItem({
        title: "卡包",
        icon: "MyCardPackageIcon_25x25"
      });
      // 表情
      const expression = new MHCommonItem({
        title: "表情",
        icon:"MoreExpressionShops_25x25",
      });
      group1.items = [collect, album, card, expression];

      // group2
      const group2 = new MHCommonGroup();
      // 设置
      const setting = new MHCommonItem({
        title: "设置",
        icon: "MoreSetting_25x25",
        name: "setting"
      });
      group2.items = [setting];

      this.dataSource = [group0, group1, group2];
    },
    // 点击事件
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

<style lang="scss" scoped>
.mh-common-group {
  margin-top: 8px;
}
</style>