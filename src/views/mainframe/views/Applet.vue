<template>
  <div
    class="applet__box"
    @scroll.stop
    @touchstart.stop
    @touchmove.stop="kkkk"
    @touchend.stop
  >
    <div class="applet__title">小程序</div>
    <div class="applet__scroll">
      <div class="applet__items">
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
        <h1>测试</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "applet",
  data() {
    return {};
  }
};
</script>

<style scoped>
.applet__box {
  position: relative;
  width: 100%;
  height: 300px;
}

.applet__title {
  height: 44px;
  line-height: 44px;
  color: white;
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}

.applet__scroll {
  position: relative;
  top: 44px;
  height: calc(100% - 44px);

  overflow-x: hidden;
  overflow-y: auto;
}
</style>
