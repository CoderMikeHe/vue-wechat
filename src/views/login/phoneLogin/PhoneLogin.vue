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
                type="password"
                maxlength="16"
                placeholder="请填写密码"
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
    <!-- 切换按钮 -->
    <div class="lg-change-button">
      <span @click="changeBtnDidClick">{{ changeLogin }}</span>
    </div>

    <!-- 登陆按钮 -->
    <a
      href="javascript:;"
      @click="login"
      class="weui-btn weui-btn_block weui-btn_primary lg-login-btn"
      :class="{ 'lg-btn--disabled': loginBtnDisabled }"
      >登陆</a
    >

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
      moreItem,
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
        user.email = "491273090" + "@qq.com"; // PS：机智，拼接成QQ邮箱
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
/* 修改一下全局的样式 */
.lg-transition {
  top: auto;
}
.lg-login__wrapper {
  margin-top: calc(90px + 44px);
}
</style>
