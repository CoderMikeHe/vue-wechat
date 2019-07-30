// 其他账号登陆
<template>
  <vue-route-layout>
    <!-- 导航栏 -->
    <NavigationBar
      :left-item="blackBackItem"
      :right-item="moreItem"
      @left-click="$router.back()"
      @right-click="rightItemClick"
    ></NavigationBar>

    <!-- 中间内容 -->
    <div class="lg-login__wrapper">
      <!-- 手机号登录 -->
      <h1 class="lg-login__title">手机号登录</h1>
      <div class="weui-cell lg-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">手机号</label>
        </div>
        <div class="weui-cell__hd">
          {{ phoneFormat }}
        </div>
      </div>
      <!-- 过渡动画 -->
      <transition name="lg-left">
        <div
          class="weui-cell lg-cell mh-current-login__password"
          key="password"
          v-if="showPasswordWay"
        >
          <div class="mh-current-login__cell-hd">
            <label class="mh-current-login__label">密码</label>
          </div>
          <div class="mh-current-login__cell-bd">
            <div class="mh-input__wrapper">
              <input
                required="required"
                class="mh-input"
                type="password"
                maxlength="16"
                placeholder="请填写密码"
                v-model="password"
              />
              <a
                href="javascript:;"
                class="mh-input-clear"
                @click="clearAllPassword"
              >
                <img
                  src="@/assets/images/input/input_clear.png"
                  class="mh-input-clear__clear"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
        <div
          class="mh-current-login__cell mh-current-login__captcha"
          key="captcha"
          v-else
        >
          <div class="mh-current-login__cell-hd">
            <label class="mh-current-login__label">验证码</label>
          </div>
          <div class="mh-current-login__cell-bd">
            <div class="mh-input__wrapper input-captcha">
              <input
                required="required"
                class="mh-input"
                type="tel"
                maxlength="6"
                placeholder="请输入验证码"
                v-model="captcha"
              />
              <a
                href="javascript:;"
                class="mh-input-clear"
                @click="clearAllCaptcha"
              >
                <img
                  src="@/assets/images/input/input_clear.png"
                  class="mh-input-clear__clear"
                  alt=""
                />
              </a>
            </div>
          </div>
          <div class="mh-current-login__cell-ft">
            <div
              @click="captchaAction"
              class="lg-captcha-btn"
              :class="{ 'lg-captcha-btn--disabled': captchaBtnDisabled }"
            >
              {{ captchaTitle }}
            </div>
          </div>
        </div>
      </transition>
    </div>
    <!-- 切换按钮 -->
    <div class="mh-current-login__change-btn">
      <span @click="changeBtnDidClick">{{ changeLogin }}</span>
    </div>

    <!-- 登陆按钮 -->
    <div class="mh-current-login__login">
      <a
        class="mh-btn mh-btn_primary"
        :class="{ 'mh-btn_disabled': loginBtnDisabled }"
        @click="login"
        >登陆</a
      >
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
// ActionSheet
import ActionSheet, {
  ActionSheetItem
} from "components/actionSheet/ActionSheet";
// 账号存储
import AccountHelper from "@/assets/js/account/account";
// 工具类
import Utils from "assets/utils/utils";
// UserModel
import UserModel from "../js/user";
import { moreItem } from "@/assets/js/MHBarButtonItem.js";
export default {
  name: "phone-login",
  components: {
    ActionSheet
  },
  data() {
    return {
      // 显示ActionSheet
      showActionSheet: false,
      items: [],
      // 默认是登录密码
      showPasswordWay: true,
      // 密码
      password: "",
      // 地区编号
      zoneCode: "",
      // 手机号
      phone: "",
      // 验证码
      captcha: "",
      // 验证码名称
      captchaTitle: "获取验证码",
      // 验证码是否不可点击
      captchaBtnDisabled: false,
      moreItem,
      // 定时器
      timer: 0,
      // timerMaxCount 定时器最大时间
      timerMaxCount: 60
    };
  },
  created() {
    this.configItems();
    // 路由传参赋值
    this.phone = this.$route.params.phone;
    this.zoneCode = this.$route.params.zoneCode;
  },
  mounted() {},
  methods: {
    // 切换登陆方式按钮事件
    changeBtnDidClick() {
      this.showPasswordWay = !this.showPasswordWay;
    },
    // 底部更多面板事件处理
    rightItemClick() {
      this.showActionSheet = true;
    },
    // 配置actionsheet items
    configItems() {
      const findPassword = new ActionSheetItem({
        title: "找回密码"
      });
      const securityCenter = new ActionSheetItem({
        title: "前往微信安全中心"
      });
      this.items = [findPassword, securityCenter];
    },
    // ActionSheet 事件处理
    didClickItem(idx) {
      if (idx === 0) return;
    },
    // 登陆事件
    login() {
      // 按钮不可点击，则过滤
      if (this.loginBtnDisabled) return;
      if (this.showPasswordWay) {
        // 密码登陆 验证账号+密码
        // 1、验证phone 是不是正确 2、密码8-16位且不含中文
        if (
          !Utils.validMobile(this.phone) ||
          this.password.length < 8 ||
          this.password.length > 16 ||
          Utils.includeChinese(this.password)
        ) {
          this.$weui.alert("", { title: "账号或密码错误，请重新填写" });
          return;
        }
      } else {
        // 1、验证phone 是不是正确 2、验证码登录 纯6位数字
        if (
          !Utils.validMobile(this.phone) ||
          this.captcha.length !== 6 ||
          !Utils.pureDigitCharacters(this.captcha)
        ) {
          let content = "";
          let title = "验证码超时，请重新获取验证码";
          this.$weui.alert(content, { title: title });
          return;
        }
      }

      // 登陆账号
      // 显示loading
      let loading = this.$weui.loading("请稍后...");
      setTimeout(() => {
        // 隐藏loading
        loading.hide();
        // 假设获取到了数据
        let user = Object.assign({}, UserModel);
        user.qq = "491273090";
        user.emial = "491273090" + "@qq.com"; // PS：机智，拼接成QQ邮箱
        user.phone = this.phone; // PS：瞎写的
        user.channel = "Mobile Phone";
        // 登陆
        AccountHelper.login(user, this.phone);
      }, 1000);
    },

    // 获取验证码
    captchaAction() {
      // 按钮不可点击，则过滤
      if (this.captchaBtnDisabled) return;

      // 1、验证手机号是否correct
      if (!Utils.validMobile(this.phone)) {
        let content = "你输入的是一个无效的手机号码";
        let title = "手机号码错误";
        this.$weui.alert(content, { title: title });
        return;
      }

      // 2、弹出有提示
      let content = "我们将发送验证码短信到这个号码：" + this.phoneFormat;
      this.$weui.confirm(content, {
        title: "确认手机号码",
        buttons: [
          {
            label: "取消",
            type: "default"
          },
          {
            label: "好",
            type: "primary",
            onClick: this.fetchCaptcha
          }
        ]
      });
    },
    // 获取验证码
    fetchCaptcha() {
      // 获取验证码
      this.captchaBtnDisabled = true;
      this.captchaTitle = "发送中...";
      // 先开启一个简短的延时
      setTimeout(() => {
        this.timerMaxCount = 60;
        this.captchaTitle = "60s后重新发送";
        this.timer = window.setInterval(this.timerValueChanged, 1000);
      }, 1000);
    },

    // 定时器事件
    timerValueChanged() {
      this.timerMaxCount--;
      if (this.timerMaxCount === 0) {
        // 20190727 Fixed Bug : 指明 window，否则报错
        window.clearInterval(this.timer);
        this.timer = 0;
        this.captchaBtnDisabled = false;
        this.captchaTitle = "获取验证码";
        return;
      }
      this.captchaTitle = this.timerMaxCount + "后重新发送";
    },

    // 清除按钮事件
    clearAllPassword() {
      this.password = "";
    },
    clearAllCaptcha() {
      this.captcha = "";
    }
  },
  computed: {
    // 切换名称
    changeLogin() {
      return this.showPasswordWay ? "用短信验证码登录" : "用密码登录";
    },

    // 登录按钮是否无效
    loginBtnDisabled() {
      return this.showPasswordWay
        ? this.password.length <= 0
        : this.captcha.length <= 0;
    },

    // 电话格式化
    phoneFormat() {
      return "+" + this.zoneCode + " " + Utils.formatMobile344(this.phone);
    }
  }
};
</script>

