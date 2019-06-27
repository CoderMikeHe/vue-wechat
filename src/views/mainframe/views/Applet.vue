<template>
  <div class="applet__box">
    <div class="applet__title">小程序</div>
    <div class="applet__scroll"
         ref="scrollView"
         @touchstart.stop="handleTouchStart"
         @touchmove.stop="handleTouchMove"
         @touchend.stop="handleTouchEnd"
         @touchcancel.stop="handleTouchEnd">
      <div class="applet__items"
           :style="transform"
           :class="{ 'dropped-animation': topDropped || bottomDropped }">
        <!-- 搜索框 -->
        <div class="search-bar">
          <label class="weui-search-bar__label"
                 id="searchText">
            <i class="weui-icon-search"></i>
            <span>搜索小程序</span>
          </label>
        </div>
        <div class="applet__usage">
          <div class="usage__item local">
            <div class="usage">
              <div class="usage-title">最近使用</div>
              <div class="usage-pic">
                <img src="@/assets/images/mainframe/glory_of_kings.png"
                     alt="" />
              </div>
              <div class="usage-info">王者荣耀</div>
            </div>
            <div class="usage">
              <div class="usage-title"></div>
              <div class="usage-pic">
                <img src="@/assets/images/mainframe/peace_elite.png"
                     alt="" />
              </div>
              <div class="usage-info">和平精英</div>
            </div>
            <div class="usage">
              <div class="usage-title"></div>
              <div class="usage-pic">
                <img src="@/assets/images/mainframe/tencent_sports.png"
                     alt="" />
              </div>
              <div class="usage-info">腾讯体育+</div>
            </div>
            <div class="usage">
              <div class="usage-title"></div>
              <div class="usage-pic">
                <img src="@/assets/images/mainframe/WAMainFrame_More_50x50.png"
                     alt="" />
              </div>
              <div class="usage-info"></div>
            </div>
          </div>
          <div class="usage__item all">
            <div class="usage">
              <div class="usage-title">我的小程序</div>
              <div class="usage-pic">
                <img src="@/assets/images/mainframe/glory_of_kings.png"
                     alt="" />
              </div>
              <div class="usage-info">王者荣耀</div>
            </div>
            <div class="usage">
              <div class="usage-title"></div>
              <div class="usage-pic">
                <img src="@/assets/images/mainframe/peace_elite.png"
                     alt="" />
              </div>
              <div class="usage-info">和平精英</div>
            </div>
            <div class="usage">
              <div class="usage-title"></div>
              <div class="usage-pic">
                <img src="@/assets/images/mainframe/tencent_sports.png"
                     alt="" />
              </div>
              <div class="usage-info">腾讯体育+</div>
            </div>
            <div class="usage"></div>
          </div>
          <div class="usage__footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'applet',
  data() {
    return {
      // 起始点y
      startY: 0,
      topDropped: false,
      // 移动方向 up：上拉 down：下拉
      direction: '',
      // 滚动的元素
      scrollView: null,
      // 保存向下滑动的距离
      translate: 0,
      // 刚开始滑动时的滚动条位置
      startScrollTop: 0,
      // 手指下滑
      isDown: false,
      // 前一个点
      previousY: 0,
      // 是否到达底部
      bottomReached: false,
      // 底部控件状态
      bottomStatus: '',
      // 底部控件是否处于 drop状态
      bottomDropped: false,
      // 上拉临界点
      bottomDistance: 30
    }
  },
  mounted() {
    console.log('老子重生了🔥')
    // scrollView
    this.scrollView = this.$refs.scrollView
    // 默认隐藏搜索栏
    this.scrollView.scrollTop = 56
  },
  methods: {
    // 开始拖拽
    handleTouchStart(event) {
      console.log(' applet touch start')
      this.translate = 0
      // 获得开始Y坐标
      this.startY = event.targetTouches[0].clientY
      this.previousY = this.startY
      // 记录一下滚动条位置
      this.startScrollTop = this.scrollView.scrollTop
      this.topDropped = false
      // 上拉
      this.bottomReached = false
      if (this.bottomStatus !== 'loading') {
        this.bottomStatus = 'pull'
        this.bottomDropped = false
      }
    },
    // 正在拖拽
    handleTouchMove(event) {
      console.log(' applet touch move')
      // 滚动条当前位置
      let currentScrollTop = this.scrollView.scrollTop
      // 当前触摸点Y
      let currentY = event.targetTouches[0].clientY
      // 偏移距离 5为阻尼系数
      let distance = (currentY - this.startY) / 5
      // 上拉or下拉
      this.direction = distance > 0 ? 'down' : 'up'
      // 手指下滑还是上滑
      this.isDown = currentY - this.previousY > 0
      // 记录上一个点
      this.previousY = currentY
      // 判断处理
      if (currentScrollTop === 0 && this.direction === 'down') {
        // 阻止默认事件，在微信浏览器中尤为有用，至于为什么，你去试就知道了。
        // 组织掉 onscroll 默认事件
        event.preventDefault()
        event.stopPropagation()
        // 容错处理：从已经下滑一段距离向下拖拽，会导致 move 距离很大，当到达临界点的时候，突然掉下来 影响用户体验
        if (this.startScrollTop !== 0 && currentScrollTop === 0) {
          this.startY = currentY
          this.startScrollTop = 0
          distance = 0
        }
        // 不管下拉刷新状态，这个distance长期有效
        this.translate = distance
      }

      // 上拉
      if (this.direction === 'up') {
        // 检测上拉临界点
        let upCriP = this.scrollView.scrollHeight - this.scrollView.clientHeight
        // 这里需要容个错
        if (currentScrollTop === upCriP && this.startScrollTop !== upCriP) {
          // 赋值
          this.startScrollTop = upCriP
          // 重新设置 startY
          this.startY = currentY
          // distance 值赋值为0
          distance = 0
          this.currentY = currentY
        }
        // 检查是否到达过底部（PS：微信的逻辑：只要上拉刷新控件完全显示了，就认为可以加载更多）
        this.bottomReached = this.checkBottomReached()
        if (this.bottomReached) {
          // 主要是阻止 OnScroll事件
          event.preventDefault()
          event.stopPropagation()
          this.translate = distance
          this.bottomStatus =
            -this.translate >= this.bottomDistance ? 'drop' : 'pull'
        }
      }
    },
    // 结束拖拽
    handleTouchEnd() {
      console.log(' applet touch end')
      // 设置偏移
      let top = this.isDown || this.direction === 'down' ? 0 : 56
      this.scrollView.scrollTo({
        top: top,
        behavior: 'smooth'
      })

      if (this.direction === 'down') {
        this.topDropped = true
      }

      // 只要到达了上拉控件到达了底部，就给我刷新
      if (
        this.direction === 'up' &&
        this.bottomReached &&
        this.bottomStatus !== 'loading' &&
        this.translate < 0
      ) {
        this.bottomDropped = true
        this.bottomReached = false
        if (this.bottomStatus === 'drop') {
          this.bottomStatus = 'pull'
          this.bottomMethod()
        } else {
          this.bottomStatus = 'pull'
        }
      }
      // 清空
      this.direction = ''
      // 归位
      this.translate = 0
    },
    // 🔥检查是否滚动到底部
    // - https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollHeight
    checkBottomReached() {
      return (
        this.scrollView.scrollTop + this.scrollView.clientHeight >=
        this.scrollView.scrollHeight
      )
    },
    bottomMethod() {
      console.log('上拉加载')
      this.$emit('on-load-more')
    }
  },

  computed: {
    // 滚动列表的动态样式
    transform() {
      return { transform: `translate3d(0, ${this.translate}px, 0)` }
    }
  }
}
</script>

