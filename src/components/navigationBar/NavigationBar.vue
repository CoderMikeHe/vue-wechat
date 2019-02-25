// 全局导航条

<template>
  <header id="header" class="mui-bar mui-bar-nav">
    <h1 class="mui-title">{{ title }}</h1>
    <button class="mui-action-back mui-btn mui-btn-blue mui-btn-link mui-btn-nav mui-pull-left">
      <span class="mui-icon mui-icon-left-nav"></span>首页
    </button>
    <button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right">编辑</button>
    <button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right">考虑</button>
  </header>
</template>

<script>
export default {
  props: {
    /// 导航栏标题，必须字符串
    title : String
  }
};
</script>

<style lang="scss" scoped>



</style>
