// 其他账号登陆
<template>
  <vue-route-layout>
    <!-- 关闭按钮 -->
    <p class="mh-nav-close-btn">
      <span class="iconfont icon-navbar-close" @click="$router.back()"></span>
    </p>
    <!-- 中间内容 -->
    <div class="lg-login__wrapper">
      <transition name="lg-left">
        <!-- 手机号登录 -->
        <div
          class="lg-login__panel lg-transition"
          key="password"
          v-if="showPasswordWay"
        >
          <h1 class="lg-login__title">手机号登录</h1>
          <div class="weui-cell lg-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">国家/地区</label>
            </div>
            <div class="weui-cell__bd">
              <p class="mh-zone-title" @click="skipZoneList">中国</p>
            </div>
            <div class="weui-cell__ft">
              <img
                class="lg-right-arrow"
                src="@/assets/images/common/tableview_arrow_8x13.png"
              />
            </div>
          </div>
          <div class="weui-cell lg-cell">
            <div class="weui-cell__hd lg-cell__hd">
              <label class="lg-zone">+</label>
              <input
                class="weui-input"
                type="tel"
                maxlength="4"
                v-model="zoneCode"
              />
            </div>
            <div class="weui-cell__bd">
              <div class="mh-input__wrapper">
                <input
                  required
                  class="weui-input"
                  type="tel"
                  maxlength="13"
                  placeholder="请填写手机号码"
                  v-model="phone"
                  @input="inputValueChanged"
                />
                <a
                  @click.prevent="phone = ''"
                  href="javascript:"
                  class="weui-icon-clear"
                ></a>
              </div>
            </div>
          </div>
        </div>
        <!-- 微信号/QQ号/邮箱登录 -->
        <div class="lg-login__panel lg-transition" key="captcha" v-else>
          <h1 class="lg-login__title">微信号/QQ号/邮箱登录</h1>
          <div class="weui-cell lg-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">账号</label>
            </div>
            <div class="weui-cell__bd">
              <div class="mh-input__wrapper">
                <input
                  required
                  class="weui-input"
                  type="text"
                  placeholder="微信号/QQ号/邮箱"
                  v-model="account"
                />
                <a
                  @click.prevent="account = ''"
                  href="javascript:"
                  class="weui-icon-clear"
                ></a>
              </div>
            </div>
          </div>
          <div class="weui-cell lg-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">密码</label>
            </div>
            <div class="weui-cell__bd">
              <div class="mh-input__wrapper">
                <input
                  required="required"
                  class="weui-input"
                  type="password"
                  placeholder="请填写QQ密码"
                  maxlength="16"
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
      >{{ loginBtnTitle }}</a
    >
    <!-- 底部更多面板 -->
    <div class="lg-more__wrapper">
      <span class="lg-more__item" @click="itemDidClick(0)">找回密码</span>
      <span class="lg-more__item" @click="itemDidClick(1)">更多选项</span>
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
// 工具类
import Utils from "assets/utils/utils";
// UserModel
import UserModel from "./js/user";
export default {
  name: "other-login",
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
      // 账号
      account: "",
      // 密码
      password: "",
      // 地区编号
      zoneCode: "86",
      // 手机号
      phone: ""
    };
  },
  created() {
    this.configItems();
  },
  mounted() {},
  methods: {
    // 初始化数据
    initialize() {
      this.account = "";
      this.showPasswordWay = true;
      this.password = "";
      this.zoneCode = "86";
      this.phone = "";
    },
    // inputValueChanged
    inputValueChanged(event) {
      if (event.data) {
        // 先去掉空格
        let phone = this.phone.replace(/\s/g, "");
        // 后格式话代码
        this.phone = Utils.formatMobile344(phone);
      } else {
        this.phone = this.phone.trim();
      }
    },
    // 切换方式的按钮点击事件
    changeBtnDidClick() {
      this.showPasswordWay = !this.showPasswordWay;
    },
    // 底部更多面板事件处理
    itemDidClick(idx) {
      if (idx === 1) {
        this.showActionSheet = true;
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
    },
    // 登陆事件
    login() {
      // 跳转到手机登陆
      if (this.loginBtnDisabled) {
        return;
      }
      if (this.showPasswordWay) {
        // 跳转到手机登陆
        this.$router.push({
          name: "PhoneLogin",
          params: {
            phone: Utils.removesWhitespace(this.phone),
            zoneCode: this.zoneCode
          }
        });
      } else {
        // 对账号做验证 TODO
        // 1、正确的QQ号 2、密码8-16位且不含中文
        if (
          !Utils.validQQ(this.account) ||
          this.password.length < 8 ||
          this.password.length > 16 ||
          Utils.includeChinese(this.password)
        ) {
          this.$weui.alert("", { title: "账号或密码错误，请重新填写" });
          return;
        }
        // 登陆账号 模拟网络加载
        // 显示loading
        let loading = this.$weui.loading("请稍后...");
        setTimeout(() => {
          // 隐藏loading
          loading.hide();
          // 假设获取到了数据
          let user = Object.assign({}, UserModel);
          user.qq = this.account;
          user.emial = this.account + "@qq.com"; // PS：机智，拼接成QQ邮箱
          user.phone = "13874385438"; // PS：瞎写的
          user.channel = "QQ";
          // 登陆
          AccountHelper.login(user, this.account);
        }, 1000);
      }
    },
    // 跳转地区列表
    skipZoneList() {}
  },
  computed: {
    // 切换名称
    changeLogin() {
      return this.showPasswordWay ? "用微信号/QQ号/邮箱登录" : "用手机号登录";
    },

    // loginBtnTitle
    loginBtnTitle() {
      return this.showPasswordWay ? "下一步" : "登录";
    },

    // 登录按钮是否无效
    loginBtnDisabled() {
      return this.showPasswordWay
        ? this.phone.length <= 0
        : this.account.length <= 0 || this.password.length <= 0;
    }
  },
  watch: {
    $route(to, from) {
      if (
        to.name === "other-login" &&
        (from.name === "login" || from.name === "CurrentLogin")
      ) {
        // 初始化
        this.initialize();
      }
    }
  }
};
</script>

<style src="./css/login.css" scoped></style>

<style scoped>
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
</style>
