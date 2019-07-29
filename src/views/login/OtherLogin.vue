// 其他账号登陆
<template>
  <vue-route-layout>
    <!-- 关闭按钮 -->
    <p class="mh-nav-close-btn">
      <span class="iconfont icon-navbar-close" @click="$router.back()"></span>
    </p>
    <!-- 中间内容 -->
    <div class="mh-current-login__container">
      <transition name="left">
        <!-- 手机号登录 -->
        <div
          class="mh-current-login__panel mh-current-login__password"
          key="password"
          v-if="showPasswordWay"
        >
          <h1>手机号登录</h1>
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
              <input class="weui-input" type="number" v-model="zoneCode" />
            </div>
            <div class="weui-cell__bd">
              <input
                class="weui-input"
                type="tel"
                placeholder="请填写手机号码"
                v-model="phone"
              />
            </div>
          </div>
        </div>
        <!-- 微信号/QQ号/邮箱登录 -->
        <div
          class="mh-current-login__panel mh-current-login__captcha"
          key="captcha"
          v-else
        >
          <h1>微信号/QQ号/邮箱登录</h1>
          <div class="weui-cell lg-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">账号</label>
            </div>
            <div class="weui-cell__bd">
              <input
                class="weui-input"
                type="text"
                placeholder="微信号/QQ号/邮箱"
                v-model="account"
              />
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
                <a href="javascript:" class="weui-icon-clear"></a>
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
  name: "OtherLogin",
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
    // 初始化
    initialize() {},

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
            phone: this.phone,
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
  components: {
    ActionSheet
  }
};
</script>

<style src="./css/login.css" scoped></style>

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
  margin-top: 90px;
  height: 170px;
}

.mh-current-login__panel {
  height: 170px;
}
.mh-current-login__panel h1 {
  font-size: 24px;
  font-weight: 500;
  padding: 0 20px;
  padding-bottom: 42px;
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
</style>
