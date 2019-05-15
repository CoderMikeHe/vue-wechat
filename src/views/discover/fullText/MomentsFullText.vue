<template>
  <div class="_full-container">
    <NavigationBar
      :left-item="blackBackItem"
      @left-click="$router.back()"
      title="全文"
    ></NavigationBar>
    <div class="_full-content _content-padding-top44">
      <h1 class="other__title">点击内容：👉{{ value }}</h1>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "moments-other",
  data() {
    return {
      value: ""
    };
  },
  created() {
    this.value = this.$route.params.value;
  }
};
</script>
<style scoped>
.other__title {
  color: #4380d1;
  text-align: center;
  line-height: 44px;
  font-weight: bold;
  background-color: #fff;
  font-size: 20px;
}
</style>
