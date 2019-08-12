<template>
  <vue-route-layout class="register__wrapper">
    <!-- 取消 -->
    <div class="cancel__wrapper"><span @click="$router.back()">取消</span></div>
    <!-- 内容 -->
    <div class="content__wrapper">
      <h1 class="content__title">用手机号注册</h1>
      <div class="content__avatar" @click="showActionSheet = true"></div>
      <div class="content__container">
        <div class="weui-cell lg-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">昵称</label>
          </div>
          <div class="weui-cell__bd">
            <div class="mh-input__wrapper">
              <input
                required
                class="weui-input"
                type="text"
                placeholder="陈晨"
                v-model="nickname"
              />
              <a
                @click.prevent="nickname = ''"
                href="javascript:"
                class="weui-icon-clear"
              ></a>
            </div>
          </div>
        </div>
        <div class="weui-cell lg-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">国家/地区</label>
          </div>
          <div class="weui-cell__bd">
            <p class="mh-zone-title" @click="skip2ZoneList">中国大陆</p>
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
                placeholder="请设置密码"
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
    </div>

    <!-- 协议 -->
    <div
      class="agreement__wrapper"
      :class="{ animated: shaked, shake: shaked }"
    >
      <i
        class="iconfont"
        :class="[checked ? 'icon-checked-plain' : 'icon-check-plain']"
        @click="checked = !checked"
      ></i>
      <span>我已阅读并同意</span>
      <a href="javascript:home();" class="link">《微信软件许可及服务协议》</a>
    </div>

    <!-- 注册 -->
    <a
      href="javascript:;"
      @click.prevent="registerAction"
      class="weui-btn weui-btn_block weui-btn_primary lg-login-btn"
      :class="{ 'lg-btn--disabled': registerBtnDisabled }"
      >注册</a
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
// 导入ActionSheet
import ActionSheet, {
  ActionSheetItem
} from "components/actionSheet/ActionSheet";
// 工具类
import Utils from "assets/utils/utils";
// UserModel
import UserModel from "./js/user";
// 账号存储
import AccountHelper from "@/assets/js/account/account";
import { setTimeout } from "timers";
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
      items: [],
      // 是否选中了协议
      checked: false,
      // 是否需要shake动画
      shaked: false
    };
  },
  created() {
    this.configItems();
  },
  methods: {
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
    // 注册事件
    registerAction() {
      // 0、没有选中服务条框，则抖动提示
      if (!this.checked) {
        this.shaked = true;
        setTimeout(() => {
          this.shaked = false;
        }, 1000);
        return;
      }

      // 1、验证手机号是否正确
      let phone = Utils.removesWhitespace(this.phone);
      if (!Utils.validMobile(phone)) {
        let content = "你输入的是一个无效的手机号码";
        let title = "手机号码错误";
        this.$weui.alert(content, { title: title });
        return;
      }
      // 2、验证密码正确
      if (
        this.password.length < 8 ||
        this.password.length > 16 ||
        Utils.includeChinese(this.password) ||
        Utils.pureDigitCharacters(this.password)
      ) {
        this.$weui.alert("", {
          title: "密码必须是8-16位英文字母、数字、字符组合（不能是纯数字）"
        });
        return;
      }

      // 3、跳转登陆
      // 显示loading
      let loading = this.$weui.loading("请稍后...");
      setTimeout(() => {
        // 隐藏loading
        loading.hide();
        // 假设获取到了数据
        let user = Object.assign({}, UserModel);
        user.qq = "491273090";
        user.emial = "491273090" + "@qq.com"; // PS：机智，拼接成QQ邮箱
        user.phone = Utils.removesWhitespace(this.phone); // PS：瞎写的
        user.channel = "Mobile Phone";
        user.screen_name = this.nickname;
        // 登陆
        AccountHelper.login(user, this.phone);
      }, 1000);
    },
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
  },
  computed: {
    // 登录按钮是否无效
    registerBtnDisabled() {
      return (
        this.nickname.length <= 0 ||
        this.phone.length <= 0 ||
        this.password.length <= 0
      );
    }
  }
};
</script>

<style src="./css/login.css" scoped></style>
<style scoped>
.weui-cell.lg-cell {
  padding: 10px 0;
}
.weui-cell.lg-cell::after {
  left: 0;
  right: 0;
}
.lg-right-arrow {
  margin-right: 25px;
}
.weui-btn.lg-login-btn {
  margin-top: 10px;
}
.mh-input__wrapper {
  padding-right: 20px;
}

/* -------------------------------------------- */
.register__wrapper {
  background-color: #fff;
  font-size: 17px;
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
  padding-left: 20px;
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

.agreement__wrapper {
  margin-top: 40px;
  text-align: center;
  font-size: 13px;
  color: #525458;
}
.agreement__wrapper >>> .iconfont {
  color: #525458;
  font-size: 13px;
  margin-right: 3px;
}
.agreement__wrapper a {
  color: #576b95;
}
</style>
