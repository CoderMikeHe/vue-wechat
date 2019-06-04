// 当前账号登陆
<template>
  <div class="_full-container">
    <div class="_full-content">
      <!-- AvatarView -->
      <div class="mh-current-login__avatar">
        <img src="../../assets/images/other/AppIcon120x120.png" alt />
        <p>491273090</p>
      </div>
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
              <div class="mh-input__wrapper">
                <input
                  required="required"
                  class="mh-input"
                  type="password"
                  placeholder="请填写QQ密码"
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
              <div class="captcha-btn">获取验证码</div>
            </div>
          </div>
        </transition>
      </div>
      <!-- 切换登陆方式按钮 -->
      <div class="mh-current-login__change-btn">
        <span @click="changeBtnDidClick">{{ changeLogin }}</span>
      </div>
      <!-- 登录按钮 -->
      <div class="mh-current-login__login">
        <a
          class="mh-btn mh-btn_primary"
          :class="{ 'mh-btn_disabled': loginBtnDisabled }"
          @click="login"
          >登录
        </a>
      </div>
      <!-- 底部更多面板 -->
      <div class="mh-current-login__more">
        <span class="mh-current-login__more-item" @click="itemDidClick(0)"
          >找回密码</span
        >
        <span class="mh-current-login__more-item" @click="itemDidClick(1)"
          >紧急冻结</span
        >
        <span class="mh-current-login__more-item" @click="itemDidClick(2)"
          >更多选项</span
        >
      </div>
      <!-- ActionSheet -->
      <ActionSheet
        v-model="showActionSheet"
        @did-click-item="didClickItem"
        :items="items"
      ></ActionSheet>
    </div>
  </div>
</template>

<script>
import ActionSheet, {
  ActionSheetItem
} from "components/actionSheet/ActionSheet";
// 偏好设置
import MHPreferenceSettingHelper from "../../assets/js/MHPreferenceSettingHelper.js";

export default {
  name: "CurrentLogin",
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
      captcha: ""
    };
  },
  created() {
    this.configItems();
  },
  mounted() {
    console.log(this.$route.name + "  👉  " + window.history.length);
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
    // ActionSheet 事件处理
    didClickItem(idx) {
      if (idx === 0) return;
      switch (idx) {
        case 1:
          break;
        case 2:
          break;
        default:
          break;
      }
    },
    changeBtnDidClick() {
      this.showPasswordWay = !this.showPasswordWay;
    },
    // 登录事件
    login() {
      // 按钮不可点击，则过滤
      if (this.loginBtnDisabled) return;

      console.log("password   " + this.password);

      // 模拟网络加载
      setTimeout(() => {
        console.log(this);
        const user = {
          /// PS: 假设请求到数据模型是  User模型
          screen_name: "Mike-乱港三千-Mr_元先森",
          idstr: "61856069",
          profile_image_url:
            "http://tva3.sinaimg.cn/crop.0.6.264.264.180/93276e1fjw8f5c6ob1pmpj207g07jaa5.jpg",
          avatar_large: "",
          /// 用户的封面
          coverImageUrl:
            "http://p1.gexing.com/G1/M00/7A/83/rBACE1TW-cjDb2yHAAGORXsJM6w706.jpg",
          coverImage: "Kris.jpeg",

          /// 假设是这里统一都是qq号码登录
          qq: "491273090",
          email: "491273090@qq.com", // PS：机智，拼接成QQ邮箱
          wechatId: "codermikehe", // PS：瞎写的
          phone: "13874385438", // PS：瞎写的
          channel: 0, // 手机号登录
          // -- 0 Boy -- 1 Girl
          gender: 0,
          // 个新签名
          featureSign: "生死看淡，不服就干"
        };
        // 归档登陆账号
        this.$store.commit("loginUser", user);

        // 跳转登陆
        this.$router.replace("/mainframe", () => {
          console.log("导航完成");
        });
      }, 3000);
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
  margin-top: 44px;
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
  left: 16px;
  bottom: 0;
  right: 16px;
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

.input-captcha {
  padding-right: 40px;
}

.mh-current-login__change-btn {
  margin: 10px 16px;
  color: #5b6a91;
  font-size: 15px;
}

.mh-current-login__login {
  margin-top: 68px;
  padding: 0 16px;
}

/* 获取验证码 */
.captcha-btn {
  border: 1px solid #353535;
  color: #353535;
  background-color: transparent;
  padding: 2px 5px;
  font-size: 13px;
  border-radius: 3px;
}

/* 底部更多列表 */
.mh-current-login__more {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
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
  width: 1px;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  -webkit-transform: scale(0.5);
  -ms-transform: scale(0.5);
  transform: scale(0.5);
}
</style>
