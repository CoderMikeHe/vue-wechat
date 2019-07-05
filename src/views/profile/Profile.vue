<template>
  <div class="_full-content _content-padding-bottom49">
    <!-- 照相机 -->
    <div class="profile__camera" @click="cameraDidClick">
      <span
        v-show="profile.camera.show"
        :class="{ 'weui-badge_dot': profile.camera.dot }"
        class="weui-badge"
      ></span>
    </div>
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
import { mapState, mapMutations } from "vuex";
import BadgeHelper from "@/assets/js/badge/badgeHelper";
export default {
  name: "profile",
  components: {
    common
  },
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
    },
    // 照相机被点击
    cameraDidClick() {
      // 取出profile badge数据
      let profile = Object.assign({}, this.profile);

      // 取出camera的value
      let value = profile.camera.value;
      // 置位0
      profile.camera.value = 0;
      // 重新赋值
      profile.camera = BadgeHelper(profile.camera);

      // 修改profile的value
      profile.value = profile.value - value;
      // 处理 text和show
      let tmp = BadgeHelper(profile);
      profile.text = tmp.text;
      profile.show = tmp.show;
      // 存储到vuex
      this.changeProfile(profile);

      // 打开照相机 TODO
    },
    // vuex
    ...mapMutations("badge", ["changeProfile"])
  },

  computed: {
    ...mapState({
      profile: state => state.badge.profile
    })
  }
};
</script>

<style scoped>
/* 第三方框架样式 */
.weui-badge_dot {
  position: absolute;
  right: 0;
  top: 0;
  -webkit-transform: translate3d(50%, -20%, 0);
  transform: translate3d(50%, -20%, 0);
}

/* 本地样式 */
/* 照相机 */
.profile__camera {
  width: 25px;
  height: 25px;
  position: fixed;
  right: 10px;
  top: 9.5px;
  z-index: 3;
  background-image: url("~@/assets/images/profile/icons_filled_camera.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.mh-common-group {
  margin-top: 8px;
}

/* ------ 头部 Start ------ */
.mh-profile__header {
  padding: 72px 0 40px;
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

.mh-profile__title {
  height: 33px;
  line-height: 33px;
  font-size: 24px;
  color: #000;
  font-weight: 500;
}

.mh-profile__detail {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding-top: 10px;
}

.mh-profile__detail-bd {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  color: #7f7f7f;
  font-size: 16px;
  height: 20px;
  line-height: 20px;
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
