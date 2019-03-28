// 切换账号
<template>
  <div class="_full-container">
    <div class="_full-content">
      <transition name="fade">
        <p
          class="mh-switch-account__cancel-button"
          v-if="clearLogin"
          @click="$router.replace('/mainframe')"
        >取消</p>
      </transition>
      <!-- logo -->
      <div class="mh-switch-account__logo">
        <img src="../../assets/images/other/AppIcon120x120.png" alt>
      </div>

      <!-- slogan -->
      <transition name="fade" mode="out-in">
        <div class="mh-switch-account__slogan" v-if="clearLogin" key="single-slogan">
          <h1 class="mh-switch-account__slogan-single">轻触头像以切换账号</h1>
        </div>
        <div class="mh-switch-account__slogan" v-else key="double-slogan">
          <h1 class="mh-switch-account__slogan-title">清除登陆痕迹</h1>
          <h6 class="mh-switch-account__slogan-subtitle">仅清除本地登陆记录，不清除聊天记录</h6>
        </div>
      </transition>

      <!-- account -->
      <div class="mh-switch-account__account">
        <div class="mh-switch-account__account-item"></div>
        <div
          class="mh-switch-account__account-item"
          :class="{'item-float-ani':ani}"
          @click="itemDidClick"
        ></div>
      </div>

      <transition name="fade" mode="out-in">
        <div
          class="mh-switch-account__bottom"
          v-if="clearLogin"
          @click="clearLogin=!clearLogin"
          key="clear-login"
        >前往清除登陆痕迹</div>
        <div
          class="mh-switch-account__bottom"
          v-else
          @click="clearLogin=!clearLogin"
          key="clear-cancel"
        >取消</div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "SwitchAccount",
  data() {
    return {
      clearLogin: true,
      ani: false
    };
  },
  methods: {
    abc() {
      console.log("router--" + this.$router);
      // this.$router.back();
      this.$router.go(-1);
      // this.$router.replace("/mainframe");
    },
    itemDidClick() {
      this.ani = true;
    }
  }
};
</script>

<style scoped>
/* 动画样式 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@keyframes mymove {
  from {
    /* top: 208px;
    left: 0; */
  }
  to {
    top: -44px;
    left: 0;
  }
}

.item-float-ani {
  position: absolute;
  animation: mymove 5s infinite;
  -webkit-animation: mymove 5s infinite; /* Safari 和 Chrome */
}

/* 元素样式 */
.ssss {
  width: 100%;
  height: 100%;
  background-color: #ff0;
}

.mh-switch-account__cancel-button {
  color: #000;
  font-size: 16px;
  padding-left: 10px;
  height: 44px;
  line-height: 44px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.mh-switch-account__cancel-button:active {
  color: rgba(0, 0, 0, 0.2);
}

.mh-switch-account__logo {
  margin-top: 44px;
}

.mh-switch-account__logo img {
  display: block;
  height: 60px;
  width: 60px;
  margin: 0 auto; /*水平居中*/
}

.mh-switch-account__slogan {
  margin-top: 44px;
  height: 60px;
  text-align: center;
  color: #000;
}

.mh-switch-account__slogan-single {
  height: inherit;
  line-height: 60px;
  font-size: 20px;
}

.mh-switch-account__slogan-title {
  height: 30;
  line-height: 30px;
  font-size: 20px;
}
.mh-switch-account__slogan-subtitle {
  font-size: 14px;
}

.mh-switch-account__account {
  position: absolute;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  top: 208px;
  left: 0;
  right: 0;
  bottom: 44px;
  background-color: yellow;
}

.mh-switch-account__account-item {
  background: #f00;
  width: 150px;
  height: 150px;
  margin-left: 10px;
}

.mh-switch-account__bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 44px;
  color: blue;
  text-align: center;
  line-height: 44px;

  font-size: 16px;
}
</style>
