// 联系人信息
<template>
  <div class="_full-container">
    <NavigationBar
      :left-item="backItem"
      :right-item="moreItem"
      @left-click="$router.back()"
      @right-click="rightItemClick"
    ></NavigationBar>
    <div class="_full-content _content-padding-top44">
      <section class="mh-contact-info">
        <div class="mh-contact-info__info">
          <div class="mh-contact-info__info-icon">
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553016104583&di=45244cedc3d47c3c1fd7261869dc23da&imgtype=0&src=http%3A%2F%2Fimg1.touxiang.cn%2Fuploads%2F20140122%2F22-074744_465.jpg"
              alt
              width="64px"
              height="64px"
            >
          </div>
          <div class="mh-contact-info__info-detail">
            <h1 style="font-weight:bold;font-size:20px">吴亦凡</h1>
            <p style="color:#7f7f7f">昵称：Kris_Wu</p>
            <p style="color:#7f7f7f">微信号：kris_wu</p>
            <p style="color:#7f7f7f">地区：加拿大</p>
          </div>
        </div>
        <div class="mh-contact-info__cell _mh-tap-highlight">
          <p class="mh-contact-info__cell-title">设置备注和标签</p>
          <img
            class="mh-right-arrow"
            src="@/assets/images/common/tableview_arrow_8x13.png"
            width="8px"
            height="13px"
          >
        </div>
      </section>

      <section class="mh-contact-info">
        <div class="mh-contact-info__cell _mh-tap-highlight mh-contact-info__cell-moments">
          <p class="mh-contact-info__cell-title">朋友圈</p>
          <div class="mh-contact-info__cell-pics">
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553016104583&di=45244cedc3d47c3c1fd7261869dc23da&imgtype=0&src=http%3A%2F%2Fimg1.touxiang.cn%2Fuploads%2F20140122%2F22-074744_465.jpg"
              alt
              class="mh-contact-info__cell-pic"
            >
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553016104583&di=45244cedc3d47c3c1fd7261869dc23da&imgtype=0&src=http%3A%2F%2Fimg1.touxiang.cn%2Fuploads%2F20140122%2F22-074744_465.jpg"
              alt
              class="mh-contact-info__cell-pic"
            >
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553016104583&di=45244cedc3d47c3c1fd7261869dc23da&imgtype=0&src=http%3A%2F%2Fimg1.touxiang.cn%2Fuploads%2F20140122%2F22-074744_465.jpg"
              alt
              class="mh-contact-info__cell-pic"
            >
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553016104583&di=45244cedc3d47c3c1fd7261869dc23da&imgtype=0&src=http%3A%2F%2Fimg1.touxiang.cn%2Fuploads%2F20140122%2F22-074744_465.jpg"
              alt
              class="mh-contact-info__cell-pic"
            >
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553016104583&di=45244cedc3d47c3c1fd7261869dc23da&imgtype=0&src=http%3A%2F%2Fimg1.touxiang.cn%2Fuploads%2F20140122%2F22-074744_465.jpg"
              alt
              class="mh-contact-info__cell-pic"
            >
          </div>
          <img
            class="mh-right-arrow"
            src="@/assets/images/common/tableview_arrow_8x13.png"
            width="8px"
            height="13px"
          >
        </div>
        <div class="mh-contact-info__cell _mh-tap-highlight">
          <p class="mh-contact-info__cell-title">更多信息</p>
          <img
            class="mh-right-arrow"
            src="@/assets/images/common/tableview_arrow_8x13.png"
            width="8px"
            height="13px"
          >
        </div>
      </section>

      <section class="mh-contact-info">
        <div class="mh-contact-info__cell">
          <p class="mh-contact-info__cell-center-title">
            <span class="iconfont icon-contact-info-message">&nbsp;</span>发消息
          </p>
        </div>
        <div class="mh-contact-info__cell" @click="chat">
          <p class="mh-contact-info__cell-center-title">
            <span class="iconfont icon-contact-info-video">&nbsp;</span>音视频通话
          </p>
        </div>
      </section>

      <!-- ActionSheet -->
      <actionSheet v-model="showActionSheet" @did-click-item="didClickItem" :items="items"></actionSheet>
    </div>
  </div>
</template>

<script>
import MHBarButtonItem, { moreItem } from "../../assets/js/MHBarButtonItem.js";
import actionSheet, {
  ActionSheetItem
} from "components/actionSheet/ActionSheet";
export default {
  name: "contact-info",
  created() {
    this.configItems();
  },
  data() {
    return {
      moreItem: moreItem,
      showActionSheet: false, // 显示ActionSheet,
      items: []
    };
  },
  methods: {
    rightItemClick(index) {
      this.$router.push("/contacts/contact-info/data-setting");
    },
    // 聊天
    chat() {
      this.showActionSheet = true;
    },
    // actionSheet 事件
    didClickItem(index) {
      console.log(index);
    },
    // 配置actionsheet items
    configItems() {
      const videoCallItem = new ActionSheetItem({
        title: "视频通话",
        iconfont: "iconfont icon-contact-info-video-call"
      });
      const voiceCallItem = new ActionSheetItem({
        title: "语音通话",
        iconfont: "iconfont icon-contact-info-phone-call"
      });
      this.items = [videoCallItem, voiceCallItem];
    }
  },
  components: {
    actionSheet
  }
};
</script>

<style scoped>
.mh-contact-info {
  overflow: hidden;
  position: relative;
  background-color: #fff;
  margin-bottom: 8px;
}

/* bottom分割线 */
.mh-contact-info:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #d8d8d8;
  color: #d8d8d8;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}

.mh-contact-info__info {
  padding: 16px 16px 20px;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}

.mh-contact-info__info-detail {
  margin-left: 16px;
}

.mh-contact-info__cell {
  padding: 0px 16px;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: space-between;
  /* Safari 6.1+ */
  justify-content: space-between;
  line-height: 56px;
  font-size: 17px;
  background-color: #fff;
}

.mh-contact-info__cell:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #d8d8d8;
  color: #d8d8d8;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  left: 16px;
  z-index: 2;
}

.mh-contact-info__cell:first-child:before {
  display: none;
}

.mh-contact-info__cell-pics {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  flex: 1;
  margin: 0 16px;
  -webkit-justify-content: center;
  /* Safari 6.1+ */
  justify-content: center;
}

.mh-contact-info__cell-pic {
  height: 50px;
  width: 50px;
  margin-left: 5px;
}

.mh-contact-info__cell-title {
  color: #191919;
}

.mh-contact-info__cell-moments {
  line-height: 60px;
}

.mh-contact-info__cell-center-title {
  color: #5b6a91;
  flex: 1;
  text-align: center;
  font-weight: 600;
}
</style>