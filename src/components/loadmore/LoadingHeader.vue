<template>
  <div class="ptr-instructions outside">
    <div v-show="showIcon">
      <div class="inside">
        <div class="block_1"
             :class="{ animate1: iconRun }"></div>
        <div class="block_2"
             :class="{ animate2: iconRun }"></div>
        <div class="block_3"
             :class="{ animate3: iconRun }"></div>
      </div>
      <!-- <div v-show="showTime" class="time">更新时间：{{ timeContent }}</div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoadingIcon',
  props: {
    showTime: {
      type: Boolean,
      default: true
    },
    iconRun: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    timeContent: {
      type: String,
      default: '时间'
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.ptr-instructions-text {
  position: fixed;
  bottom: -1000px;
  height: 0;
  line-height: 90px;
  text-align: center;
  width: 0;
  z-index: 1;
  background-color: #eee;
  color: #999;
}
.outside {
  width: 100%;
}
.inside {
  width: 60px;
  height: 12px;
  margin: 0 auto;
  position: relative;
}
.inside div {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.time {
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: #999;
  height: 12px;
  line-height: 12px;
  margin-top: 12px;
}
.block_1 {
  background: #f25e51;
  position: absolute;
  left: 0;
  top: 0;
  // -webkit-animation: block_1 1.8s infinite linear;
  // animation: block_1 1.8s infinite linear;
}
.block_2 {
  background: #f6af39;
  position: absolute;
  left: 24px;
  top: 0;
  // -webkit-animation: block_2 1.8s infinite linear;
  // animation: block_2 1.8s infinite linear;
}
.block_3 {
  background: #1ea5e8;
  position: absolute;
  left: 48px;
  top: 0;
}
.animate1 {
  -webkit-animation: block_1 1.8s infinite linear;
  animation: block_1 1.8s infinite linear;
}
.animate2 {
  -webkit-animation: block_2 1.8s infinite linear;
  animation: block_2 1.8s infinite linear;
}
.animate3 {
  -webkit-animation: block_3 1.8s infinite linear;
  animation: block_3 1.8s infinite linear;
}
@-webkit-keyframes block_1 {
  0% {
    left: 0;
  }
  16.7% {
    left: 24px;
  }
  33.4% {
    left: 48px;
  }
  50.1% {
    left: 24px;
  }
  66.8% {
    left: 24px;
  }
  83.5% {
    left: 24px;
  }
  100% {
    left: 0;
  }
}
@keyframes block_1 {
  0% {
    left: 0;
  }
  16.7% {
    left: 24px;
  }
  33.4% {
    left: 48px;
  }
  50.1% {
    left: 24px;
  }
  66.8% {
    left: 24px;
  }
  83.5% {
    left: 24px;
  }
  100% {
    left: 0;
  }
}
@-webkit-keyframes block_2 {
  0% {
    left: 24px;
  }
  16.7% {
    left: 24px;
  }
  33.4% {
    left: 0;
  }
  50.1% {
    left: 24px;
  }
  66.8% {
    left: 48px;
  }
  83.5% {
    left: 24px;
  }
  100% {
    left: 24px;
  }
}
@keyframes block_2 {
  0% {
    left: 24px;
  }
  16.7% {
    left: 24px;
  }
  33.4% {
    left: 0;
  }
  50.1% {
    left: 24px;
  }
  66.8% {
    left: 48px;
  }
  83.5% {
    left: 24px;
  }
  100% {
    left: 24px;
  }
}
@-webkit-keyframes block_3 {
  0% {
    left: 48px;
  }
  16.7% {
    left: 24px;
  }
  33.4% {
    left: 24px;
  }
  50.1% {
    left: 24px;
  }
  66.8% {
    left: 0;
  }
  83.5% {
    left: 24px;
  }
  100% {
    left: 48px;
  }
}
@keyframes block_3 {
  0% {
    left: 48px;
  }
  16.7% {
    left: 24px;
  }
  33.4% {
    left: 24px;
  }
  50.1% {
    left: 24px;
  }
  66.8% {
    left: 0;
  }
  83.5% {
    left: 24px;
  }
  100% {
    left: 48px;
  }
}
</style>
