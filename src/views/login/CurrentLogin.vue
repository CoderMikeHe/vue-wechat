// 当前账号登陆
<template>
  <div class="_full-container">
    <div class="_full-content">
      <!-- AvatarView -->
      <div class="mh-current-login__avatar">
        <img src="../../assets/images/other/AppIcon120x120.png" alt>
        <p>491273090</p>
      </div>

      <!-- v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:after-enter="afterEnter"
          v-on:before-leave="beforeLeave"
          v-on:leave="leave"
          v-on:after-leave="afterLeave"
      v-on:leave-cancelled="leaveCancelled"-->
      <!-- PasswordView -->
      <div class="mh-current-login__container">
        <transition name="left">
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
        <span class="mh-current-login__more-item" @click="itemDidClick(1)">紧急冻结</span>
        <span class="mh-current-login__more-item" @click="itemDidClick(2)">更多选项</span>
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
  name: "CurrentLogin",
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
    itemDidClick(idx) {
      switch (idx) {
        case 0:
          break;
        case 1:
          break;
        default:
          this.showActionSheet = true;
          break;
      }
    },
    // 配置actionsheet items
    configItems() {
      const loginOther = new ActionSheetItem({
        title: "登录其他账号"
      });
      const securityCenter = new ActionSheetItem({
        title: "前往微信安全中心"
      });
      const register = new ActionSheetItem({
        title: "注册"
      });
      this.items = [loginOther, securityCenter, register];
    },
    didClickItem(index) {},
    changeBtnDidClick() {
      this.showPasswordWay = !this.showPasswordWay;
    },
    // 进入中
    // --------

    beforeEnter: function(el) {
      // ...
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    enter: function(el, done) {
      // ...
      done();
    },
    afterEnter: function(el) {
      // ...
    },
    enterCancelled: function(el) {
      // ...
    },

    // --------
    // 离开时
    // --------

    beforeLeave: function(el) {
      // ...
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    leave: function(el, done) {
      // ...
      done();
    },
    afterLeave: function(el) {
      // ...
    },
    // 登录事件
    login() {
      if (this.loginBtnDisabled) return;
      console.log("password   " + this.password);
    }
  },
  computed: {
    // 切换名称
    changeLogin() {
      return this.showPasswordWay ? "用微信密码登录" : "用短信验证码登陆";
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

.mh-current-login__avatar {
  margin-top: 134px;
}

.mh-current-login__avatar img {
  display: block;
  height: 66px;
  width: 66px;
  margin: 0 auto; /*水平居中*/
}

.mh-current-login__avatar p {
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: #000;
  padding: 5px 0;
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

/* https://www.w3cplus.com/css/caret-color.html */
</style>
