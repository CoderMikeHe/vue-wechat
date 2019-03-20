<template>
    <div :class="{'mh-mask:'}" @click.stop="didClickItem(0)">
      <transition name="mh-actionsheet-float">
        <!-- 禁止掉事件冒泡 -->
        <div class="mh-actionsheet" @click.stop v-show="currentValue">
          <div class="mh-actionsheet__title">
            <p class="mh-actionsheet__title-text">这是一个标题，可以为一行或者两行。</p>
          </div>
          <div class="mh-actionsheet__menu">
            <div class="mh-actionsheet__cell" @click="didClickItem(1)">示例菜单</div>
            <div class="mh-actionsheet__cell">示例菜单</div>
            <div class="mh-actionsheet__cell">示例菜单</div>
            <div class="mh-actionsheet__cell">示例菜单</div>
          </div>
          <div class="mh-actionsheet__action">
            <div class="mh-actionsheet__cell" @click="didClickItem(0)">取消</div>
          </div>
        </div>
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
    value: {
      type: Boolean,
      default: false
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
      this.$emit("did-click-item", index);
    }
  }
};
</script>

<style scoped>
/* 初始or结束 */
.mh-actionsheet-float-enter,
.mh-actionsheet-float-leave-to {
  background: rgba(0, 0, 0, 0);
  -webkit-transform: translate(0, 100%);
  transform: translate(0, 100%);
}

.mh-actionsheet-float-enter-active,
.mh-actionsheet-float-leave-active {
  transition: all 0.3s ease;
}

.mh-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  overflow-y: auto;
}
.mh-mask_transparent {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
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
  padding: 0 20px;
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
  font-size: 14px;
  color: #888;
  background: #fcfcfd;
}
.mh-actionsheet__title:before {
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
  padding: 10px 0;
  text-align: center;
  font-size: 18px;
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
  background-color: #ececec;
}
.mh-actionsheet__cell:first-child:before {
  display: none;
}
</style>
