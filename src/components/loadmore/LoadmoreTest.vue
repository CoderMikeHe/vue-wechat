<template>
  <div class="loadmore__wrapper">
    <div class="xxoo">toubu</div>
    <div class="ooxx">
      <Loadmore ref="loadmore"
                :top-method="refreshBoqList"
                @translate-change="translateChange"
                :bottom-method="loadMoreData"
                :bottom-all-loaded="allLoaded">
        <h1 v-for="(item, index) in items"
            :key="index">
          {{ "这是第" + index + "行" }}
        </h1>
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
      allLoaded: false,
      items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      page: 0
    }
  },
  methods: {
    refreshBoqList() {
      setTimeout(() => {
        this.page = 1
        let items = []
        for (let index = 0; index < 10; index++) {
          let o = this.page * 10 + index
          items.push(o)
        }
        this.items = items
        this.$refs.loadmore.onTopLoaded()
      }, 2000)
    },
    translateChange(val) {
      // console.log("偏移...", val);
    },

    loadMoreData() {
      let page = this.page + 1
      setTimeout(() => {
        for (let index = 0; index < 10; index++) {
          let o = page * 10 + index
          this.items.push(o)
        }
        this.$refs.loadmore.onBottomLoaded()
      }, 4000)
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
  height: 80px;
  line-height: 80px;
  background-color: white;
}
</style>
