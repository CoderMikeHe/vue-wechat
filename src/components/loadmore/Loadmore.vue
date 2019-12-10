<template>
  <div class="mt-loadmore" ref="scroller">
    <div
      class="wc-loadmore-content"
      :class="{ 'is-dropped': topDropped || bottomDropped }"
      :style="{ transform: transform }"
    >
      <slot name="header">
        <div class="mint-loadmore-top" v-if="topMethod">
          <Header :icon-run="iconRun"></Header>
        </div>
      </slot>
      <slot></slot>
    </div>
    <!-- footer -->
    <slot name="footer">
      <div
        class="mint-loadmore-bottom"
        v-if="bottomMethod"
        :style="footerStyle"
      >
        <i class="weui-loading" v-if="bottomStatus === 'loading'"></i>
        <i class="wc-loadmore-arrow" :style="arrowStyle" v-else></i>
        <span class="mint-loadmore-text">{{ bottomText }}</span>
      </div>
    </slot>
  </div>
</template>

<script>
import Header from "./LoadingHeader";

export default {
  name: "wc-loadmore",
  components: {
    Header
  },
  props: {
    maxDistance: {
      type: Number,
      default: 0
    },
    autoFill: {
      type: Boolean,
      default: true
    },
    distanceIndex: {
      type: Number,
      default: 2
    },
    topPullText: {
      type: String,
      default: "下拉刷新"
    },
    topDropText: {
      type: String,
      default: "释放更新"
    },
    topLoadingText: {
      type: String,
      default: "加载中..."
    },
    topDistance: {
      type: Number,
      default: 70
    },
    topMethod: {
      type: Function
    },
    bottomPullText: {
      type: String,
      default: "上拉加载"
    },
    bottomDropText: {
      type: String,
      default: "释放刷新"
    },
    bottomLoadingText: {
      type: String,
      default: "加载中..."
    },
    bottomDistance: {
      type: Number,
      default: 70
    },
    bottomMethod: {
      type: Function
    },
    bottomAllLoaded: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      translate: 0,
      scrollEventTarget: null,
      containerFilled: false,
      topText: "",
      topDropped: false,
      bottomText: "",
      bottomDropped: false,
      bottomReached: false,
      direction: "",
      startY: 0,
      startScrollTop: 0,
      currentY: 0,
      topStatus: "",
      bottomStatus: "",
      iconRun: false
    };
  },

  computed: {
    transform() {
      return this.translate === 0
        ? null
        : "translate3d(0, " + this.translate + "px, 0)";
    },

    // 箭头旋转
    arrowStyle() {
      if (this.bottomStatus === "drop") {
        let transform = "rotate(180deg)";
        return {
          transform
        };
      }
      return null;
    },
    // footerStyle
    footerStyle() {
      return {
        bottom: this.translate === 0 ? "-50px" : -1 * this.translate + "px"
      };
    }
  },

  watch: {
    topStatus(val) {
      this.$emit("top-status-change", val);
      switch (val) {
      case "pull":
        this.topText = this.topPullText;
        break;
      case "drop":
        this.topText = this.topDropText;
        break;
      case "loading":
        this.topText = this.topLoadingText;
        break;
      }
    },

    bottomStatus(val) {
      this.$emit("bottom-status-change", val);
      switch (val) {
      case "pull":
        this.bottomText = this.bottomPullText;
        break;
      case "drop":
        this.bottomText = this.bottomDropText;
        break;
      case "loading":
        this.bottomText = this.bottomLoadingText;
        break;
      }
    }
  },

  methods: {
    onTopLoaded() {
      this.translate = 0;
      this.iconRun = false;
      setTimeout(() => {
        this.topStatus = "pull";
      }, 200);
    },

    onBottomLoaded() {
      this.bottomStatus = "pull";
      this.bottomDropped = false;
      this.$nextTick(() => {
        if (this.scrollEventTarget === window) {
          document.body.scrollTop += 50;
        } else {
          this.scrollEventTarget.scrollTop += 50;
        }
        this.translate = 0;
      });
      if (!this.bottomAllLoaded && !this.containerFilled) {
        this.fillContainer();
      }
    },

    getScrollEventTarget(element) {
      return this.$refs.scroller;
      // let currentNode = element;
      // while (
      //   currentNode &&
      //   currentNode.tagName !== "HTML" &&
      //   currentNode.tagName !== "BODY" &&
      //   currentNode.nodeType === 1
      // ) {
      //   let overflowY = document.defaultView.getComputedStyle(currentNode)
      //     .overflowY;
      //   if (overflowY === "scroll" || overflowY === "auto") {
      //     console.log("currentNode is", currentNode);
      //     return currentNode;
      //   }
      //   currentNode = currentNode.parentNode;
      // }
      // return window;
    },

    getScrollTop(element) {
      if (element === window) {
        return Math.max(
          window.pageYOffset || 0,
          document.documentElement.scrollTop
        );
      } else {
        return element.scrollTop;
      }
    },

    bindTouchEvents() {
      this.$el.addEventListener("touchstart", this.handleTouchStart);
      this.$el.addEventListener("touchmove", this.handleTouchMove);
      this.$el.addEventListener("touchend", this.handleTouchEnd);
    },

    init() {
      this.topStatus = "pull";
      this.bottomStatus = "pull";
      this.topText = this.topPullText;
      this.scrollEventTarget = this.getScrollEventTarget(this.$el);
      if (typeof this.bottomMethod === "function") {
        this.fillContainer();
        this.bindTouchEvents();
      }
      if (typeof this.topMethod === "function") {
        this.bindTouchEvents();
      }
    },

    fillContainer() {
      if (this.autoFill) {
        this.$nextTick(() => {
          if (this.scrollEventTarget === window) {
            this.containerFilled =
              this.$el.getBoundingClientRect().bottom >=
              document.documentElement.getBoundingClientRect().bottom;
          } else {
            this.containerFilled =
              this.$el.getBoundingClientRect().bottom >=
              this.scrollEventTarget.getBoundingClientRect().bottom;
          }
          if (!this.containerFilled) {
            this.bottomStatus = "loading";
            this.bottomMethod();
          }
        });
      }
    },

    checkBottomReached() {
      if (this.scrollEventTarget === window) {
        /**
         * fix:scrollTop===0
         */
        return (
          document.documentElement.scrollTop ||
          document.body.scrollTop + document.documentElement.clientHeight >=
            document.body.scrollHeight
        );
      } else {
        let a =
          parseInt(this.$el.getBoundingClientRect().bottom, 10) <=
          parseInt(this.scrollEventTarget.getBoundingClientRect().bottom, 10) +
            1;
        console.log("object");
        console.log(parseInt(this.$el.getBoundingClientRect().bottom, 10));
        console.log(
          parseInt(this.scrollEventTarget.getBoundingClientRect().bottom, 10)
        );
        let scrollEventTarget = this.scrollEventTarget;
        let c = scrollEventTarget.scrollTop + scrollEventTarget.clientHeight;
        let b = scrollEventTarget.scrollHeight;
        console.log("----");
        console.log(c);
        console.log(b);
        console.log("checkBottomReached is", a);
        return c >= b;
      }
    },

    handleTouchStart(event) {
      this.startY = event.touches[0].clientY;
      this.startScrollTop = this.getScrollTop(this.scrollEventTarget);
      this.bottomReached = false;
      if (this.topStatus !== "loading") {
        this.topStatus = "pull";
        this.topDropped = false;
      }
      if (this.bottomStatus !== "loading") {
        this.bottomStatus = "pull";
        this.bottomDropped = false;
      }
    },

    handleTouchMove(event) {
      if (
        this.startY < this.$el.getBoundingClientRect().top &&
        this.startY > this.$el.getBoundingClientRect().bottom
      ) {
        return;
      }
      this.currentY = event.touches[0].clientY;
      let distance = (this.currentY - this.startY) / this.distanceIndex;
      this.direction = distance > 0 ? "down" : "up";
      console.log(this.startScrollTop);
      console.log(distance);
      if (
        typeof this.topMethod === "function" &&
        this.direction === "down" &&
        this.getScrollTop(this.scrollEventTarget) === 0 &&
        this.topStatus !== "loading"
      ) {
        event.preventDefault();
        event.stopPropagation();
        if (this.maxDistance > 0) {
          this.translate =
            distance <= this.maxDistance
              ? distance - this.startScrollTop
              : this.translate;
        } else {
          this.translate = distance - this.startScrollTop;
        }
        if (this.translate < 0) {
          this.translate = 0;
        }
        this.topStatus = this.translate >= this.topDistance ? "drop" : "pull";
      }

      if (this.direction === "up") {
        this.bottomReached = this.bottomReached || this.checkBottomReached();
      }
      if (
        typeof this.bottomMethod === "function" &&
        this.direction === "up" &&
        this.bottomReached &&
        this.bottomStatus !== "loading" &&
        !this.bottomAllLoaded
      ) {
        event.preventDefault();
        event.stopPropagation();
        if (this.maxDistance > 0) {
          this.translate =
            Math.abs(distance) <= this.maxDistance
              ? this.getScrollTop(this.scrollEventTarget) -
                this.startScrollTop +
                distance
              : this.translate;
        } else {
          this.translate =
            this.getScrollTop(this.scrollEventTarget) -
            this.startScrollTop +
            distance;
        }
        if (this.translate > 0) {
          this.translate = 0;
        }
        this.bottomStatus =
          -this.translate >= this.bottomDistance ? "drop" : "pull";
      }
      console.log(this.translate);
      this.$emit("translate-change", this.translate);
    },

    handleTouchEnd() {
      if (
        this.direction === "down" &&
        this.getScrollTop(this.scrollEventTarget) === 0 &&
        this.translate > 0
      ) {
        this.topDropped = true;
        if (this.topStatus === "drop") {
          this.translate = "50";
          this.topStatus = "loading";
          this.iconRun = true;
          this.topMethod();
        } else {
          this.translate = "0";
          this.topStatus = "pull";
        }
      }
      if (this.direction === "up" && this.bottomReached && this.translate < 0) {
        this.bottomDropped = true;
        this.bottomReached = false;
        if (this.bottomStatus === "drop") {
          this.translate = "-50";
          this.bottomStatus = "loading";
          this.bottomMethod();
        } else {
          this.translate = "0";
          this.bottomStatus = "pull";
        }
      }
      this.$emit("translate-change", this.translate);
      this.direction = "";
    }
  },

  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.mt-loadmore {
  overflow: scroll;
  position: relative;
  height: 100%;
  .wc-loadmore-content {
    position: static !important;
    .is-dropped {
      transition: 0.2s;
    }
  }

  .mint-loadmore-top,
  .mint-loadmore-bottom {
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #999;
  }

  .mint-loadmore-top {
    margin-top: -50px;
  }

  // .mint-loadmore-bottom {
  //   margin-bottom: -50px;
  // }
  .mint-loadmore-bottom {
    position: absolute;
    width: 100%;
    bottom: -50px;
  }

  .weui-loading,
  .wc-loadmore-arrow {
    margin-right: 10px;
  }

  .wc-loadmore-arrow {
    background-image: url("./loadmore_up_arrow.png");
    background-repeat: no-repeat;
    background-size: 100%;
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
