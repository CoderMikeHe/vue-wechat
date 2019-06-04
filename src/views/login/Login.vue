<template>
  <div class="_full-container">
    <div class="_full-content">
      <!-- 背景图片 -->
      <div class="background-image"></div>
      <!-- 语言按钮 -->
      <a href="javascript:;" class="language" @click="skipToLanguageList"
        >中文简体</a
      >

      <div class="login-register">
        <!-- 登陆按钮 -->
        <a href="javascript:;" class="mh-btn mh-btn_primary login">登录</a>
        <!-- 注册按钮 -->
        <a href="javascript:;" class="mh-btn mh-btn_primary register">注册</a>
      </div>
    </div>
  </div>
</template>

<script>
// 用户第一次使用微信时的登陆界面 [登陆/注册]
export default {
  name: "login",
  data() {
    return {};
  },
  methods: {
    skipToLanguageList() {
      this.$router.push({
        name: "LanguagePicker",
        params: {
          language: "简体中文"
        }
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
}

.login,
.register {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  height: 44px;
}
.login {
  margin-right: 10px;
  background-color: #fff;
  color: #57be6a;
}

.register {
  margin-left: 10px;
}
</style>
