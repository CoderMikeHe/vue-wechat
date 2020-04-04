<template>
  <div class="wc-speech-input__wrapper">
    <!-- 蒙版 -->
    <!-- <transition name="wc-speech-input-mask">
      <div
        class="wc-mask_transparent"
        @click="onClickingMask"
        v-show="false"></div>
    </transition> -->
    <!-- 底部sheet -->
    <div class="wc-speech-input"
         :class="{'wc-speech-input_toggle': show, 'wc-speech-input_toggle-animation': transition}"
         ref="iOSMenu">
      <!-- menu -->
      <div class="wc-speech-input__menu">
        <div class="wc-speech-input__title"
             v-show="!heartbeatAnim">按住说话</div>
        <div class="wc-speech-input__animation"
             :class="{ripple: aniamtion, heartbeat: aniamtion&&heartbeatAnim}"
             @animationstart="handleAnimationStart"
             @animationend="handleAnimationEnd">
        </div>
        <div class="wc-speech-input__button"
             :class="[ touchInside ? 'highlight' : 'normal' ]"
             ref="speech"
             @touchstart="handleTouchStart"
             @touchmove="handleTouchMove"
             @touchend="handleTouchEnd"
             @touchcancel="handleTouchEnd">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wc-speech-input',
  props: {
    value: Boolean,
    // 是否需要过渡动画
    transition: Boolean
  },
  data() {
    return {
      show: false,
      // 是否需要动画
      aniamtion: false,
      // 呼吸灯动画
      heartbeatAnim: false,
      // 定时器
      timer: 0,
      // 语音按钮中心点 相对整个窗口 center
      center: {
        x: 0,
        y: 0
      },
      // 手指是否在 半径60px的圆圈内
      touchInside: false
    }
  },
  methods: {
    // 开始拖拽
    handleTouchStart(event) {
      console.log('handleTouchStart')

      // 计算语音按钮中心点位置
      let rect = this.$refs.speech.getBoundingClientRect()
      // 中心位置
      let center = {
        x: rect.left + (rect.right - rect.left) / 2,
        y: rect.top + (rect.bottom - rect.top) / 2
      }
      let scrollLeft =
        document.body.scrollLeft || document.documentElement.scrollLeft
      let scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop

      // 最终的 左 和 上位置
      center.x = screenLeft + center.x
      center.y = scrollTop + center.y

      this.center = center

      this.$emit('on-touch-start', event)

      this.aniamtion = true
      this.touchInside = true

      // Fixed bug: 这里开启定时器，1.5s 后开启呼吸灯动画，相对于 在handleAnimationEnd 中开启 这里相对声波动画丝滑过渡到呼吸灯动画
      this.timer = window.setTimeout(() => {
        this.heartbeatAnim = true
      }, 1500)
    },
    // 正在拖拽
    handleTouchMove(event) {
      // 当前触摸点X
      let currentX = event.targetTouches[0].clientX * 1
      // 当前触摸点Y
      let currentY = event.targetTouches[0].clientY * 1
      // 差值x
      let deltaX = currentX - this.center.x * 1
      // 差值y
      let deltaY = currentY - this.center.y * 1

      // 查看手指触摸点 是否在60半径的圆圈内
      if (deltaX * deltaX + deltaY * deltaY <= 60 * 60) {
        this.touchInside = true
      } else {
        this.touchInside = false
      }
    },
    // 结束拖拽
    handleTouchEnd(event) {
      this.aniamtion = false
      this.touchInside = false
      this.heartbeatAnim = false
      window.clearTimeout(this.timer)
    },

    // 动画开始
    handleAnimationStart(event) {},
    // 动画结束
    handleAnimationEnd(event) {}
  },
  watch: {
    show(val) {
      this.$emit('input', val)
    },
    value: {
      handler: function(val) {
        this.show = val
      },
      immediate: true
    }
  },
  beforeDestroy() {
    this.$refs.iOSMenu &&
      this.$refs.iOSMenu.removeEventListener(
        'transitionend',
        this.onTransitionEnd
      )
  }
}
</script>

<style lang="scss" scoped>
.wc-mask_transparent {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
.wc-speech-input {
  position: fixed;
  left: 0;
  bottom: 0;
  transform: translate(0, 100%);
  backface-visibility: hidden;
  z-index: 5000;
  width: 100%;

  color: #333;
}
/* actionSheet aniamtion */
.wc-speech-input_toggle {
  transform: translate(0, 0);
}

.wc-speech-input_toggle-animation {
  transition: transform 0.3s;
}

.wc-speech-input__menu {
  position: relative;
  background-color: transparent;
  /* 400px */
  min-height: 140px;
  overflow: auto;
  .wc-speech-input__title {
    position: absolute;
    top: 15px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 12px;
    color: #a6a6a6;
  }
}

.wc-speech-input__button {
  position: absolute;
  background-repeat: no-repeat;
  background-size: 32px 32px;
  background-position: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  margin-left: -30px;
  margin-top: -30px;
  z-index: 2;

  &.normal {
    background-image: url('./speech_normal.png');
    background-color: whitesmoke;
  }

  &.highlight {
    background-image: url('./speech_highlight.png');
    background-color: #039ae8;
  }
}
.wc-speech-input__animation {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #039ae8;
  opacity: 0.8;
  top: 50%;
  left: 50%;
  margin-left: -30px;
  margin-top: -30px;
}

// 波纹动画
.ripple {
  animation: ripple 2s ease;
}

@keyframes ripple {
  0% {
    transform: scale(1.25);
  }

  50% {
    transform: scale(1.725);
  }

  100% {
    transform: scale(2);
  }
}

// 心跳动画
.heartbeat {
  animation: heartbeat 1s ease infinite;
  animation-direction: alternate;
  -webkit-animation-animation: heartbeat 1s ease infinite;
  -webkit-animation-direction: alternate;
}

// scale 2-1.5  0.125
@keyframes heartbeat {
  0% {
    transform: scale(2);
  }

  25% {
    transform: scale(1.95);
  }

  50% {
    transform: scale(1.9);
  }

  75% {
    transform: scale(1.85);
  }

  100% {
    transform: scale(1.8);
  }
}

.wc-speech-input__action {
  margin-top: 0.588rem;
  background-color: #ffffff;
}
.wc-speech-input__cell {
  position: relative;
  padding: 0.824rem 0;
  text-align: center;
  font-size: 0.941rem;
  line-height: 1.294rem;
}
.wc-speech-input__cell:active {
  background-color: #ececec;
}
.wc-speech-input__cell::before {
  content: ' ';
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #ccc;
  color: #ccc;
  transform-origin: 0 0;
  transform: scaleY(0.5);
}
.wc-speech-input__cell:first-child::before {
  display: none;
}

/* Vue 过渡动画 */
.wc-speech-input-mask-enter,
.wc-speech-input-mask-leave-active {
  opacity: 0;
}
.wc-speech-input-mask-leave-active,
.wc-speech-input-mask-enter-active {
  transition: opacity 300ms !important;
}
</style>
