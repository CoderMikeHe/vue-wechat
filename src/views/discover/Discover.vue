<template>
  <div class="_full-content _content-margin-top44 _content-margin-bottom49">
    <NavigationBar title="发现"></NavigationBar>
    <div>
      <div class="mh-common-group" v-for="(group,section) in dataSource" :key="section">
        <common :group="group" :section="section" @did-select-row="didSelectRow"></common>
      </div>
    </div>
  </div>
</template>

<script>
import common from "components/common/Common";
import { MHCommonGroup, MHCommonItem } from "assets/js/MHCommonGroup.js";
export default {
  name: "discover",
  data() {
    return {
      dataSource: []
    };
  },
  created() {
    this.configData();
  },
  methods: {
    // 配置数据
    configData() {
      // group0
      const group0 = new MHCommonGroup();
      // 朋友圈
      const moments = new MHCommonItem({
        title: "朋友圈",
        icon: "ff_IconShowAlbum_25x25",
      });
      group0.items = [moments];

      // group1
      const group1 = new MHCommonGroup();
      // 扫一扫
      const qrCode = new MHCommonItem({
        title: "扫一扫",
        icon: "ff_IconQRCode_25x25",
      });
      // 摇一摇
      const shake = new MHCommonItem({
        title: "摇一摇",
        icon: "ff_IconShake_25x25",
      });
      group1.items = [qrCode, shake];

      // group2
      const group2 = new MHCommonGroup();
      // 看一看
      const look = new MHCommonItem({
        title: "看一看",
        icon: "ff_IconBrowse1_25x25",
      });
      // 搜一搜
      const search = new MHCommonItem({
        title: "搜一搜",
        icon: "ff_IconSearch1_25x25",
      });
      group2.items = [look,search];

      // group3
      const group3 = new MHCommonGroup();
      // 附近的人
      const locationService = new MHCommonItem({
        title: "附近的人",
        icon: "ff_IconLocationService_25x25",
      });
      // 漂流瓶
      const bottle = new MHCommonItem({
        title: "漂流瓶",
        icon : "ff_IconBottle_25x25",
      });
      group3.items = [locationService, bottle];

      // group4
      const group4 = new MHCommonGroup();
      // 购物
      const shopping = new MHCommonItem({
        title: "购物",
        icon: "CreditCard_ShoppingBag_25x25",
      });
      // 游戏
      const game = new MHCommonItem({
        title: "游戏",
        icon: "MoreGame_25x25",
      });
      group4.items = [shopping, game];

      // group5
      const group5 = new MHCommonGroup();
      // 小程序
      const moreApps = new MHCommonItem({
        title: "小程序",
        icon: "MoreWeApp_25x25",
      });
      group5.items = [moreApps];

      this.dataSource = [group0, group1, group2, group3, group4, group5];
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
