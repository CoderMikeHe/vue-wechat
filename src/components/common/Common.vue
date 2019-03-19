// 快速搭建设置界面的组件
<template>
  <div class="mh-cells-group">
    <!-- group 头部 -->
    <div class="mh-group-header">{{ group.header }}</div>
    <!-- group 身体 -->
    <div class="mh-group-body">
      <a
        class="mh-cell"
        v-for="(item,row) in group.items"
        :key="row"
        :class="{'_mh-cell-access':item.tapHighlight}"
        @click="didSelectRow(section,row)"
      >
        <div class="mh-cell-header">
          <img class="mh-image" :class="{'margin-right16px':item.icon}" :src="imageSrc[item.icon]">
        </div>
        <div class="mh-cell-body">
          <div class="mh-body">
            <p class="mh-title">{{ item.title }}</p>
          </div>
          <div class="mh-footer">
            <p class="mh-subtitle">{{ item.subtitle }}</p>
            <img
              class="mh-right-arrow"
              src="@/assets/images/common/tableview_arrow_8x13.png"
              v-if="item.type===0"
            >
            <mt-switch v-if="item.type===2" v-model="item.off"></mt-switch>
          </div>
        </div>
      </a>
    </div>
    <!-- group 尾部 -->
    <div class="mh-group-footer">{{ group.footer }}</div>
  </div>
</template>

<script>
import { MHCommonGroup } from "assets/js/MHCommonGroup.js";
export default {
  name: "common",
  props: {
    group: MHCommonGroup, // Group Object
    section: Number // Group Index
  },
  data() {
    return {
      imageSrc: {
        // 发现|通用
        ff_IconShowAlbum_25x25: require("../../assets/images/common/ff_IconShowAlbum_25x25.png"),
        ff_IconQRCode_25x25: require("../../assets/images/common/ff_IconQRCode_25x25.png"),
        ff_IconShake_25x25: require("../../assets/images/common/ff_IconShake_25x25.png"),
        ff_IconBrowse1_25x25: require("../../assets/images/common/ff_IconBrowse1_25x25.png"),
        ff_IconSearch1_25x25: require("../../assets/images/common/ff_IconSearch1_25x25.png"),
        ff_IconLocationService_25x25: require("../../assets/images/common/ff_IconLocationService_25x25.png"),
        ff_IconBottle_25x25: require("../../assets/images/common/ff_IconBottle_25x25.png"),
        CreditCard_ShoppingBag_25x25: require("../../assets/images/common/CreditCard_ShoppingBag_25x25.png"),
        MoreGame_25x25: require("../../assets/images/common/MoreGame_25x25.png"),
        MoreWeApp_25x25: require("../../assets/images/common/MoreWeApp_25x25.png"),

        // 我
        WeChatPay_25x25: require("../../assets/images/common/WeChatPay_25x25.png"),
        MoreMyFavorites_25x25: require("../../assets/images/common/MoreMyFavorites_25x25.png"),
        MoreMyAlbum_25x25: require("../../assets/images/common/MoreMyAlbum_25x25.png"),
        MyCardPackageIcon_25x25: require("../../assets/images/common/MyCardPackageIcon_25x25.png"),
        MoreExpressionShops_25x25: require("../../assets/images/common/MoreExpressionShops_25x25.png"),
        MoreSetting_25x25: require("../../assets/images/common/MoreSetting_25x25.png")
      }
    };
  },
  methods: {
    didSelectRow(section, row) {
      this.$emit("did-select-row", section, row);
    }
  }
};
</script>

<style scoped>
</style>

