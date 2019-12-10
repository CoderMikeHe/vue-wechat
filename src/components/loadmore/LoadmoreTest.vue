<template>
  <div class="loadmore__wrapper">
    <Loadmore ref="loadmore" :top-method="refreshBoqList" 
    @translate-change="translateChange"
    :bottom-method="loadMoreData"
      :bottom-all-loaded="allLoaded">
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
    </Loadmore>
  </div>
</template>

<script>
import Loadmore from '../../../common/components/loadmore/Loadmore';
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
    refreshBoqList(){
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded()
      }, 2000);
    },
    translateChange(val){
      console.log('偏移...',val);
    },

    loadMoreData(){
      
    },

  },
}
</script>

<style lang="scss">
.loadmore__wrapper{
  height: 100%;
  overflow: scroll;
}
  h1 {
    height: 44px;
    line-height: 44px;
  }
</style>