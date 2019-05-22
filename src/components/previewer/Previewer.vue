// 图片浏览器 // - []()
<template>
  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <!-- Background of PhotoSwipe. 
		 It's a separate element as animating opacity is faster than rgba(). -->
    <div class="pswp__bg"></div>
    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">
      <!-- Container that holds slides. 
			PhotoSwipe keeps only 3 of them in the DOM to save memory.
			Don't modify these 3 pswp__item elements, data is added later on. -->
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>

      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <!--  Controls are self-explanatory. Order can be changed. -->

          <div class="pswp__counter"></div>

          <button
            class="pswp__button pswp__button--close"
            title="Close (Esc)"
          ></button>

          <button
            class="pswp__button pswp__button--share"
            title="Share"
          ></button>

          <button
            class="pswp__button pswp__button--fs"
            title="Toggle fullscreen"
          ></button>

          <button
            class="pswp__button pswp__button--zoom"
            title="Zoom in/out"
          ></button>

          <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
          <!-- element will get class pswp__preloader--active when preloader is running -->
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"
        >
          <div class="pswp__share-tooltip"></div>
        </div>

        <button
          class="pswp__button pswp__button--arrow--left"
          title="Previous (arrow left)"
        ></button>

        <button
          class="pswp__button pswp__button--arrow--right"
          title="Next (arrow right)"
        ></button>

        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>
      </div>
      <!-- 指示器 -->
      <div
        class="vux-indicator vux-indicator-center"
        v-show="showDots && length > 1"
      >
        <a href="javascript:void(0)" v-for="key in length" :key="key">
          <i class="vux-icon-dot" :class="{ active: key - 1 === current }"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import PhotoSwipe from "photoswipe/dist/photoswipe";
import UI from "photoswipe/dist/photoswipe-ui-default";
import objectAssign from "object-assign";

export default {
  name: "previewer",
  data() {
    return {
      current: 0
    };
  },
  computed: {
    imgs() {
      return this.list.map(one => {
        if (!one.msrc) {
          one.msrc = one.src;
        }
        if (typeof one.w === "undefined") {
          one.w = 0;
          one.h = 0;
        }
        return one;
      });
    },
    length() {
      return this.imgs.length;
    }
  },
  watch: {
    imgs(newVal, oldVal) {
      if (!this.photoswipe) {
        return;
      }
      if (newVal.length && newVal.length - oldVal.length === -1) {
        const index = this.photoswipe.getCurrentIndex();
        this.photoswipe.invalidateCurrItems();
        this.photoswipe.items.splice(index, 1);
        let goToIndex = index;
        if (goToIndex > this.photoswipe.items.length - 1) {
          goToIndex = 0;
        }
        this.photoswipe.goTo(goToIndex);
        this.photoswipe.updateSize(true);
        this.photoswipe.ui.update();
      } else if (!newVal.length) {
        this.close();
      }
    }
  },
  methods: {
    init(index) {
      this.current = index;
      const self = this;
      const showItem = this.imgs[index];
      if (!showItem.w || !showItem.h || showItem.w < 5 || showItem.h < 5) {
        const img = new Image();
        img.onload = function() {
          showItem.w = this.width;
          showItem.h = this.height;
          self.doInit(index);
        };
        img.src = showItem.src;
      } else {
        this.doInit(index);
      }
    },
    doInit(index) {
      const self = this;
      let options = objectAssign(
        {
          history: false,
          shareEl: false,
          counterEl: false,
          arrowEl: false,
          closeEl: false,
          captionEl: false,
          fullscreenEl: false,
          tapToClose: true,
          zoomEl: false,
          index: index
        },
        this.options
      );
      this.photoswipe = new PhotoSwipe(this.$el, UI, this.imgs, options);

      this.photoswipe.listen("gettingData", function(index, item) {
        console.log("gettingData");
        if (!item.w || !item.h || item.w < 1 || item.h < 1) {
          const img = new Image();
          img.onload = function() {
            item.w = this.width;
            item.h = this.height;
            self.photoswipe.updateSize(true);
          };
          img.src = item.src;
        }
      });

      this.photoswipe.init();

      this.photoswipe.listen("close", () => {
        this.$emit("on-close");
      });
      this.photoswipe.listen("afterChange", () => {
        let index = this.photoswipe.getCurrentIndex();
        this.current = index;
        this.$emit("on-index-change", {
          currentIndex: index
        });
      });
    },
    show(index) {
      this.init(index);
    },
    getCurrentIndex() {
      if (this.photoswipe) {
        return this.photoswipe.getCurrentIndex();
      }
    },
    close() {
      this.photoswipe && this.photoswipe.close();
    },
    goTo(index) {
      this.photoswipe && this.photoswipe.goTo(index);
    },
    prev() {
      this.photoswipe && this.photoswipe.prev();
    },
    next() {
      this.photoswipe && this.photoswipe.next();
    }
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    showDots: {
      type: Boolean,
      default: true
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style src="photoswipe/dist/photoswipe.css"></style>
<style src="photoswipe/dist/default-skin/default-skin.css"></style>
<style scoped>
.vux-indicator {
  position: absolute;
  right: 15px;
  bottom: 10px;
}

.vux-indicator-center {
  right: 50%;
  -webkit-transform: translateX(50%);
  transform: translateX(50%);
}

.vux-indicator > a {
  float: left;
  margin-left: 6px;
}

.vux-indicator > a > .vux-icon-dot {
  display: inline-block;
  vertical-align: middle;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: gray;
}

.vux-indicator > a > .vux-icon-dot.active {
  background-color: #fff;
}
</style>
