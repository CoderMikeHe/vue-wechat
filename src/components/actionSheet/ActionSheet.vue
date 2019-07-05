<template>
  <transition name="mh-actionsheet-fade">
    <div class="mh-mask" @click.stop="didClickItem(0)" v-show="currentValue">
      <!-- 禁止掉事件冒泡 -->
      <transition name="mh-actionsheet-float">
        <div class="mh-actionsheet" @click.stop v-show="currentValue">
          <div class="mh-actionsheet__title" v-if="title">
            <p class="mh-actionsheet__title-text">{{ title }}</p>
          </div>
          <div class="mh-actionsheet__menu">
            <div
              class="mh-actionsheet__cell"
              v-for="(item, index) in items"
              :key="index"
              :style="{ color: item.destructive ? 'red' : '#191919' }"
              @click="didClickItem(index + 1)"
            >
              <span v-if="item.iconfont" :class="item.iconfont">&nbsp;</span>
              {{ item.title }}
              <span style="display:block;font-size:12px;color:#888">{{
                item.subtitle
              }}</span>
            </div>
          </div>
          <div
            class="mh-actionsheet__action"
            v-if="cancelText"
            :style="{ 'margin-top': cancelText ? '6px' : '0' }"
          >
            <div class="mh-actionsheet__cell" @click="didClickItem(0)">
              {{ cancelText }}
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
/**
 * 🔥 vue 自定义组件使用v-model
 * - [vue 自定义组件使用v-model](https://www.cnblogs.com/coffeelovetea/p/8326115.html)
 * - [vue 自定义组件使用v-model](https://www.cnblogs.com/bldf/p/6645225.html)
 * 🔥 vue 事件修饰符
 * - [Vue 2.0的学习笔记：Vue的Methods和事件处理](https://www.w3cplus.com/vue/vue-methods-and-event-handling.html)
 *
 */
export default {
  name: "actionsheet",
  props: {
    // 是否显示
    value: {
      type: Boolean,
      default: false
    },
    // menuItems
    items: {
      type: Array,
      // [ActionSheetItem]
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    // title
    title: {
      type: String,
      default: ""
    },
    // cancel-text
    cancelText: {
      type: String,
      default: "取消"
    }
  },
  data() {
    return {
      currentValue: this.value
    };
  },
  watch: {
    // 手动实现 v-model 的机制
    value(val) {
      this.currentValue = val;
    },
    currentValue(val) {
      this.$emit("input", val);
    }
  },
  methods: {
    // 事件点击
    didClickItem(index) {
      this.currentValue = false;
      // 延迟一点
      setTimeout(() => {
        this.$emit("did-click-item", index);
      }, 250);
    }
  }
};

// ⚠️Tips: 这个类就是专门服务于ActionSheet这个组件
class ActionSheetItem {
  // 构造函数
  constructor({
    title = "",
    subtitle = "",
    iconfont = "",
    destructive = false
  } = {}) {
    this.title = title; // title
    this.subtitle = subtitle; // subtitle
    this.iconfont = iconfont; // 字体图标
    this.destructive = destructive; // 是否颜色加重 警告色
  }
}
// defalult 构造器
export { ActionSheetItem };
</script>

<style scoped>
/* ------ 动画CSS ------ */
/* 初始or结束 */
.mh-actionsheet-fade-enter,
.mh-actionsheet-fade-leave-to {
  opacity: 0;
}

.mh-actionsheet-fade-enter-active,
.mh-actionsheet-fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

/* 初始or结束 */
.mh-actionsheet-float-enter,
.mh-actionsheet-float-leave-to {
  -webkit-transform: translate(0, 100%);
  transform: translate(0, 100%);
}

.mh-actionsheet-float-enter-active,
.mh-actionsheet-float-leave-active {
  transition: transform 0.25s ease-in-out, -webkit-transform 0.25s ease-in-out;
}

/* ------ 元素CSS ------ */
.mh-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  overflow-y: hidden;
  opacity: 1;
}

.mh-actionsheet {
  position: fixed;
  left: 0;
  bottom: 0;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  z-index: 5000;
  width: 100%;
  background-color: #efeff4;
}

.mh-actionsheet__title {
  position: relative;
  height: 65px;
  padding: 0 16px;
  line-height: 1.4;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  text-align: center;
  font-size: 12px;
  color: #888;
  background: #fcfcfd;
}
.mh-actionsheet__title:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #e5e5e5;
  color: #e5e5e5;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.mh-actionsheet__title .mh-actionsheet__title-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.mh-actionsheet__menu {
  background-color: #fcfcfd;
}
.mh-actionsheet__action {
  margin-top: 6px;
  background-color: #fcfcfd;
}
.mh-actionsheet__cell {
  position: relative;
  padding: 10px 16px;
  text-align: center;
  font-size: 17px;
  color: #191919;
}
.mh-actionsheet__cell:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #e5e5e5;
  color: #e5e5e5;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.mh-actionsheet__cell:active {
  background-color: #e5e5e5;
}
.mh-actionsheet__cell:first-child:before {
  display: none;
}
</style>
