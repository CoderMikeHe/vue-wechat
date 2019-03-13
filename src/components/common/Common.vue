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
/* cell 组 */
.mh-cells-group {
  overflow: hidden;
  position: relative;
}

/* group 头 */
.mh-group-header {
  padding: 0 16px;
  background-color: #ededed;
  color: #888;
  font-size: 15px;
}

/* group body */
.mh-group-body {
  background-color: #ffffff;
  line-height: 56px;
  font-size: 17px;
  overflow: hidden;
  position: relative;
}

/* top分割线 */
.mh-group-body:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #d8d8d8;
  color: #d8d8d8;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
/* bottom分割线 */
.mh-group-body:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #d8d8d8;
  color: #d8d8d8;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}

.mh-cell {
  padding: 0px 16px;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.mh-cell:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #d8d8d8;
  color: #d8d8d8;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  left: 16px;
  z-index: 2;
}
.mh-cell:first-child:before {
  display: none;
}

.mh-cell-header .mh-image {
  display: block;
  max-width: 25px;
  max-height: 25px;
  width: auto;
  height: auto;
}

.mh-image.margin-right16px {
  margin-right: 16px;
}

.mh-cell-body {
  position: relative;
  /* 占据整个剩余空间 */
  /* CMH TODO：[深入理解css3中的flex-grow、flex-shrink、flex-basis](https://www.cnblogs.com/ghfjj/p/6529733.html) */
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;

  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-between; /* Safari 6.1+ */
  justify-content: space-between;
}

.mh-cell-body .mh-footer {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.mh-footer .mh-right-arrow {
  display: inline-block;
  width: 8px;
  height: 13px;
  margin-left: 10px;
}

.mh-body .mh-title {
  color: #191919;
}

.mh-footer .mh-subtitle {
  color: #7f7f7f;
}

.mh-group-footer {
  padding: 0 16px;
  background-color: #ededed;
  color: #888;
  font-size: 15px;
}

/* 修改第三方组件的css */
/* CMH TODO：修改第三方组件的CSS样式
A：[【vue scoped 样式修改 】框架或插件组件样式更改及/deep/ 警告](https://blog.csdn.net/weixin_41000111/article/details/80450397) 
*/
.mh-footer >>> .mint-switch-input:checked + .mint-switch-core {
  border-color: #57be6a;
  background-color: #57be6a;
}
</style>

