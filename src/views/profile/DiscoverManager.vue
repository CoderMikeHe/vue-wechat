// 发现页管理
<template>
  <div class="_full-container">
    <NavigationBar title="发现页管理" :left-item="blackBackItem" @left-click="$router.back()"></NavigationBar>
    <div class="_full-content _content-padding-top44">
      <div class="mh-common-group" v-for="(group,section) in dataSource" :key="section">
        <common :group="group" :section="section" @did-select-row="didSelectRow"></common>
      </div>
    </div>
  </div>
</template>

<script>
import common from "components/common/Common";
import { MHCommonGroup, MHCommonItemSwitch } from "assets/js/MHCommonGroup.js";
import MHPreferenceSettingHelper from "assets/js/MHPreferenceSettingHelper.js";

export default {
  name: "discoverManager",
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
      const group0 = new MHCommonGroup({
        header: "打开/关闭发现页的入口",
        footer: "关闭后，仅隐藏“发现”中该功能的入库，不会清空任何历史数据"
      });
      // 朋友圈
      const moments = new MHCommonItemSwitch({
        title: "朋友圈",
        icon: "ff_IconShowAlbum_25x25",
        key: MHPreferenceSettingHelper.MHMomentsKey
      });

      // 扫一扫
      const qrCode = new MHCommonItemSwitch({
        title: "扫一扫",
        icon: "ff_IconQRCode_25x25",
        key: MHPreferenceSettingHelper.MHQrCodeKey
      });
      // 摇一摇
      const shake = new MHCommonItemSwitch({
        title: "摇一摇",
        icon: "ff_IconShake_25x25",
        key: MHPreferenceSettingHelper.MHShakeKey
      });

      // 看一看
      const look = new MHCommonItemSwitch({
        title: "看一看",
        icon: "ff_IconBrowse1_25x25",
        key: MHPreferenceSettingHelper.MHLookKey
      });
      // 搜一搜
      const search = new MHCommonItemSwitch({
        title: "搜一搜",
        icon: "ff_IconSearch1_25x25",
        key: MHPreferenceSettingHelper.MHSearchKey
      });

      // 附近的人
      const locationService = new MHCommonItemSwitch({
        title: "附近的人",
        icon: "ff_IconLocationService_25x25",
        key: MHPreferenceSettingHelper.MHLocationServiceKey
      });
      // 漂流瓶
      const bottle = new MHCommonItemSwitch({
        title: "漂流瓶",
        icon: "ff_IconBottle_25x25",
        key: MHPreferenceSettingHelper.MHBottleKey
      });

      // 购物
      const shopping = new MHCommonItemSwitch({
        title: "购物",
        icon: "CreditCard_ShoppingBag_25x25",
        key: MHPreferenceSettingHelper.MHShoppingKey
      });
      // 游戏
      const game = new MHCommonItemSwitch({
        title: "游戏",
        icon: "MoreGame_25x25",
        key: MHPreferenceSettingHelper.MHGameKey
      });

      // 小程序
      const moreApps = new MHCommonItemSwitch({
        title: "小程序",
        icon: "MoreWeApp_25x25",
        key: MHPreferenceSettingHelper.MHMoreAppsKey
      });
      group0.items = [
        moments,
        qrCode,
        shake,
        look,
        search,
        locationService,
        bottle,
        shopping,
        game,
        moreApps
      ];
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
</style>
