<template>
  <div class="_full-content _content-padding-bottom49">
    <!-- headerView -->
    <div class="mh-profile__header" @click="skipUserInfo">
      <div class="mh-cell">
        <div class="mh-cell__hd">
          <img
            :src="$store.state.user.profile_image_url"
            width="66px"
            height="66px"
            alt
          />
        </div>
        <div class="mh-cell__bd">
          <div class="mh-profile__info">
            <h1 class="mh-profile__title" @click.stop="userNameClicked">
              {{ $store.state.user.screen_name }}
            </h1>
            <div class="mh-profile__detail">
              <p class="mh-profile__detail-bd">
                微信号：{{ $store.state.user.wechatId }}
              </p>
              <div class="mh-profile__detail-ft">
                <img
                  src="../../assets/images/profile/setting_myQR_36x36.png"
                  width="18px"
                  height="18px"
                  alt
                />
                <img
                  src="@/assets/images/common/tableview_arrow_8x13.png"
                  width="8px"
                  height="13px"
                  alt
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Item list -->
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
        icon: "MoreExpressionShops_25x25"
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
    },
    // 用户名称被点击
    userNameClicked() {
      console.log("------点击用户昵称------");
    },
    // 跳转用户信息页面
    skipUserInfo() {
      console.log("------跳转用户信息------");
      this.$router.push("/profile/userinfo");
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

/* ------ 头部 Start ------ */
.mh-profile__header {
  padding: 20px 0;
  background-color: #fff;
  position: relative;
}

.mh-profile__header:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  background-color: #d8d8d8;
  color: #d8d8d8;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}

.mh-profile__info {
  padding-left: 16px;
}

.mh-profile__detail {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.mh-profile__detail-bd {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}

.mh-profile__detail-ft {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.mh-profile__detail-ft img:first-child {
  margin-right: 13px;
}

/* ------ 头部 End ------ */
</style>
