// 全局导航条
<template>
  <header class="mh-nav-bar">
    <!-- 标题 -->
    <h1 class="mh-title">{{ title }}</h1>

    <!-- 左面板 -->
    <div class="mh-left-panel">
      <!-- 面板内部元素 -->
      <div
        class="mh-button-item is-left"
        v-for="(item,index) in getLeftItems"
        @click="leftItemDidClicked(index)"
        :key="index"
      >
        <a class="mh-text-item" v-if="item.type === 0">{{ item.title }}</a>
        <img class="mh-image-item" :src="imageSrc[item.imageSrc]" alt>
      </div>
    </div>
    <!-- 右面版 -->
    <div class="mh-right-panel">
      <!-- 面板内部元素 -->
      <div
        class="mh-button-item is-right"
        v-for="(item,index) in getRightItems"
        @click="rightItemDidClicked(index)"
        :key="index"
      >
        <a class="mh-text-item" v-if="item.type === 0">{{ item.title }}</a>
        <img class="mh-image-item" v-else :src="imageSrc[item.imageSrc]" alt>
      </div>
    </div>
    <!-- 分割线 -->
    <!-- <div class="mh-bottom-line"></div> -->
  </header>
</template>

<script>
import MHBarButtonItem from "../../assets/js/MHBarButtonItem.js";
export default {
  props: {
    /// 导航栏标题，必须字符串
    title: String,

    /// 左边按钮
    leftItem: MHBarButtonItem,
    leftItems: Array,

    // 右边按钮
    rightItem: MHBarButtonItem,
    rightItems: Array
  },

  data() {
    return {
      // 项目中需要用在导航栏的的所有图片资源
      imageSrc: {
        nav_bar_back_arrow: require("../../assets/images/navBar/nav_bar_back_arrow.png"),
        nav_bar_add: require("../../assets/images/navBar/nav_bar_add.png"),
        nav_bar_addfriends: require("../../assets/images/navBar/nav_bar_addfriends.png")
      }
    };
  },
  created() {},
  methods: {
    // 左边按钮被点击 从左到右 0，1，2...
    leftItemDidClicked(index) {
      this.$emit("left-click", index);
    },

    // 右边按钮被点击 从右到左 0，1，2...
    rightItemDidClicked(index) {
      this.$emit("right-click", index);
    }
  },
  computed: {
    getLeftItems() {
      let items = [];
      if (this.leftItems && this.leftItems.length !== 0) {
        items = items.concat(this.leftItems);
      } else if (this.leftItem) {
        items.push(this.leftItem);
      }
      return items;
    },
    getRightItems() {
      let items = [];
      if (this.rightItems && this.rightItems.length !== 0) {
        items = items.concat(this.rightItems);
      } else if (this.rightItem) {
        items.push(this.rightItem);
      }
      return items;
    }
  }
};
</script>

<style scoped>
.mh-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  background-color: #ededed;
  /* 适当增加z-index，因为fixed总是相对窗口的层级 */
  z-index: 1;
}

.mh-nav-bar .mh-title {
  position: absolute;
  left: 40px;
  right: 40px;
  color: #000;
  text-align: center;
  font-size: 17px;
  font-weight: 500;
  line-height: 44px;
  width: auto;
}

.mh-nav-bar .mh-left-panel {
  position: absolute;
  left: 0;
  right: 50%;
  top: 0;
  bottom: 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
}
.mh-button-item {
  height: 40px;
  min-width: 20px;
  vertical-align: middle;
  display: flex;
  align-items: center;
}

.mh-button-item.is-left {
  text-align: left;
  margin-right: 5px;
}

.mh-button-item .mh-text-item {
  /* 垂直居中 */
  line-height: 40px;
  color: #000;
  font-size: 14px;

  /* 设置文字不要换行 */
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.mh-button-item .mh-image-item {
  /* 图片等比例显示 */
  max-width: 25px;
  max-height: 25px;
  width: auto;
  height: auto;
}

.mh-nav-bar .mh-right-panel {
  position: absolute;
  left: 50%;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-flow: row-reverse nowrap;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
}

.mh-button-item.is-right {
  text-align: right;
  margin-left: 5px;
}

.mh-nav-bar .mh-bottom-line {
  position: absolute;
  height: 1px;
  background-color: #d8d8d8;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
