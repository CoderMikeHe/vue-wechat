<template>
  <div class="_full-container">
    <NavigationBar
      :left-item="blackBackItem"
      @left-click="$router.back()"
      title="富文本事件"
    ></NavigationBar>
    <div class="_full-content _content-padding-top44">
      <h1 class="other__title">点击内容：👉{{ value }}</h1>
      <img
        class="previewer-demo-img"
        v-for="(item, index) in list"
        :key="index"
        :src="item.src"
        width="100"
        @click="show(index)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "moments-other",
  components: {},
  data() {
    return {};
  },
  created() {
    this.value = this.$route.params.value;
  },
  methods: {}
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
