// 全局导航条
<template>
  <header id="header" class="mh-nav-bar">
    <h1 class="mh-title">{{ title }}</h1>
    <div class="mh-left-panel"></div>
    <div class="mh-right-panel"></div>

    <!-- <button class="mui-action-back mui-btn mui-btn-blue mui-btn-link mui-btn-nav mui-pull-left">
      <span class="mui-icon mui-icon-left-nav"></span>首页
    </button>
    <button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right">编辑</button>
    <button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right">考虑</button>-->
  </header>
</template>

<script>
export default {
  props: {
    /// 导航栏标题，必须字符串
    title: String
  }
};
</script>

<style lang="scss" scoped>
.mh-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  background-color: #ededed;
  display: block;
}

.mh-nav-bar .mh-title {
  position: absolute;
  left: 40px;
  right: 40px;
  color: #000;
  text-align: center;
  font-size: 17px;
  font-weight: 500;
  line-height: 44px;
  width: auto;
  z-index: 1;
}

.mh-nav-bar .mh-left-panel {
  background-color: red;
  position: absolute;
  left: 0;
  right: 50%;
  top: 0;
  bottom: 0;
}

.mh-nav-bar .mh-right-panel {
  background-color: green;
  position: absolute;
  left: 50%;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
