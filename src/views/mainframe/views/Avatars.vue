<template>
  <div class="avatars__wrapper">
    <div
      class="avatar"
      v-for="(item, index) in dataSource"
      :key="index"
      :style="item.style"
    >
      <img :src="item.profile_image_url" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "avatars",
  props: {
    srcs: Array
  },
  data() {
    return {
      dataSource: []
    };
  },
  methods: {
    // 数据处理
    handleSrcsData() {
      let len = this.srcs.length;
      let style = {};
      let os = [];
      if (len === 1) {
        // 一张图，占全屏
        style.width = "60px";
        style.height = "60px";
      } else if (len < 5) {
        // <5张图片
        style.width = "30px";
        style.height = "30px";
        style.paddingTop = "3px";
        style.paddingLeft = "3px";
      } else {
        // >=5张图
        style.width = "20px";
        style.height = "20px";
        style.paddingTop = "3px";
        style.paddingLeft = "3px";
      }
      this.srcs.forEach((o, i) => {
        if (i == 0 || i === 3 || i === 6) {
          // style.marginLeft = "0";
        }
        o.style = style;
        os.push(o);
      });
      this.dataSource = os;
    }
  },
  created() {
    console.log("Avatars Created");
    this.handleSrcsData();
  }
};
</script>

<style scoped>
.avatars__wrapper {
  padding: 0;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  flex-flow: row wrap-reverse;
  background-color: red;
  width: 60px;
  height: 60px;
  -webkit-justify-content: center;
  justify-content: center;
  /* 定义多跟轴方向 */
  -webkit-align-content: center;
  align-content: center;
  -webkit-align-items: center;
  align-items: center;
}

.avatar {
  background-color: green;
}

img {
  display: block;
  width: calc(100% - 3px);
  height: calc(100% - 3px);
}
</style>
