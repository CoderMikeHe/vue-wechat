<template>
  <div class="wc-loadmore__wrapper">
    <div class="wc-loadmore" ref="scroller" @scroll.passive="handleOnScroll">
      <div
        class="wc-loadmore-content"
        :class="{ 'is-dropped': topDropped || bottomDropped }"
        :style="{ transform: transform }"
      >
        <slot name="header">
          <div class="wc-loadmore-top" v-if="topMethod" ref="header">
            <Header :icon-run="iconRun"></Header>
          </div>
        </slot>
        <slot></slot>
      </div>
    </div>
    <!-- footer -->
    <slot name="footer">
      <div
        class="wc-loadmore-bottom"
        v-if="bottomMethod"
        :style="{ bottom: bottom + 'px' }"
        :class="{ 'is-dropped': topDropped || bottomDropped }"
      >
        <i class="weui-loading" v-if="bottomStatus === 'loading'"></i>
        <i class="wc-loadmore-arrow" :style="arrowStyle" v-else></i>
        <span class="wc-loadmore-text">{{ bottomText }}</span>
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
      // 手指滑动的距离
      distance: 0,

      translate: 0,
      //
      tempTopTranslate: 0,
      tempBottomTranslate: 0,
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
      iconRun: false,
      loadingHeader: null,
      loadingFooter: null,

      bottom: -50,

      bottomPoint: false,
      touchStatus: ""
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
      if (!this.scrollEventTarget) {
        return null;
      }
      let bottom = -50;
      // topReached 是否到达顶部
      let topReached = this.scrollEventTarget.scrollTop === 0;

      // bottomReached 是否到达底部
      let bottomReached = this.bottomReached || this.checkBottomReached();

      // 检测上拉临界点
      let maxScrollTop =
        this.scrollEventTarget.scrollHeight -
        this.scrollEventTarget.clientHeight;

      // 当前scrollTop
      let currentScrollTop = this.scrollEventTarget.scrollTop;

      // 偏移scrolltop
      let offsetScrollTop = maxScrollTop - currentScrollTop;

      if (this.direction === "down") {
        // 下拉方向
        if (this.bottomStatus === "loading") {
        } else {
          // 是否到达顶部
          if (topReached) {
          } else {
            // 是否到达了底部
            if (bottomReached) {
            } else {
              // 没达到底部，认为是在走 onScroll 方法
              bottom = -50;
            }
          }
        }
      } else {
        // 上拉方向
        if (this.bottomStatus === "loading") {
          // bottom = 0;
          // 是否到达顶部
          if (topReached) {
          } else {
            // 是否到达了底部
            if (bottomReached) {
              // 到达底部 证明其走 touchMove 方法
              bottom = -50 - 1 * this.translate;
            } else {
              // 没达到底部，认为是在走 onScroll 方法
              console.log(
                "上拉 没达到底部，认为是在走 onScroll 方法",
                offsetScrollTop
              );
              bottom = -offsetScrollTop;
            }
          }
        } else {
          // 是否到达顶部
          if (topReached) {
          } else {
            // 是否到达了底部
            if (bottomReached) {
              // 到达底部 证明其走 touchMove 方法
              bottom = -50 - 1 * this.translate;
            } else {
              // 没达到底部，认为是在走 onScroll 方法
              bottom = -50;
            }
          }
        }
      }
      console.log(
        "🔥 footer bottom is 👉",
        bottom,
        topReached,
        bottomReached,
        this.bottomReached
      );
      return { bottom: bottom + "px" };

      //   if (this.translate >= 0) {
      //     // 下拉
      //     if (this.bottomStatus === "loading") {
      //       // 正在下拉刷新
      //       if (this.topStatus === "loading") {
      //         return { bottom: -1 * this.translate + "px" };
      //       } else {
      //         return { bottom: -1 * this.distance + "px" };
      //       }
      //     }
      //     return null;
      //   } else {
      //     if (this.distance >= 0) {
      //       // 下拉
      //       if (this.bottomStatus === "loading") {
      //         // 检测上拉临界点
      //         let upCriP =
      //           this.scrollEventTarget.scrollHeight -
      //           this.scrollEventTarget.clientHeight;
      //         console.log(
      //           "xxxxxxx",
      //           this.getScrollTop(this.scrollEventTarget),
      //           upCriP
      //         );

      //         return {
      //           bottom: -1 * (upCriP - this.scrollEventTarget.scrollTop) + "px"
      //         };
      //       } else {
      //         // 上拉
      //         return { bottom: -50 - 1 * this.translate + "px" };
      //       }
      //     } else {
      //       // if (this.bottomReached) {
      //       // 到达了底部
      //       // 上拉
      //       return { bottom: -50 - 1 * this.translate + "px" };
      //       // } else {

      //       // }
      //     }
      //   }
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
    handleOnScroll() {
      console.log(
        "。。。。。。。。。。。。。",
        this.scrollEventTarget.scrollTop,
        this.checkBottomReached(),
        this.translate
      );
      if (
        this.topStatus === "loading" &&
        this.tempTopTranslate !== 0 &&
        this.scrollEventTarget.scrollTop === 0 &&
        this.touchStatus === "touchEnd"
      ) {
        this.translate = 50;
        this.topDropped = true;
        // this.tempTopTranslate = 0
      }

      if (
        this.bottomStatus === "loading" &&
        this.checkBottomReached() &&
        this.touchStatus === "touchEnd"
      ) {
        console.log("我onscroll到底部了");
        this.translate = -50;
        this.bottom = 0;
        this.bottomDropped = true;

        // 这里虽然手动设置了this.translate = -50 但是顶部的实际值应该是 50
        // if (this.topStatus === 'loading') {
        //   this.tempTopTranslate = 50
        // } else {
        //   this.tempTopTranslate = 0
        // }
      }

      this.configFooterPosition();
    },
    // 计算footer的位置
    configFooterPosition() {
      if (!this.scrollEventTarget) {
        return;
      }
      let bottom = -50;
      // topReached 是否到达顶部
      let topReached = this.scrollEventTarget.scrollTop === 0;

      // bottomReached 是否到达底部
      let bottomReached = this.checkBottomReached();

      // 检测上拉临界点
      let maxScrollTop =
        this.scrollEventTarget.scrollHeight -
        this.scrollEventTarget.clientHeight;

      // 当前scrollTop
      let currentScrollTop = this.scrollEventTarget.scrollTop;

      // 偏移scrolltop
      let offsetScrollTop = maxScrollTop - currentScrollTop;

      if (this.direction === "down") {
        // 下拉方向
        if (this.bottomStatus === "loading") {
          // 是否到达顶部
          if (topReached) {
          } else {
            // 是否到达了底部
            if (bottomReached) {
              // 下拉 达到底部，走的是touchmove 方法
              bottom = -50 - 1 * this.translate;
            } else {
              // 下拉 没达到底部，认为是在走 onScroll 方法
              console.log(
                "上拉 没达到底部，认为是在走 onScroll 方法",
                offsetScrollTop
              );
              bottom = -offsetScrollTop;
            }
          }
        } else {
          // 是否到达顶部
          if (topReached) {
          } else {
            // 是否到达了底部
            if (bottomReached) {
            } else {
              // 没达到底部，认为是在走 onScroll 方法
              bottom = -50;
            }
          }
        }
      } else {
        // 上拉方向
        if (this.bottomStatus === "loading") {
          // bottom = 0;
          // 是否到达顶部
          if (topReached) {
          } else {
            // 是否到达了底部
            if (bottomReached) {
              // 到达底部 证明其走 touchMove 方法
              bottom = -50 - 1 * this.translate;
            } else {
              // 没达到底部，认为是在走 onScroll 方法
              console.log(
                "上拉 没达到底部，认为是在走 onScroll 方法",
                offsetScrollTop
              );
              bottom = -offsetScrollTop;
            }
          }
        } else {
          // 是否到达顶部
          if (topReached) {
          } else {
            // 是否到达了底部
            if (bottomReached) {
              // 到达底部 证明其走 touchMove 方法
              bottom = -50 - 1 * this.translate;
            } else {
              // 没达到底部，认为是在走 onScroll 方法
              bottom = -50;
            }
          }
        }
      }
      console.log(
        "🔥 footer bottom is 👉",
        bottom,
        topReached,
        bottomReached,
        this.bottomReached
      );

      this.bottom = bottom;
    },

    // 手动结束下拉刷新
    onTopLoaded() {
      // 设置回弹动画，可能用户正在拖拽...
      this.topDropped = true;
      // 设置偏移量为 0
      this.translate = 0;

      this.iconRun = false;

      // fixed bug: 如果当前正在刷新，用户正在处于下拉过程，如果继续下拉一丢丢，会导致突然掉下来 影响用户体验
      // 解决：让触摸点 startY == currentY 然后算的偏差为 0
      this.startY = this.currentY;

      setTimeout(() => {
        this.topStatus = "pull";
        // 去掉回弹动画
        this.topDropped = false;
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
        this.bottomDropped = true;
        this.startY = this.currentY;
        setTimeout(() => {
          this.bottomDropped = false;
        }, 200);
      });
      // if (!this.bottomAllLoaded && !this.containerFilled) {
      //   this.fillContainer();
      // }
    },

    handleTouchStart(event) {
      this.touchStatus = "touchStart";
      this.startY = event.touches[0].clientY;
      this.startScrollTop = this.getScrollTop(this.scrollEventTarget);
      this.bottomReached = false;
      if (this.topStatus !== "loading") {
        this.topStatus = "pull";
      }
      this.topDropped = false;

      if (this.bottomStatus !== "loading") {
        this.bottomStatus = "pull";
      }
      this.bottomDropped = false;
    },

    handleTouchMove(event) {
      this.touchStatus = "touchMove";
      if (
        this.startY < this.$el.getBoundingClientRect().top &&
        this.startY > this.$el.getBoundingClientRect().bottom
      ) {
        return;
      }
      // 当前触摸点currentY
      this.currentY = event.touches[0].clientY;
      let distance = (this.currentY - this.startY) / this.distanceIndex;
      this.direction = distance > 0 ? "down" : "up";

      if (
        typeof this.topMethod === "function" &&
        this.direction === "down" &&
        this.getScrollTop(this.scrollEventTarget) === 0
      ) {
        event.preventDefault();
        event.stopPropagation();
        // 容错处理：从已经下滑一段距离向下拖拽，会导致 move 距离很大，当到达临界点的时候，突然掉下来 影响用户体验
        if (
          this.startScrollTop !== 0 &&
          this.getScrollTop(this.scrollEventTarget) === 0
        ) {
          this.startY = this.currentY;
          this.startScrollTop = 0;
          distance = 0;
        }
        // 偏移量
        let offset = 0;
        if (this.maxDistance > 0) {
          offset =
            distance <= this.maxDistance
              ? distance - this.startScrollTop
              : this.translate;
        } else {
          offset = distance - this.startScrollTop;
        }
        console.log("before down 👉", offset);
        if (offset < 0) {
          offset = 0;
        }
        if (this.topStatus !== "loading") {
          this.translate = this.tempBottomTranslate + offset;
          console.log("哈哈哈哈哈哈哈哈🔥");
          this.topStatus = this.translate >= this.topDistance ? "drop" : "pull";
        } else {
          // 下拉刷新中...和 上拉加载中...
          if (this.bottomStatus === "loading") {
            // 联动起来
            this.translate = this.tempBottomTranslate + offset;
            console.log(
              "++++++++🔥+++++++++++",
              offset,
              this.tempBottomTranslate
            );
          } else {
            // loading 状态下 是从loading位置 继续增加offset
            // loading => pull 延迟200ms 可能是执行了 onTopLoaded 设置了 this.translate = 0
            console.log("++++++++🔥🔥+++++++++++", offset);
            if (this.translate * 1 === 0) {
              this.translate = offset;
            } else {
              // - this.tempTopTranslate
              this.translate = 50 + offset;
            }
          }
        }
      }

      // 上拉方向
      if (this.direction === "up") {
        this.bottomReached = this.bottomReached || this.checkBottomReached();
      }

      // console.log(
      //   'header.top 00 ',
      //   this.loadingHeader.getBoundingClientRect().bottom
      // )
      // console.log('header.top || ', this.$el.getBoundingClientRect().top)
      // console.log('🔥 是否可见 👉', this.checkHeaderVisible())

      if (
        typeof this.bottomMethod === "function" &&
        this.direction === "up" &&
        this.bottomReached &&
        !this.bottomAllLoaded
      ) {
        event.preventDefault();
        event.stopPropagation();
        // 检测上拉临界点
        let upCriP =
          this.scrollEventTarget.scrollHeight -
          this.scrollEventTarget.clientHeight;
        // 这里需要容个错
        if (
          this.scrollEventTarget.scrollTop === upCriP &&
          this.startScrollTop !== upCriP &&
          !this.bottomPoint
        ) {
          // 赋值
          // this.startScrollTop = upCriP;
          // // 重新设置 startY
          // this.startY = this.currentY;
          // // distance 值赋值为0
          // distance = 0;
          // console.log("xxxxxxxxxx", upCriP, this.startScrollTop);
          // this.bottomPoint = true;
        }
        let offset = 0;
        if (this.maxDistance > 0) {
          offset =
            Math.abs(distance) <= this.maxDistance
              ? this.getScrollTop(this.scrollEventTarget) -
                this.startScrollTop +
                distance
              : this.translate;
        } else {
          offset =
            this.getScrollTop(this.scrollEventTarget) -
            this.startScrollTop +
            distance;
        }
        console.log("before up 👉", offset);
        if (offset > 0) {
          offset = 0;
        }
        if (this.bottomStatus !== "loading") {
          // 非上拉加载中... && 下拉刷新中...
          if (this.topStatus === "loading") {
            this.translate = 50 - this.tempTopTranslate + offset;
          } else {
            this.translate = offset;
          }
          // 去判断
          this.bottomStatus =
            -this.translate >= this.bottomDistance ? "drop" : "pull";
        } else {
          if (this.topStatus === "loading") {
            // 联动起来
            this.translate = this.tempTopTranslate + offset;
            console.log("麻辣隔壁....", this.translate);
          } else {
            // loading 状态下 是从loading位置 继续增加offset
            // loading => pull 延迟200ms 可能是执行了 onTopLoaded 设置了 this.translate = 0
            if (this.translate === 0) {
              this.translate = offset;
            } else {
              this.translate = -50 + offset;
            }
            console.log("马拉个币....", this.translate);
          }
        }
      }
      this.distance = distance;
      console.log(
        "🔥 after translate is 👉",
        this.translate,
        this.direction,
        this.distance,
        this.startScrollTop,
        this.scrollEventTarget.scrollTop,
        this.bottomReached
      );
      console.log(
        "🔥滚动高度 👉",
        this.scrollEventTarget.scrollHeight,
        this.scrollEventTarget.clientHeight,
        this.scrollEventTarget.scrollTop
      );
      this.$emit("translate-change", this.translate);

      this.configFooterPosition();
    },
    // 拖拽结束
    handleTouchEnd() {
      this.touchStatus = "touchEnd";
      // 下拉刷新中...
      // 如果正在下拉刷新 松手后回到之前的下拉的逻辑
      if (
        this.direction === "down" &&
        this.getScrollTop(this.scrollEventTarget) === 0 &&
        this.translate > 0 &&
        this.topStatus === "loading"
      ) {
        this.topDropped = true;
        // 回滚到50
        this.translate = 50;
        // 切换到0
        this.tempTopTranslate = 50;
      }
      // 非下拉刷新中...
      if (
        this.direction === "down" &&
        this.getScrollTop(this.scrollEventTarget) === 0 &&
        this.translate > 0 &&
        this.topStatus !== "loading"
      ) {
        this.topDropped = true;
        if (this.topStatus === "drop") {
          this.translate = "50";
          this.tempTopTranslate = 50;
          this.topStatus = "loading";
          this.iconRun = true;
          this.topMethod();
        } else {
          this.translate = "0";
          this.topStatus = "pull";
          this.tempTopTranslate = 0;
        }
      }

      // 如果是 loading 状态 也不要回滚 必须让其 保持
      if (
        this.direction === "up" &&
        this.bottomReached &&
        this.translate < 0 &&
        this.bottomStatus === "loading"
      ) {
        this.bottomDropped = true;
        this.bottomReached = false;
        // 回滚到-50
        this.translate = -50;
      }
      // 如果是 loading 状态 也不要回滚 必须让其 保持
      if (
        this.direction === "up" &&
        this.bottomReached &&
        this.translate < 0 &&
        this.bottomStatus !== "loading"
      ) {
        this.bottomDropped = true;
        this.bottomReached = false;
        if (this.bottomStatus === "drop") {
          this.translate = "-50";
          this.tempBottomTranslate = -50;
          this.bottomStatus = "loading";
          this.bottomMethod();
        } else {
          this.tempBottomTranslate = 0;
          // 如果正在下拉刷新 回到之前下拉刷新的状态
          if (this.topStatus === "loading") {
          }
          // 这里还是必须设置为0 让其停于底部，
          this.translate = 0;
          // 上拉控件为拉取状态
          this.bottomStatus = "pull";
        }
      }
      this.$emit("translate-change", this.translate);
      this.direction = "";

      // console.log(
      //   '松手header.top 00 ',
      //   this.loadingHeader.getBoundingClientRect().bottom
      // )
      // console.log('松手header.top || ', this.$el.getBoundingClientRect().top)
      // console.log('松手object', this.getScrollTop(this.scrollEventTarget))

      console.log(
        "🔥 松手后的tranlate 👉",
        this.translate,
        this.tempTopTranslate
      );
      console.log(
        "🔥 松手后滚动高度 👉",
        this.scrollEventTarget.scrollHeight,
        this.scrollEventTarget.clientHeight,
        this.scrollEventTarget.scrollTop
      );
      this.configFooterPosition();
      this.bottomPoint = false;
    },
    getScrollEventTarget(element) {
      return this.$refs.scroller;
    },

    getScrollTop(element) {
      return element.scrollTop;
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

      this.loadingHeader = this.$slots.header || this.$refs.header;
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
        let scrollEventTarget = this.scrollEventTarget;
        let a = scrollEventTarget.scrollTop + scrollEventTarget.clientHeight;
        let b = scrollEventTarget.scrollHeight;
        console.log("🔥 checkBottomReached is 👉", a >= b);
        return a >= b;
      }
    },

    // 检查header是否可见
    checkHeaderVisible() {
      return (
        this.loadingHeader.getBoundingClientRect().bottom -
          this.$el.getBoundingClientRect().top >
        0
      );
    }
  },

  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.wc-loadmore__wrapper {
  overflow: hidden;
  position: relative;
  height: 100%;
}

.is-dropped {
  transition: 0.2s;
}

.wc-loadmore-bottom {
  text-align: center;
  height: 50px;
  line-height: 50px;
  color: #999;
}

.wc-loadmore-bottom {
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
.wc-loadmore {
  overflow: scroll;
  position: relative;
  height: 100%;
  .wc-loadmore-content {
    position: static !important;
  }

  .wc-loadmore-top {
    margin-top: -50px;
    height: 50px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
}
</style>
