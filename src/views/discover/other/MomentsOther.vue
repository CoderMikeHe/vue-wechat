<template>
  <div class="_full-container">
    <NavigationBar
      :left-item="blackBackItem"
      @left-click="$router.back()"
      title="富文本事件"
    ></NavigationBar>
    <div class="_full-content _content-padding-top44">
      <h1 class="other__title">点击内容：👉{{ value }}</h1>
      <div>
        <h5>Gallery one</h5>
        <div>
          <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "moments-other",
  data() {
    return {
      slide1: [
        {
          src:
            "https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg",
          msrc:
            "https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg",
          alt: "picture1",
          title: "Image Caption 1",
          w: 600,
          h: 400
        },
        {
          src:
            "https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg",
          msrc:
            "https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg",
          alt: "picture2",
          title: "Image Caption 2",
          w: 1200,
          h: 900
        }
      ],
      value: ""
    };
  },
  created() {
    this.value = this.$route.params.value;
  },
  methods: {
    handleClose() {
      console.log("close event");
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
