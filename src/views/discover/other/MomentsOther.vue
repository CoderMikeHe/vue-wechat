<template>
  <div class="_full-container">
    <NavigationBar
      :left-item="blackBackItem"
      @left-click="$router.back()"
      title="富文本事件"
    ></NavigationBar>
    <div class="_full-content _content-padding-top44">
      <!-- <h1 class="other__title">点击内容：👉{{ value }}</h1> -->
      <img
        class="previewer-demo-img"
        v-for="(item, index) in list"
        :key="index"
        :src="item.src"
        width="100"
        @click="show(index)"
      />
      <previewer
        :list="list"
        ref="previewer"
        :options="options"
        @on-index-change="logIndexChange"
      ></previewer>
    </div>
  </div>
</template>

<script>
import previewer from "components/previewer/Previewer";
export default {
  name: "moments-other",
  components: {
    previewer
  },
  data() {
    return {
      list: [
        {
          msrc:
            "http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg",
          src:
            "http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg",
          w: 800,
          h: 400
        },
        {
          msrc:
            "http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg",
          src:
            "http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg",
          w: 1200,
          h: 900
        },
        {
          msrc:
            "http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg",
          src:
            "http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg"
        }
      ],
      options: {
        getThumbBoundsFn(index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll(".previewer-demo-img")[
            index
          ];
          // get window scroll Y
          let pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop;

          console.log(window.pageYOffset);
          console.log(document.documentElement.scrollTop);

          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect();
          // w = width
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    };
  },
  created() {
    this.value = this.$route.params.value;
  },
  methods: {
    logIndexChange(arg) {
      console.log(arg);
    },
    show(index) {
      this.$refs.previewer.show(index);
    }
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

* >>> figure {
  display: flex;
}

* >>> figure img {
  height: 100px;
  width: 100px;
}
</style>
