<template>
  <vue-route-layout class="register__wrapper">
    <!-- 取消 -->
    <div class="cancel__wrapper"><span @click="$router.back()">取消</span></div>
    <!-- 内容 -->
    <div class="content__wrapper">
      <h1 class="content__title">用手机号注册</h1>
      <div class="content__avatar" @click="showActionSheet = true"></div>
      <div class="content__container">
        <div class="mh-current-login__cell">
          <div class="mh-current-login__cell-hd">
            <label class="mh-current-login__label">昵称</label>
          </div>
          <div class="mh-current-login__cell-bd">
            <input
              class="mh-current-login__input"
              type="search"
              placeholder="陈晨"
              v-model="nickname"
            />
          </div>
        </div>
        <div class="mh-current-login__cell">
          <div class="mh-current-login__cell-hd">
            <label class="mh-current-login__label">国家/地区</label>
          </div>
          <div class="mh-current-login__cell-bd">
            <p class="mh-zone-title" @click="skip2ZoneList">中国大陆</p>
          </div>
          <div class="mh-current-login__cell-ft">
            <img
              class="mh-right-arrow"
              src="@/assets/images/common/tableview_arrow_8x13.png"
            />
          </div>
        </div>
        <div class="mh-current-login__cell">
          <div class="mh-current-login__cell-hd">
            <div class="mh-zone-code-container">
              <label class="zone">+</label>
              <input
                class="mh-current-login__input mh-zone"
                type="text"
                v-model="zoneCode"
              />
            </div>
          </div>
          <div class="mh-current-login__cell-bd">
            <input
              class="mh-current-login__input"
              type="text"
              placeholder="请填写手机号码"
              v-model="phone"
            />
          </div>
        </div>

        <div class="mh-current-login__cell">
          <div class="mh-current-login__cell-hd">
            <label class="mh-current-login__label">密码</label>
          </div>
          <div class="mh-current-login__cell-bd">
            <input
              class="mh-current-login__input"
              type="password"
              placeholder="请设置密码"
              v-model="password"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 注册 -->
    <a
      href="javascript:;"
      @click="registerAction"
      class="weui-btn weui-btn_block weui-btn_primary register-btn"
      >注册</a
    >
    <!-- 协议 -->
    <div class="weui-footer weui-footer_fixed-bottom">
      <p class="weui-footer__text">轻触上面的“注册”按钮，即表示你同意</p>
      <p class="weui-footer__links">
        <a href="javascript:home();" class="weui-footer__link"
          >微信软件许可及服务协议</a
        >
      </p>
    </div>

    <!-- ActionSheet -->
    <ActionSheet
      v-model="showActionSheet"
      @did-click-item="didClickItem"
      :items="items"
    ></ActionSheet>
  </vue-route-layout>
</template>

<script>
// 导入ActionSheet
import ActionSheet, {
  ActionSheetItem
} from "components/actionSheet/ActionSheet";
export default {
  name: "register",
  components: {
    ActionSheet
  },
  data() {
    return {
      nickname: "",
      zoneCode: "86",
      phone: "",
      password: "",
      showActionSheet: false, // 显示ActionSheet
      items: []
    };
  },
  created() {
    this.configItems();
  },
  methods: {
    registerAction() {},
    // 配置actionsheet items
    configItems() {
      const camera = new ActionSheetItem({
        title: "拍照"
      });
      const album = new ActionSheetItem({
        title: "从手机相册选择"
      });
      this.items = [camera, album];
    },
    // actionSheet事件点击
    didClickItem(index) {
      if (index === 0) return;
      this.$router.replace("/current-login");
    },
    skip2ZoneList() {}
  }
};
</script>

<style scoped>
.register__wrapper {
  background-color: #fff;
}
.cancel__wrapper {
  height: 36px;
  line-height: 36px;
  font-size: 16px;
  color: #57be6a;
  padding-left: 16px;
}
.content__wrapper {
  padding-top: 28px;
  padding-left: 30px;
}
.content__title {
  font-size: 21px;
  text-align: center;
  font-weight: 500;
}
.content__avatar {
  width: 64px;
  height: 64px;
  margin: 0 auto;
  margin-top: 46px;
  background: url("../../assets/images/login/SignUpWC_ChangeAvatar_80x80.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.content__avatar:active {
  background: url("../../assets/images/login/SignUpWC_ChangeAvatar_Hl_80x80.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.content__container {
  margin-top: 30px;
}
.mh-current-login__cell {
  padding: 0 0;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  font-size: 17px;
  height: 45px;
  line-height: 45px;
}
.mh-current-login__cell:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #c9c9c9;
  color: #c9c9c9;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}

.mh-current-login__cell-bd {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}

.mh-current-login__label {
  display: block;
  width: 100px;
  word-wrap: break-word;
  word-break: break-all;
}

.mh-zone-code-container {
  width: 80px;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  margin-right: 10px;
}

.mh-zone-code-container::after {
  content: " ";
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 1px;
  color: #c9c9c9;
  background-color: #c9c9c9;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
  z-index: 2;
}

.zone {
  width: initial;
  display: block;
  word-wrap: break-word;
  word-break: break-all;
  padding-right: 5px;
}
.mh-zone.mh-current-login__input {
  flex: 1;
}

.mh-current-login__input {
  width: 100%;
  border: 0;
  outline: 0;
  -webkit-appearance: none;
  background-color: transparent;
  font-size: inherit;
  color: inherit;
  height: 45px;
  line-height: 45px;
  -webkit-appearance: searchfield;
  box-sizing: border-box;
}

.mh-current-login__cell-ft {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.mh-right-arrow {
  display: inline-block;
  width: 8px;
  height: 13px;
  margin-left: 10px;
  margin-right: 25px;
}

.register-btn {
  margin: 30px 30px 0;
  line-height: 32px;
}

.weui-footer_fixed-bottom {
  bottom: 20px;
}
.weui-footer__text {
  color: #525458;
}
.weui-footer__links {
  font-size: 12px;
  padding: 3px;
}
.weui-footer__link {
  font-size: 12px;
}
</style>
