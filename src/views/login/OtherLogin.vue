// 其他账号登陆
<template>
  <div class="_full-container">
    <div class="_full-content">
      <!-- 关闭按钮 -->
      <p class="mh-nav-close-btn">
        <span class="iconfont icon-navbar-close" @click="$router.back()"></span>
      </p>

      <!-- 中间内容 -->
      <div class="mh-current-login__container">
        <transition name="left">
          <div></div>
          <div
            class="mh-current-login__cell mh-current-login__password"
            key="password"
            v-if="showPasswordWay"
          >
            <div class="mh-current-login__cell-hd">
              <label class="mh-current-login__label">密码</label>
            </div>
            <div class="mh-current-login__cell-bd">
              <input
                class="mh-current-login__input"
                type="search"
                placeholder="请填写QQ密码"
                v-model="password"
              >
            </div>
          </div>
          <div class="mh-current-login__cell mh-current-login__captcha" key="captcha" v-else>
            <div class="mh-current-login__cell-hd">
              <label class="mh-current-login__label">验证码</label>
            </div>
            <div class="mh-current-login__cell-bd">
              <input
                class="mh-current-login__input"
                type="text"
                placeholder="请输入验证码"
                v-model="captcha"
              >
            </div>
            <div class="mh-current-login__cell-ft">
              <button class="mh-current-login__btn">获取验证码</button>
            </div>
          </div>
        </transition>
      </div>
      <!-- 切换按钮 -->
      <div class="mh-current-login__change-btn">
        <span @click="changeBtnDidClick">{{ changeLogin }}</span>
      </div>

      <div class="mh-current-login__login">
        <a
          class="mh-btn mh-btn_primary"
          :class="{'mh-btn_disabled':loginBtnDisabled}"
          @click="login"
        >登录</a>
      </div>

      <!-- 底部更多 -->
      <div class="mh-current-login__more">
        <span class="mh-current-login__more-item" @click="itemDidClick(0)">找回密码</span>
        <span class="mh-current-login__more-item" @click="itemDidClick(1)">更多选项</span>
      </div>

      <!-- ActionSheet -->
      <ActionSheet v-model="showActionSheet" @did-click-item="didClickItem" :items="items"></ActionSheet>
    </div>
  </div>
</template>

<script>
import ActionSheet, {
  ActionSheetItem
} from "components/actionSheet/ActionSheet";
export default {
  name: "OtherLogin",
  data() {
    return {
      showActionSheet: false, // 显示ActionSheet
      items: [],
      // 默认是登录密码
      showPasswordWay: true,
      // 密码
      password: "",
      // 验证码
      captcha: ""
    };
  },
  created() {
    this.configItems();
  },
  methods: {
    changeBtnDidClick() {
      this.showPasswordWay = !this.showPasswordWay;
    },
    // 底部更多面板事件处理
    itemDidClick(idx) {
      switch (idx) {
        case 0:
          break;
        default:
          this.showActionSheet = true;
          break;
      }
    },
    // 配置actionsheet items
    configItems() {
      const freeze = new ActionSheetItem({
        title: "紧急冻结"
      });
      const securityCenter = new ActionSheetItem({
        title: "前往微信安全中心"
      });
      this.items = [freeze, securityCenter];
    },
    // ActionSheet 事件处理
    didClickItem(idx) {
      if (idx === 0) return;
      switch (idx) {
        case 1:
          this.$router.push("/current-login/other-login");
          break;
        case 2:
          break;
        default:
          break;
      }
    },
    login() {}
  },
  computed: {
    // 切换名称
    changeLogin() {
      return this.showPasswordWay ? "用微信号/QQ号/邮箱登录" : "用手机号登录";
    },
    // 登录按钮是否无效
    loginBtnDisabled() {
      return this.showPasswordWay
        ? this.password.length <= 0
        : this.captcha.length <= 0;
    }
  },
  components: {
    ActionSheet
  }
};
</script>

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
  background-color: #ffffff;
  font-size: 17px;
  overflow: hidden;
  position: relative;
  height: 40px;
}

.mh-current-login__cell {
  padding: 0 16px;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.mh-current-login__cell:after {
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
  left: 16px;
  z-index: 2;
}

.mh-current-login__password {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
}
.mh-current-login__captcha {
  position: absolute;
  left: 0;
  top: 0;
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
  width: 90px;
  word-wrap: break-word;
  word-break: break-all;
}

.mh-current-login__input {
  width: 100%;
  border: 0;
  outline: 0;
  -webkit-appearance: none;
  background-color: transparent;
  font-size: inherit;
  color: inherit;
  height: 40px;
  line-height: 40px;
  -webkit-appearance: searchfield;
  box-sizing: border-box;
}

.mh-current-login__input::-webkit-outer-spin-button,
.mh-current-login__input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.mh-current-login__change-btn {
  margin: 5px 16px;
}
.mh-current-login__change-btn span {
  background-color: aqua;
}
.mh-current-login__login {
  margin-top: 60px;
  padding: 0 16px;
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
  bottom: 10px;
  color: blue;
  text-align: center;
  font-size: 16px;
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
  width: 1px;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: red;
  -webkit-transform: scale(0.5);
  -ms-transform: scale(0.5);
  transform: scale(0.5);
}
</style>

