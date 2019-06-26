<template>
  <div class="avatars__wrapper">
    <img
      class="avatar"
      v-for="(item, index) in dataSource"
      :key="index"
      :style="item.style"
      :src="item.profile_image_url"
      alt=""
    />
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
      let os = [];
      this.srcs.forEach((o, i) => {
        let style = {};
        style.marginTop = "2px";
        style.marginLeft = "2px";
        if (len === 1) {
          // 一张图，占全屏
          style.width = "48px";
          style.height = "48px";
          style.marginTop = "0px";
          style.marginLeft = "0px";
        } else if (len < 5) {
          // <5张图片 <3,4>
          style.width = "21px";
          style.height = "21px";
          if (i === 0 || i === 2) {
            style.marginLeft = "0";
          }
          if (i === 2 || i === 3) {
            style.marginTop = "0px";
          }
        } else {
          // >=5张图 (5,6,7,8,9)
          style.width = "12px";
          style.height = "12px";
          if (i === 0 || i === 3 || i === 6) {
            style.marginLeft = "0px";
          }
          if (len < 7) {
            if (i === 3 || i === 4 || i === 5) {
              style.marginTop = "0px";
            }
          } else {
            if (i === 6 || i === 7 || i === 8) {
              style.marginTop = "0px";
            }
          }
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
  background-color: #dedede;
  width: 48px;
  height: 48px;
  -webkit-justify-content: center;
  justify-content: center;
  /* 定义多跟轴方向 */
  -webkit-align-content: center;
  align-content: center;
  -webkit-align-items: center;
  align-items: center;
  border-radius: 6px;
  overflow: hidden;
}
</style>
