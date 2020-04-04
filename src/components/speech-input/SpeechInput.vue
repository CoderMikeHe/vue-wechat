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
    <div class="wc-speech-input" :class="{'wc-speech-input_toggle': show}" ref="iOSMenu">
      <!-- menu -->
      <div class="wc-speech-input__menu">
        <div class="wc-speech-input__title"></div>
        <!-- wc-speech-input__button -->
        <div class="animation" :class="{ripple: start, heartbeat: start&&end}" @animationstart="handleAnimationStart" @animationend="handleAnimationEnd">
        </div>
        <div class="wc-speech-input__button" :class="[ start ? 'highlight' : 'normal' ]" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd" @touchcancel="handleTouchEnd"></div>
        <!-- <div class="wc-speech-input__wave"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
import WelinkHelper from '@/common/js/welinkHelp'
export default {
  name: 'wc-speech-input',
  props: {
    value: Boolean
  },
  data () {
    return {
      show: false,
      start: false,
      end: false,
      // 定时器
      timer: 0
    }
  },
  methods: {
    // 开始拖拽
    handleTouchStart (event) {
      console.log('handleTouchStart')
      this.$emit('on-touch-start', event)
      this.start = true
      this.timer = window.setTimeout(() => {
        this.end = true
      }, 1500)
    },
    // 正在拖拽
    handleTouchMove (event) {
      console.log('handleTouchMove')
    },
    // 结束拖拽
    handleTouchEnd (event) {
      console.log('handleTouchEnd ' + this.direction)
      this.start = false
      this.end = false
      window.clearTimeout(this.timer)
    },
    handleAnimationStart (event) {
      console.log('handleAnimationStart')
    },

    handleAnimationEnd (event) {
      console.log('handleAnimationEnd')
      // this.end = true
    }
  },
  watch: {
    show (val) {
      this.$emit('input', val)
    },
    value: {
      handler: function (val) {
        this.show = val
      },
      immediate: true
    }
  },
  beforeDestroy () {
    this.$refs.iOSMenu && this.$refs.iOSMenu.removeEventListener('transitionend', this.onTransitionEnd)
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
  // background-color: #ddd;
  transition: transform 0.3s;
  color: #333;
}
/* actionSheet aniamtion */
.wc-speech-input_toggle {
  transform: translate(0, 0);
}

.wc-speech-input__menu {
  position: relative;
  background-color: red;
  /* 400px */
  min-height: 140px;
  overflow: auto;
  .wc-speech-input__title {
    margin: 0 auto;
    text-align: center;
    font-size: $rem_16;
    min-height: 20px;
  }

  .wc-speech-input__wave {
    width: $rem_60;
    height: $rem_60;
    border-radius: 50%;
    margin: 0 auto;
    background-color: #039ae8;

    // animation:ripple 5s infinite;
  }
}

.wc-speech-input__button {
  position: absolute;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-size: $rem_32 $rem_32;
  background-position: center;
  width: $rem_60;
  height: $rem_60;
  border-radius: 50%;
  top: 50%;
  left: 0;
  right: 0;
  z-index: 2;

  &.normal {
    background-image: url("./speech_normal.png");
    background-color: whitesmoke;
  }

  &.highlight {
    background-image: url("./speech_highlight.png");
    background-color: #039ae8;
  }
}
.animation {
  position: relative;
  width: $rem_60;
  height: $rem_60;
  margin: 0 auto;
  border-radius: 50%;
  background-color: #039ae8;
  // border: 3px solid rgba(0, 0, 0, 0.1);
  opacity: 0.5;
  background-color: #039ae8;
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
  animation-direction:alternate;
  -webkit-animation-animation: heartbeat 1s ease infinite;
  -webkit-animation-direction:alternate;
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
  content: " ";
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