<style scoped>
.applet__box {
  position: relative;
  width: 100%;
  padding-top: 44px;
}

.applet__title {
  height: 44px;
  line-height: 44px;
  color: white;
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}

.applet__scroll {
  position: relative;
  height: 450px;
  overflow-x: hidden;
  overflow-y: auto;
}

/* 🔥 隐藏滚动条 */
/* 
- [纯css，div隐藏滚动条，保留鼠标滚动效果。](https://blog.csdn.net/liusaint1992/article/details/51277751)
- [纯CSS实现隐藏滚动条但仍具有滚动的效果](https://blog.csdn.net/huangpb123/article/details/79346163)
- [CSS 实现隐藏滚动条同时又可以滚动](https://blog.csdn.net/u010537398/article/details/78407064)
 */
.applet__scroll::-webkit-scrollbar {
  display: none;
}

.applet__items {
  padding: 16px 37px 0;
}

.search-bar {
  position: relative;
  height: 40px;
  line-height: 40px;
}

.weui-search-bar__label {
  line-height: 40px;
  background-color: rgba(110, 109, 124, 1);
}

.weui-icon-search {
  font-size: 25px;
}

.weui-search-bar__label span {
  font-size: 17px;
}

.applet__usage {
  margin-top: 33px;
}

.usage__item {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.usage__item.local {
  margin-top: 30px;
}
.usage__item.all {
  margin-top: 40px;
}
.usage__item .usage {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}

.usage-title {
  line-height: 14px;
  height: 14px;
  color: #88889e;
  text-align: center;
  margin-bottom: 17px;
}
.usage-pic img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: block;
  margin: 0 auto;
}

.usage-info {
  margin-top: 10px;
  line-height: 16px;
  height: 16px;
  color: #eaeaec;
  text-align: center;
}

.usage__footer {
  height: 163px;
}

.dropped-animation {
  transition: 0.25s;
}
</style>
