<template>
  <div class="_full-content _content-padding-top44 _content-padding-bottom49">
    <NavigationBar title="发现"></NavigationBar>
    <div>
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
    </div>
  </div>
</template>

<script>
import common from "components/common/Common";
import {
  MHCommonGroup,
  MHCommonItem,
  MHCommonItemMoments
} from "assets/js/MHCommonGroup.js";
import MHPreferenceSettingHelper from "assets/js/MHPreferenceSettingHelper.js";
import BadgeHelper from "@/assets/js/badge/badgeHelper";
import { mapState, mapMutations } from "vuex";
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
      if (
        MHPreferenceSettingHelper.getBooleanItem(
          MHPreferenceSettingHelper.MHMomentsKey
        )
      ) {
        // 朋友圈
        const moments = new MHCommonItemMoments({
          title: "朋友圈",
          icon: "ff_IconShowAlbum_25x25",
          name: "moments",
          avatar: "http://tp1.sinaimg.cn/2236171720/50/5733018646/0"
        });
        group0.items.push(moments);
      }

      // group1
      const group1 = new MHCommonGroup();
      if (
        MHPreferenceSettingHelper.getBooleanItem(
          MHPreferenceSettingHelper.MHQrCodeKey
        )
      ) {
        // 扫一扫
        const qrCode = new MHCommonItem({
          title: "扫一扫",
          icon: "ff_IconQRCode_25x25"
        });
        group1.items.push(qrCode);
      }

      if (
        MHPreferenceSettingHelper.getBooleanItem(
          MHPreferenceSettingHelper.MHShakeKey
        )
      ) {
        // 摇一摇
        const shake = new MHCommonItem({
          title: "摇一摇",
          icon: "ff_IconShake_25x25"
        });
        group1.items.push(shake);
      }

      // group2
      const group2 = new MHCommonGroup();
      if (
        MHPreferenceSettingHelper.getBooleanItem(
          MHPreferenceSettingHelper.MHLookKey
        )
      ) {
        // 看一看
        const look = new MHCommonItem({
          title: "看一看",
          icon: "ff_IconBrowse1_25x25"
        });
        group2.items.push(look);
      }

      if (
        MHPreferenceSettingHelper.getBooleanItem(
          MHPreferenceSettingHelper.MHSearchKey
        )
      ) {
        // 搜一搜
        const search = new MHCommonItem({
          title: "搜一搜",
          icon: "ff_IconSearch1_25x25"
        });
        group2.items.push(search);
      }

      // group3
      const group3 = new MHCommonGroup();
      if (
        MHPreferenceSettingHelper.getBooleanItem(
          MHPreferenceSettingHelper.MHLocationServiceKey
        )
      ) {
        // 附近的人
        const locationService = new MHCommonItem({
          title: "附近的人",
          icon: "ff_IconLocationService_25x25"
        });
        group3.items.push(locationService);
      }

      if (
        MHPreferenceSettingHelper.getBooleanItem(
          MHPreferenceSettingHelper.MHBottleKey
        )
      ) {
        // 漂流瓶
        const bottle = new MHCommonItem({
          title: "漂流瓶",
          icon: "ff_IconBottle_25x25"
        });
        group3.items.push(bottle);
      }

      // group4
      const group4 = new MHCommonGroup();
      if (
        MHPreferenceSettingHelper.getBooleanItem(
          MHPreferenceSettingHelper.MHShoppingKey
        )
      ) {
        // 购物
        const shopping = new MHCommonItem({
          title: "购物",
          icon: "CreditCard_ShoppingBag_25x25"
        });
        group4.items.push(shopping);
      }

      if (
        MHPreferenceSettingHelper.getBooleanItem(
          MHPreferenceSettingHelper.MHGameKey
        )
      ) {
        // 游戏
        const game = new MHCommonItem({
          title: "游戏",
          icon: "MoreGame_25x25"
        });
        group4.items.push(game);
      }

      // group5
      const group5 = new MHCommonGroup();
      if (
        MHPreferenceSettingHelper.getBooleanItem(
          MHPreferenceSettingHelper.MHMoreAppsKey
        )
      ) {
        // 小程序
        const moreApps = new MHCommonItem({
          title: "小程序",
          icon: "MoreWeApp_25x25"
        });
        group5.items = [moreApps];
      }

      /// 遍历数据
      let tempArray = [];
      [group0, group1, group2, group3, group4, group5].forEach(group => {
        if (group.items.length > 0) {
          tempArray.push(group);
        }
      });
      this.dataSource = tempArray;
    },

    // item点击事件
    didSelectRow(section, row) {
      const item = this.dataSource[section].items[row];
      if (item.name === "moments" && item.avatar.length !== 0) {
        // 将item.avatar 清空
        item.avatar = "";
        // 取出discover badge数据
        let discover = Object.assign({}, this.discover);
        // 取出moments的value
        let value = discover.moments.value;
        // 置位0
        discover.moments.value = 0;
        // 重新赋值
        discover.moments = BadgeHelper(discover.moments);

        // 修改discover的value
        discover.value = discover.value - value;
        // 处理 text和show
        let tmp = BadgeHelper(discover);
        discover.text = tmp.text;
        discover.show = tmp.show;
        // 存储到vuex
        this.changeDiscover(discover);
      }
      this.$router.push({ name: item.name });
    },
    // vuex
    ...mapMutations("badge", ["changeDiscover"])
  },
  components: {
    common
  },
  computed: {
    ...mapState({
      discover: state => state.badge.discover
    })
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
