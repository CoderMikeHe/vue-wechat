<template>
  <div class="profile__wrapper">
    <div
      class="profile__top-wrapper"
      :style="{ height: topHeight }"
      @click="coverDidClick"
    >
      <div class="top-wrapper__name">{{ user.screen_name }}</div>
      <div class="top-wrapper__avatar" @click.stop="avatarDidClick">
        <img :src="user.profile_image_url" alt="" />
      </div>
    </div>
    <div class="profile__bottom-wrapper" :style="{ height: bottomHeight }">
      <div
        class="bottom-wrapper__message"
        @click.stop="messageDidRead"
        v-if="unreadCount"
      >
        <img class="message__avatar" :src="unreadUser.profile_image_url" />
        <p class="message__content">{{ unreadMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "moment-profile",
  data() {
    return {
      showActionSheet: false,
      items: [],
      unreadCount: 10,
      unreadUser: {
        /// 假数据
        avatar_large:
          "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1183589132,2855731999&fm=26&gp=0.jpg",
        profile_image_url:
          "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1183589132,2855731999&fm=26&gp=0.jpg",
        screen_name: "tombkeeper",
        idstr: "1401527553"
      }
    };
  },
  created() {},
  methods: {
    // 头像被点击
    avatarDidClick() {
      this.$router.push({
        name: "contact-info",
        params: this.user
      });
    },
    // 封面被点击
    coverDidClick() {
      // 回调出去
      this.$emit("cover-click");
    },
    // 消息框被点击
    messageDidRead() {
      // 未读数为0
      this.unreadCount = 0;
    }
  },
  computed: {
    // 获取手机屏幕的宽
    topHeight() {
      return document.documentElement.clientWidth + "px";
    },
    bottomHeight() {
      return this.unreadCount > 0 ? "151px" : "50px";
    },
    // unreadMessage
    unreadMessage() {
      return this.unreadCount + "条新消息";
    },
    ...mapState({
      // 当前用户
      user: state => state.user
    })
  }
};
</script>

<style scoped>
.profile__top-wrapper {
  width: 100%;
  background: url(~@/assets/images/moments/Kris.png) no-repeat 0 0;
  background-size: contain;
  position: relative;
}

.top-wrapper__avatar {
  position: absolute;
  right: 10px;
  bottom: -24px;
  z-index: 2;
}
.top-wrapper__avatar img {
  width: 75px;
  height: 75px;
  border-radius: 6px;
}
.top-wrapper__name {
  position: absolute;
  color: white;
  bottom: 5px;
  right: 105px;
  font-size: 20px;
  text-align: right;
  font-weight: 800;
  text-shadow: 0px 1px 1px #212227;
}

.profile__bottom-wrapper {
  min-height: 50px;
  position: relative;
  background-color: #fff;
}
.bottom-wrapper__message {
  width: 181px;
  height: 40px;
  background-color: rgb(56, 57, 57);
  border-radius: 6px;
  background-image: url("~@/assets/images/moments/wx_albumTimeLineTipArrow_15x15.png");
  background-repeat: no-repeat;
  background-size: 15px 15px;
  background-position: 155px center;

  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding-left: 5px;
  padding-right: 31px;
  position: absolute;
  bottom: 14px;
  /* 🔥 绝对定位水平居中布局小技巧 */
  left: 50%;
  margin-left: -90.5px;
}
.bottom-wrapper__message:active {
  background-color: rgb(51, 52, 52);
  background-image: url("~@/assets/images/moments/wx_AlbumTimeLineTipArrowHL_15x15.png");
}

.message__avatar {
  width: 30px;
  height: 30px;
}
.message__content {
  margin-left: 5px;
  text-align: center;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  color: white;
  font-size: 12px;
  font-weight: 500;
}
</style>
