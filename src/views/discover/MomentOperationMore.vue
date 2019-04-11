<template>
  <div class="mh-more__wrapper" @touchstart.stop>
    <div class="mh-more__thumb" @click="thumbAction">
      <!-- :css="false" 加了这个没动画 -->
      <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <img
          v-if="show"
          src="../../assets/images/moments/wx_albumLikeHL_20x20.png"
          class="mh-more__ani-pic"
        >
      </transition>
      {{ thumbed?'赞':'赞' }}
    </div>
    <div class="mh-more__line"></div>
    <div class="mh-more__comment">评论</div>
  </div>
</template>

<script>
export default {
  name: "More",
  data() {
    return {
      thumbTitle: "赞",
      thumbed: false,
      show: false
    };
  },
  methods: {
    thumbAction() {
      this.thumbed = !this.thumbed;
      this.show = true;
    },
    // 注意： 动画钩子函数的第一个参数：el，表示 要执行动画的那个DOM元素，是个原生的 JS DOM对象
    // 大家可以认为 ， el 是通过 document.getElementById('') 方式获取到的原生JS DOM对象
    beforeEnter(el) {
      // beforeEnter 表示动画入场之前，此时，动画尚未开始，可以 在 beforeEnter 中，设置元素开始动画之前的起始样式
      // 设置小球开始动画之前的，起始位置
      el.style.transform = "scale(.5, .5)";
    },
    enter(el, done) {
      // 这句话，没有实际的作用，但是，如果不写，出不来动画效果；
      // 可以认为 el.offsetWidth 会强制动画刷新
      el.offsetWidth;
      // enter 表示动画 开始之后的样式，这里，可以设置爱心完成动画之后的，结束状态
      el.style.transform = "scale(2.5, 2.5)";
      el.style.transition = "transform .25s ease-in-out";

      console.log("object");
      // 这里的 done， 起始就是 afterEnter 这个函数，也就是说：done 是 afterEnter 函数的引用
      done();
    },
    afterEnter(el) {
      // 动画完成之后，会调用 afterEnter
      this.show = false;
    }
  }
};
</script>

<style scoped>
.mh-more__wrapper {
  background-color: rgb(77, 81, 84);
  position: absolute;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  color: white;
  font-size: 14px;
  border-radius: 6px;
  /* 自元素溢出 隐藏 */
  overflow: hidden;
}
.mh-more__thumb {
  background-image: url("../../assets/images/moments/wx_albumLike_20x20.png");
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: 18px center;
  padding-left: 40px;
  line-height: 40px;
  width: 90px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  color: inherit;
  text-align: left;

  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}
.mh-more__thumb:active {
  background-color: black;
  background-image: url("../../assets/images/moments/wx_albumLikeHL_20x20.png");
}

.mh-more__ani-pic {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 18px;
  top: 10px;
}

.mh-more__comment {
  background-image: url("../../assets/images/moments/wx_albumCommentSingleA_20x20.png");
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: 18px center;
  line-height: 40px;
  padding-left: 40px;
  width: 90px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  color: inherit;
  text-align: left;

  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}
.mh-more__comment:active {
  background-color: black;
  background-image: url("../../assets/images/moments/wx_albumCommentSingleAHL_20x20.png");
}

.mh-more__line {
  background-image: url("../../assets/images/moments/wx_albumCommentLine_0x24.png");
  background-repeat: no-repeat;
  background-size: 1px 24px;
  width: 1px;
  height: 39px;
  background-position: center;
}
</style>
