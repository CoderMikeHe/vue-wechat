<template>
  <div class="loadmore__wrapper">
    <Loadmore
      ref="loadmore"
      :top-method="refreshBoqList"
      @translate-change="translateChange"
      :bottom-method="loadMoreData"
      :bottom-all-loaded="allLoaded"
    >
      <h1>000</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>456</h1>
    </Loadmore>
  </div>
</template>

<script>
import Loadmore from "./Loadmore";
export default {
  components: {
    Loadmore
  },
  data() {
    return {
      allLoaded: false
    };
  },
  methods: {
    refreshBoqList() {
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded();
      }, 20000);
    },
    translateChange(val) {
      // console.log("偏移...", val);
    },

    loadMoreData() {
      setTimeout(() => {
        this.$refs.loadmore.onBottomLoaded();
      }, 20000);
    }
  }
};
</script>

<style lang="scss">
.loadmore__wrapper {
  height: 100%;
  overflow: scroll;
}
h1 {
  height: 44px;
  line-height: 44px;
  background-color: white;
}
</style>
