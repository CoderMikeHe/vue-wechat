<template>
  <div class="launch" :class="{ hide: hide }"></div>
</template>
<script>
// 启动页
export default {
  name: "launch",
  data() {
    return {
      hide: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.hide = true;
    }, 2000);
  }
};
</script>
<style>
.launch {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: #000b17;
  transition: 0.3s;
  -webkit-transition: 0.3s;
  background-image: url("~@/assets/images/login/BootImage_375x667.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.launch.hide {
  opacity: 0;
  display: none;
}
</style>
