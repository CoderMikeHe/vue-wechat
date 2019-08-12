<template>
  <vue-route-layout>
    <!-- 背景图片 -->
    <div class="background-image"></div>
    <!-- 语言按钮 -->
    <a href="javascript:;" class="language" @click="skipToLanguageList">{{
      language
    }}</a>
    <!-- 登陆或注册 -->
    <div class="login-register">
      <!-- 登陆按钮 -->
      <a
        href="javascript:;"
        class="weui-btn weui-btn_block weui-btn_default"
        @click.prevent="login"
        >登陆</a
      >
      <!-- 注册按钮 -->
      <a
        href="javascript:;"
        class="weui-btn weui-btn_block weui-btn_primary"
        @click.prevent="register"
        >注册</a
      >
    </div>
  </vue-route-layout>
</template>

<script>
// 用户第一次使用微信时的登陆界面 [登陆/注册]
export default {
  name: "login",
  data() {
    return {
      language: "简体中文"
    };
  },
  created() {
    this.language = this.$route.params.language || "简体中文";
  },
  methods: {
    // 跳转到语言选择列表
    skipToLanguageList() {
      this.$router.push({
        name: "LanguagePicker",
        params: {
          language: this.language
        }
      });
    },

    // 登陆
    login() {
      this.$router.push({
        name: "other-login"
      });
    },

    // 注册
    register() {
      this.$router.push({
        name: "Register"
      });
    }
  }
};
</script>

<style scoped>
.background-image {
  width: 100%;
  height: 100%;
  background-image: url("~@/assets/images/login/BootImage_375x667.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.language {
  position: absolute;
  color: rgba(255, 255, 255, 0.7);
  top: 20px;
  right: 20px;
  display: block;
  font-size: 12px;
  text-align: right;
}

.login-register {
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 20px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  -webkit-align-items: center;
}

.login-register a {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  padding: 10px 24px;
}

.login-register a:first-child {
  margin-right: 10px;
  background-color: #fff;
}

.login-register a:last-child {
  margin-left: 10px;
}

.weui-btn_default:not(.weui-btn_disabled):active {
  color: #06ae56;
  background-color: #d9d9d9;
}

.weui-btn + .weui-btn {
  margin-top: 0;
}
</style>
