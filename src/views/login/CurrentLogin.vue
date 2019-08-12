// 当前账号登陆
<template>
  <vue-route-layout>
    <!-- AvatarView -->
    <div class="login__avatar">
      <img :src="user.profile_image_url" alt />
      <p>{{ account }}</p>
    </div>
    <!-- PasswordView -->
    <div class="login__container">
      <transition name="lg-left">
        <div
          class="weui-cell lg-cell lg-transition"
          key="password"
          v-if="showPasswordWay"
        >
          <div class="weui-cell__hd">
            <label class="weui-label">密码</label>
          </div>
          <div class="weui-cell__bd">
            <div class="mh-input__wrapper">
              <input
                required="required"
                class="weui-input"
                maxlength="16"
                type="password"
                placeholder="请填写QQ密码"
                v-model="password"
              />
              <a
                @click.prevent="password = ''"
                href="javascript:"
                class="weui-icon-clear"
              ></a>
            </div>
          </div>
        </div>
        <div class="weui-cell lg-cell lg-transition" key="captcha" v-else>
          <div class="weui-cell__hd">
            <label class="weui-label">验证码</label>
          </div>
          <div class="weui-cell__bd">
            <div class="mh-input__wrapper lg-input-captcha">
              <input
                required="required"
                class="weui-input"
                type="tel"
                maxlength="6"
                placeholder="请输入验证码"
                v-model="captcha"
              />
              <a
                @click.prevent="captcha = ''"
                href="javascript:"
                class="weui-icon-clear"
              ></a>
            </div>
          </div>
          <div class="weui-cell__ft">
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
    <!-- 切换登陆方式按钮 -->
    <div class="lg-change-button">
      <span @click="changeBtnDidClick">{{ changeLogin }}</span>
    </div>
    <!-- 登录按钮 -->
    <a
      href="javascript:;"
      @click="login"
      class="weui-btn weui-btn_block weui-btn_primary lg-login-btn"
      :class="{ 'lg-btn--disabled': loginBtnDisabled }"
      >登陆</a
    >
    <!-- 底部更多面板 -->
    <div class="lg-more__wrapper">
      <span class="lg-more__item" @click="itemDidClick(0)">找回密码</span>
      <span class="lg-more__item" @click="itemDidClick(1)">紧急冻结</span>
      <span class="lg-more__item" @click="itemDidClick(2)">更多选项</span>
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
import ActionSheet, {
  ActionSheetItem
} from "components/actionSheet/ActionSheet";
// 账号存储
import AccountHelper from "@/assets/js/account/account";
// store
import { mapState } from "vuex";
// 工具类
import Utils from "assets/utils/utils";
export default {
  name: "current-login",
  components: {
    ActionSheet
  },
  data() {
    return {
      // 显示ActionSheet
      showActionSheet: false,
      // actionSheet items
      items: [],
      // 默认是登录密码
      showPasswordWay: true,
      // 密码
      password: "",
      // 验证码
      captcha: "",
      // 验证码名称
      captchaTitle: "获取验证码",
      // 验证码是否不可点击
      captchaBtnDisabled: false,
      // 是否输错过密码
      inputPasswordError: false,
      // 是否输错过验证码
      inputCaptchaError: false,
      // 定时器
      timer: 0,
      // timerMaxCount 定时器最大时间
      timerMaxCount: 60
    };
  },
  created() {
    // 配置数据
    this.initialize();
    // 配置
    this.configItems();
  },
  mounted() {},
  methods: {
    // 初始化
    initialize() {
      this.showActionSheet = false;
      this.inputPasswordError = false;
      this.inputCaptchaError = false;
      // 配置数据
      this.showPasswordWay = this.user.channel !== "Mobile Phone";
      this.password = this.captcha = "";
      this.timer = 0;
      this.captchaBtnDisabled = false;
      this.captchaTitle = "获取验证码";
      this.timerMaxCount = 60;
    },

    // 底部更多面板点击事件
    itemDidClick(idx) {
      console.log("itemDidClick ", idx);
      // 更多面板
      if (idx === 2) {
        this.showActionSheet = true;
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
    // ActionSheet 事件处理
    didClickItem(idx) {
      if (idx === 0) return;
      if (idx === 1) {
        this.$router.push("/other-login");
      } else if (idx === 3) {
        this.$router.push("/register");
      }
    },
    // 切换登录方式的事件
    changeBtnDidClick() {
      this.showPasswordWay = !this.showPasswordWay;
    },
    // 登录事件
    login() {
      // 按钮不可点击，则过滤
      if (this.loginBtnDisabled) return;
      if (this.showPasswordWay) {
        // 密码登录
        // 密码 8~16位 且 不能含有中文 ，其他都行
        if (
          this.password.length < 8 ||
          this.password.length > 16 ||
          Utils.includeChinese(this.password)
        ) {
          if (this.inputPasswordError) {
            this.$weui.confirm("", {
              title: "密码错误，找回或重置密码",
              buttons: [
                {
                  label: "取消",
                  type: "default"
                },
                {
                  label: "找回密码",
                  type: "primary",
                  onClick: function() {
                    console.log("快去找回密码");
                  }
                }
              ]
            });
          } else {
            this.$weui.alert("", { title: "账号或密码错误，请重新填写" });
          }
          this.inputPasswordError = true;
          return;
        }
      } else {
        // 验证码登录 纯6位数字
        if (
          this.captcha.length !== 6 ||
          !Utils.pureDigitCharacters(this.captcha)
        ) {
          let content = !this.inputCaptchaError
            ? "你输入的是一个无效的手机号码"
            : "";
          let title = !this.inputCaptchaError
            ? "手机号码错误"
            : "验证码超时，请重新获取验证码";
          this.$weui.alert(content, { title: title });
          this.inputCaptchaError = true;
          return;
        }
      }
      // 显示loading
      let loading = this.$weui.loading("请稍后...");
      // 模拟网络加载
      setTimeout(() => {
        // 隐藏loading
        loading.hide();
        // user info
        const user = this.user;
        // 设置登陆模式
        user.channel = this.showPasswordWay ? "QQ" : "Mobile Phone";
        // 登陆
        AccountHelper.login(user, this.showPasswordWay ? user.qq : user.phone);
      }, 1000);
    },
    // 清除按钮事件
    clearAllPassword() {
      this.password = "";
    },
    clearAllCaptcha() {
      this.captcha = "";
    },
    // 获取验证码
    captchaAction() {
      // 按钮不可点击，则过滤
      if (this.captchaBtnDisabled) return;

      // 1、验证手机号是否correct
      if (!Utils.validMobile(this.user.phone)) {
        let content = "你输入的是一个无效的手机号码";
        let title = "手机号码错误";
        this.$weui.alert(content, { title: title });
        return;
      }

      // 2、弹出有提示
      let content = "我们将发送验证码短信到这个号码：" + this.account;
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
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),

    // 切换名称
    changeLogin() {
      return this.showPasswordWay ? "用短信验证码登陆" : "用微信密码登录";
    },

    // 登录按钮是否无效
    loginBtnDisabled() {
      return this.showPasswordWay
        ? this.password.length <= 0
        : this.captcha.length <= 0;
    },

    // 账号信息
    account() {
      let phone = Utils.formatMobile344(this.user.phone);
      let zoneCode = this.user.zoneCode || "86";
      return this.showPasswordWay ? this.user.qq : "+" + zoneCode + " " + phone;
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === "CurrentLogin" && from.name === "Setting") {
        // 初始化
        this.initialize();
      }
    }
  }
};
</script>

<style src="./css/login.css" scoped></style>
<style scoped>
.login__avatar {
  margin-top: 149px;
}
.login__avatar img {
  display: block;
  height: 66px;
  width: 66px;
  margin: 0 auto; /*水平居中*/
}
.login__avatar p {
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: #000;
  padding: 5px 0;
}

.login__container {
  margin-top: 44px;
  font-size: 17px;
  overflow: hidden;
  position: relative;
  height: 44px;
}

.lg-change-button {
  margin: 16px 20px 0;
}
</style>
