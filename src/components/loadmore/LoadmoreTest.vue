<template>
  <div class="loadmore__wrapper">
    <div class="xxoo">toubu</div>
    <div class="ooxx">
      <Loadmore ref="loadmore"
                :top-method="refreshBoqList"
                @translate-change="translateChange"
                :bottom-method="loadMoreData"
                :bottom-all-loaded="allLoaded">
        <h1>00000000000</h1>
        <h1>123</h1>
        <h1>123</h1>
        <h1>123</h1>
        <h1>123</h1>
        <h1>123</h1>
        <h1>123</h1>
        <h1>123</h1>
        <!-- <h1>123</h1>
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
        <h1>123</h1> -->
        <h1>123</h1>
        <h1>123</h1>
        <h1>123</h1>
        <h1>123</h1>
        <h1>8888888888</h1>
      </Loadmore>
    </div>
    <div class="oooo"></div>
  </div>
</template>

<script>
import Loadmore from './Loadmore'
export default {
  components: {
    Loadmore
  },
  data() {
    return {
      allLoaded: false
    }
  },
  methods: {
    refreshBoqList() {
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded()
      }, 20000000)
    },
    translateChange(val) {
      // console.log("偏移...", val);
    },

    loadMoreData() {
      setTimeout(() => {
        this.$refs.loadmore.onBottomLoaded()
      }, 2000000)
    }
  }
}
</script>

<style lang="scss">
.loadmore__wrapper {
  height: 100%;
  overflow: scroll;
}

.xxoo {
  height: 44px;
  background-color: red;
}

.ooxx {
  height: calc(100% - 88px);
}

.oooo {
  height: 44px;
  background-color: orange;
}

h1 {
  height: 44px;
  line-height: 44px;
  background-color: white;
}
</style>
