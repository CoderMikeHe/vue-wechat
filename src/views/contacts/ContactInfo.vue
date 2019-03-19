// 联系人信息
<template>
  <div class="_full-container">
    <NavigationBar title="哈哈" :left-item="backItem" @left-click="$router.back()"></NavigationBar>
    <div class="_full-content _content-margin-top44">
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
            <h1>吴亦凡吴亦凡吴亦凡吴亦凡吴亦凡吴亦凡吴亦凡吴亦凡吴亦凡吴亦凡吴亦凡吴亦凡吴亦凡吴亦凡</h1>
            <p>昵称：Kris_Wu</p>
            <p>微信号：kris_wu</p>
            <p>地区：加拿大</p>
          </div>
        </div>
        <div class="mh-contact-info__cell _mh-tap-highlight">
          <p>设置备注和标签</p>
          <img
            class="mh-right-arrow"
            src="@/assets/images/common/tableview_arrow_8x13.png"
            width="8px"
            height="13px"
          >
        </div>
      </section>

      <section class="mh-contact-info">
        <div class="mh-contact-info__cell _mh-tap-highlight">
          <p>朋友圈</p>
          <div class="mh-contact-info__cell-pics">
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553016104583&di=45244cedc3d47c3c1fd7261869dc23da&imgtype=0&src=http%3A%2F%2Fimg1.touxiang.cn%2Fuploads%2F20140122%2F22-074744_465.jpg"
              alt
              width="64px"
              height="64px"
            >
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553016104583&di=45244cedc3d47c3c1fd7261869dc23da&imgtype=0&src=http%3A%2F%2Fimg1.touxiang.cn%2Fuploads%2F20140122%2F22-074744_465.jpg"
              alt
              width="64px"
              height="64px"
            >
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553016104583&di=45244cedc3d47c3c1fd7261869dc23da&imgtype=0&src=http%3A%2F%2Fimg1.touxiang.cn%2Fuploads%2F20140122%2F22-074744_465.jpg"
              alt
              width="64px"
              height="64px"
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
          <p>更多信息</p>
          <img
            class="mh-right-arrow"
            src="@/assets/images/common/tableview_arrow_8x13.png"
            width="8px"
            height="13px"
          >
        </div>
      </section>

      <section class="mh-contact-info">
        <div class="mh-contact-info__cell _mh-tap-highlight">
          <p>设置备注和标签</p>
          <img
            class="mh-right-arrow"
            src="@/assets/images/common/tableview_arrow_8x13.png"
            width="8px"
            height="13px"
          >
        </div>
        <div class="mh-contact-info__cell _mh-tap-highlight">
          <p>设置备注和标签</p>
          <img
            class="mh-right-arrow"
            src="@/assets/images/common/tableview_arrow_8x13.png"
            width="8px"
            height="13px"
          >
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {};
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
  padding: 16px 16px 32px;
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
}
</style>

// 5b6a91
// 7f7f7f
// 5px
// 191919