<style src="../css/login.css" scoped></style>
<style scoped>
.left-enter {
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
.left-leave-to {
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}
.left-enter-active,
.left-leave-active {
  transition: transform 0.25s ease-in-out, -webkit-transform 0.25s ease-in-out;
}

/* 关闭按钮 */
.mh-nav-close-btn {
  height: 44px;
  line-height: 44px;
}
.mh-nav-close-btn span {
  margin-left: 10px;
  font-size: 24px;
  color: #000;
}
.mh-nav-close-btn span:active {
  color: rgba(0, 0, 0, 0.5);
}

.mh-current-login__container {
  font-size: 17px;
  overflow: hidden;
  position: relative;
  /* 90+44 */
  margin-top: 134px;
  height: 168px;
}

.mh-current-login__panel {
  height: 168px;
}
.mh-current-login__container h1 {
  font-size: 24px;
  font-weight: 500;
  padding: 0 20px;
  padding-bottom: 42px;
}

.mh-current-login__cell {
  padding: 0 20px;
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
  left: 20px;
  bottom: 0;
  right: 20px;
  height: 1px;
  border-bottom: 1px solid #d8d8d8;
  color: #d8d8d8;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}

.mh-current-login__password {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
.mh-current-login__captcha {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
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
  color: #d8d8d8;
  background-color: #d8d8d8;
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

.mh-right-arrow {
  display: inline-block;
  width: 8px;
  height: 13px;
  margin-left: 10px;
  margin-right: 5px;
}

.mh-current-login__input::-webkit-outer-spin-button,
.mh-current-login__input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.mh-current-login__change-btn {
  margin: 34px 16px 64px;
  font-size: 16px;
  color: #5b6a91;
}

.mh-current-login__login {
  margin-top: 63px;
  padding: 0 20px;
}

.mh-btn {
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-left: 14px;
  padding-right: 14px;
  box-sizing: border-box;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
  color: #ffffff;
  line-height: 2.55555556;
  border-radius: 5px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  overflow: hidden;
}
.mh-btn:after {
  content: " ";
  width: 200%;
  height: 200%;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid rgba(0, 0, 0, 0.2);
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  box-sizing: border-box;
  border-radius: 10px;
}

.mh-btn_primary {
  background-color: #1aad19;
}
.mh-btn_primary:not(.mh-btn_disabled):visited {
  color: #ffffff;
}
.mh-btn_primary:not(.mh-btn_disabled):active {
  color: rgba(255, 255, 255, 0.6);
  background-color: #179b16;
}

.mh-btn_disabled {
  color: rgba(255, 255, 255, 0.6);
}
.mh-btn_disabled.mh-btn_default {
  color: rgba(0, 0, 0, 0.3);
  background-color: #f7f7f7;
}
.mh-btn_disabled.mh-btn_primary {
  background-color: #9ed99d;
}

/* 底部更多列表 */
.mh-current-login__more {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 23px;
  color: #5b6a91;
  text-align: center;
  font-size: 15px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
}

.mh-current-login__more-item {
  position: relative;
  padding: 0 10px;
}

.mh-current-login__more-item:not(:last-child)::after {
  content: "";
  position: absolute;
  width: 2px;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #888;
  -webkit-transform: scaleY(0.5);
  -ms-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.input-captcha {
  padding-right: 40px;
}
</style>
