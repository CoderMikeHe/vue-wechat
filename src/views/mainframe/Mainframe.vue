<template>
  <div
    class="_full-content _content-padding-bottom49"
    :class="{ '_content-padding-top44': !isRelative }"
    ref="scrollView"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    @touchcancel="handleTouchEnd"
    @scroll.passive="onScroll"
  >
    <!-- 小程序模块 -->
    <div class="applet__wrapper" :style="appletWrapperStyle">
      <div class="applet__content" :style="appletContentStyle" v-if="show">
        <Applet ref="applet" @on-load-more="hiddenApplet"></Applet>
      </div>
    </div>
    <!-- 顶部下拉点模块 -->
    <div class="dropped__wrapper" :style="droppedWrapperStyle">
      <div class="dropped__dots" :style="droppedDotsStyle">
        <div class="dot" :style="leftDotStyle"></div>
        <div class="dot" :style="centerDotStyle"></div>
        <div class="dot" :style="rightDotStyle"></div>
      </div>
    </div>
    <!-- PS: 因为用了 transform 会导致 fixed失效 -->
    <div
      class="content__wrapper"
      :style="transform"
      :class="{ 'dropped-animation': topDropped }"
    >
      <!-- topView -->
      <div class="topView" :style="topViewStyle"></div>
      <!-- 导航栏 -->
      <NavigationBar
        :right-item="addItem"
        :title="navTitle"
        @right-click="rightItemDidClicked"
        :class="{ relative: isRelative }"
      ></NavigationBar>
      <div class="content">
        <div class="weui-search-bar" id="searchBar">
          <form class="weui-search-bar__form">
            <div class="weui-search-bar__box">
              <i class="weui-icon-search"></i>
              <input
                type="search"
                class="weui-search-bar__input"
                id="searchInput"
                placeholder="搜索"
                required
              />
              <a
                href="javascript:"
                class="weui-icon-clear"
                id="searchClear"
              ></a>
            </div>
            <label class="weui-search-bar__label" id="searchText">
              <i class="weui-icon-search"></i>
              <span>搜索</span>
            </label>
          </form>
        </div>
        <div
          class="content__item _mh-tap-highlight"
          v-for="(item, index) in dataSource"
          :key="index"
          @click="skip2Chat(index)"
        >
          <div class="item__hd">
            <!-- 头像 -->
            <Avatars :srcs="item.avatars"></Avatars>
            <!-- 红点 -->
            <span
              v-show="item.badge && item.badge.show"
              :class="{ 'weui-badge_dot': item.badge && item.badge.dot }"
              class="weui-badge"
              >{{ item.badge ? item.badge.text : "" }}</span
            >
          </div>
          <div class="item__bd">
            <div class="item__top">
              <div class="item__name">{{ item.screen_name }}</div>
              <div class="item__time">{{ item.createdAt }}</div>
            </div>
            <div class="item__bottom">
              <div class="item__text">{{ item.text }}</div>
              <!-- <div class="item__icon">2019/6/6</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- mask -->
    <div
      class="mh-mainframe__mask"
      v-if="showMenu"
      @click.stop="showMenu = false"
      @touchstart.stop
      @touchmove.stop
      @touchend.stop
      @touchcancel.stop
    ></div>
    <ul
      class="mh-more__menu"
      :class="[showMenu ? 'mh-more__menu-open' : 'mh-more__menu-close']"
      @click.stop="showMenu = false"
    >
      <li @click="menuItemDidClicked(0)">
        <div>
          <span
            class="iconfont icon-mainframe-message mh-more__menu-item-icon"
          ></span
          >发起群聊
        </div>
      </li>
      <router-link tag="li" to="/contacts/add-friends">
        <div>
          <span
            class="iconfont icon-mainframe-add-friend mh-more__menu-item-icon"
          ></span
          >添加朋友
        </div>
      </router-link>
      <li @click="menuItemDidClicked(2)">
        <div>
          <span
            class="iconfont icon-mainframe-scan mh-more__menu-item-icon"
          ></span
          >扫一扫
        </div>
      </li>
      <li @click="menuItemDidClicked(3)">
        <div>
          <span
            class="iconfont icon-mainframe-pay mh-more__menu-item-icon"
          ></span
          >收付款
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// https://blog.csdn.net/qq_33236453/article/details/79110485
// https://www.cnblogs.com/axl234/p/5899952.html
import MHBarButtonItem, { addItem } from "../../assets/js/MHBarButtonItem.js";
// 该模块的工具类
import ViewModel from "./js/mainframe";
// Avatars
import Avatars from "./views/Avatars";
// Applet
import Applet from "./views/Applet";
// Vuex
import { mapState, mapMutations } from "vuex";
// helper
import BadgeHelper from "../../assets/js/badge/badgeHelper";
// 小程序渐变色
const GradientColor = `linear-gradient(to bottom right,rgba(39, 37, 57, 1),rgba(56, 53, 76, 1),rgba(56, 53, 76, 0.8),rgba(68, 64, 90, 0.7),rgba(68, 64, 90, 0.5),rgba(86, 81, 110, 0.2),rgba(86, 81, 110, 0.1))`;

export default {
  name: "mainframe",
  components: {
    Avatars,
    Applet
  },
  data() {
    return {
      // 添加按钮
      addItem: addItem,
      showMenu: false,
      dataSource: [],
      // 默认是相对布局
      isRelative: true,
      startY: 0,
      // 下拉刷新状态
      topStatus: "",
      topDropped: false,
      // 移动方向 up：上拉 down：下拉
      direction: "",
      // 滚动的元素
      scrollView: null,
      // tabBar
      tabBar: null,
      // 保存向下滑动的距离
      translate: 0,
      // 刚开始滑动时的滚动条位置
      startScrollTop: 0,
      // 下拉刷新临界点 === stage2Distance
      topDistance: 90,
      // 阶段I临界点
      stage1Distance: 60,
      // 阶段II临界点
      stage2Distance: 90,
      // 阶段III临界点
      stage3Distance: 130,
      // 阶段IV临界点
      stage4Distance: 180,
      scrollTop: 0,
      // 展示小程序模块
      showApplet: false,
      // show
      show: false,
      // 是否停止惯性运动 (场景：当显示出来小程序模块，向上猛的拖拽，会导致页面有惯性向上的滚动)
      stopInertia: false
    };
  },
  created() {
    console.log("我被嗲啊啊 ");
    this.fetchRemoteData();
  },
  mounted() {
    // scrollView
    this.scrollView = this.$refs.scrollView;
    // 获取tabBar
    this.tabBar = document.getElementById("tabBar");
  },
  activated() {
    console.log("Mainframe -- ");
  },
  methods: {
    // vuex
    ...mapMutations("badge", ["changeMainframe"]),
    // 获取远程数据
    fetchRemoteData() {
      // 获取数据源
      this.dataSource = ViewModel.fetchRemoteData();
      // 处理Badge
      let badge = {};
      let value = 0;
      this.dataSource.forEach(item => {
        // item 必须有值
        if (item.badge && item.badge.type === "digit") {
          value += item.badge.value;
        }
      });
      badge.type = "digit";
      badge.value = value;
      badge.text = value + "";
      badge.show = value > 0;
      badge.dot = false;

      // 存储到Vux
      this.changeMainframe(badge);
    },
    skip2Chat(idx) {
      let item = this.dataSource[idx];
      let mainframe = Object.assign({}, this.mainframe);
      if (item.badge) {
        // 处理badge数据
        if (item.badge.type === "digit") {
          let value = mainframe.value - item.badge.value;
          mainframe.value = value;

          // 重新生成一个临时的
          let badge = BadgeHelper(mainframe);
          // 存储到Vuex
          this.changeMainframe(badge);
        }
        // 清空badge
        item.badge = null;
      }
      // 跳转到chat
      this.$router.push({
        name: "ChatMessage",
        params: {
          title: item.screen_name
        }
      });
    },
    // 导航栏事件处理
    rightItemDidClicked(index) {
      this.showMenu = !this.showMenu;
      // this.$router.push("/contacts/contact-info");

      // this.$router.push("/test");
    },
    // 菜单项事件
    menuItemDidClicked(index) {
      console.log(index);
      switch (index) {
      case 0: // 发起群聊
        this.$router.push("/test");
        break;
      case 1: // 添加朋友
        // this.$router.push("/test");
        // console.log("mlgb");
        break;
      case 2: // 扫一扫
        break;
      case 3: // 收付款
        this.$router.push("/test");
        break;

      default:
        break;
      }
    },

    // 显示小程序模块
    topMethod() {
      console.log("我被出发了");
      // 隐藏tabBar
      this.tabBar.style.display = "none";
      this.showApplet = true;
    },
    hiddenApplet() {
      console.log("我hiddenApplet");
      this.showApplet = false;
      this.tabBar.style.display = "flex";
      this.topDropped = false;
      // this.scrollView.scrollTop = 0;
      this.isRelative = true;
      this.show = false;
      this.scrollView.scrollTop = 0;
      this.topStatus = "pull";
      // 停止惯性运动
      this.stopInertia = true;
    },

    // 开始拖拽
    handleTouchStart(event) {
      console.log("handleTouchStart");
      // 获得开始Y坐标
      this.startY = event.targetTouches[0].clientY;
      // 滑动距离归0
      this.translate = 0;
      // 刚触摸，则允许惯性运动
      this.stopInertia = false;
      // 记录一下滚动条位置
      this.startScrollTop = this.scrollView.scrollTop;
      if (this.topStatus !== "loading") {
        this.topStatus = "pull";
        this.topDropped = false;
      }
    },
    // 正在拖拽
    handleTouchMove(event) {
      console.log("handleTouchMove");
      // 滚动条当前位置
      let currentScrollTop = this.scrollView.scrollTop;
      // 当前触摸点Y
      let currentY = event.targetTouches[0].clientY;
      // 偏移距离 3是阻尼系数
      let distance = (currentY - this.startY) / 3;
      // 上拉or下拉
      this.direction = distance > 0 ? "down" : "up";
      // 判断处理
      if (currentScrollTop === 0 && this.direction === "down") {
        // 阻止默认事件，在微信浏览器中尤为有用，至于为什么，你去试就知道了。
        // 组织掉 onscroll 默认事件
        event.preventDefault();
        event.stopPropagation();
        // 正在加载中 啥都不用干
        if (this.topStatus === "loading") {
          return;
        }
        // 容错处理：从已经下滑一段距离向下拖拽，会导致 move 距离很大，当到达临界点的时候，突然掉下来 影响用户体验
        if (this.startScrollTop !== 0 && currentScrollTop === 0) {
          this.startY = currentY;
          this.startScrollTop = 0;
          distance = 0;
        }
        // 不管下拉刷新状态，这个distance长期有效
        this.show = distance > this.stage2Distance;
        this.translate =
          distance <= this.stage4Distance ? distance : this.translate;
        this.topStatus = this.translate >= this.topDistance ? "drop" : "pull";
      }
    },
    // 结束拖拽
    handleTouchEnd(event) {
      console.log("handleTouchEnd " + this.direction);
      if (this.direction.length !== 0 && this.topStatus === "loading") {
        this.topDropped = true;
        this.hiddenApplet();
        event.preventDefault();
        event.stopPropagation();
        console.log("睡觉奥加手机啊");
      }
      let scrollTop = this.scrollView.scrollTop;
      if (
        this.direction === "down" &&
        scrollTop === 0 &&
        this.topStatus !== "loading" &&
        this.translate > 0
      ) {
        this.topDropped = true;
        if (this.topStatus === "drop") {
          this.show = true;
          this.topStatus = "loading";
          this.topMethod();
        } else {
          this.topStatus = "pull";
        }
      }
      // 清空
      this.direction = "";
      this.translate = 0;
    },
    onScroll(event) {
      let scrollTop = this.scrollView.scrollTop;
      // 加载中
      this.scrollTop = scrollTop;
      console.log("onscroll -- " + this.scrollTop + this.stopInertia);
      if (this.topStatus === "loading") {
        // 这里重新设置translate : 主要目的是让三个灰色点重走业务逻辑
        let topHeight = this.screenHeight - this.stage4Distance - 44 - 44;
        if (scrollTop >= topHeight) {
          let translate = this.stage4Distance + 44 - (scrollTop - topHeight);
          // 容错处理
          this.translate = translate <= 0 ? 0 : translate;
        } else {
          this.translate = topHeight;
        }
        // 修改导航栏 的定位
        this.isRelative = scrollTop < this.screenHeight - 44;
      } else {
        // 非加载
        if (this.stopInertia) {
          // 如果停止惯性运动，则设置滚动为0 PS：会有点抖动
          this.scrollView.scrollTop = 0;
        } else {
          this.isRelative = scrollTop <= 0;
        }
      }
    }
  },
  computed: {
    // Vuex
    ...mapState({
      mainframe: state => state.badge.mainframe
    }),
    // 导航栏标题
    navTitle() {
      let value = this.mainframe.value;
      let title = value > 0 ? `(${value})` : "";
      return "微信" + title;
    },
    // 获取手机屏幕的宽
    screenHeight() {
      return document.documentElement.clientHeight * 1;
    },
    // topView样式
    topViewStyle() {
      let height =
        this.topStatus === "loading" ? this.screenHeight - 44 + "px" : "0";
      return {
        height: height,
        transition: "0.25s"
      };
    },
    // 滚动列表的动态样式
    transform() {
      // 默认是空，避免影响子元素的fixed布局
      let transform = null;
      if (this.isRelative) {
        // 非loading状态，才可以设置偏移
        if (this.topStatus !== "loading") {
          transform = `translate3d(0, ${this.translate}px, 0)`;
        }
      }
      // loading 状态下 设置顶部偏移量 <这也是一个方案>
      //  let marginTop =
      //   this.topStatus === "loading" ? this.screenHeight - 44 + "px" : "0";
      return {
        transform: transform
        // marginTop: marginTop
      };
    },
    // 小程序容器样式
    appletWrapperStyle() {
      let scrollTop = this.scrollTop;
      // 临界点
      let topHeight = this.screenHeight - 44 - this.stage4Distance;
      console.log("---- ==== " + scrollTop + " topHeight " + topHeight);
      let opacity = 1 - scrollTop / topHeight;
      if (this.topStatus === "loading") {
        let height = "200%";
        return {
          height: height,
          opacity: opacity < 0 ? 0 : opacity,
          backgroundImage: GradientColor,
          transition: "0.25s"
        };
      } else {
        return {
          height: this.showApplet ? "200%" : this.translate + "px",
          opacity: 1
        };
      }
    },
    appletContentStyle() {
      if (this.topStatus === "loading") {
        let scaleX = 1;
        let scaleY = 1;
        let opacity = 1;
        return {
          opacity: opacity,
          transformOrigin: "50% 0 0",
          transform: `scale(${scaleX}, ${scaleY})`,
          transition: "0.25s"
        };
      } else {
        if (this.translate > this.stage3Distance) {
          // 处于第三阶段
          let step = 0.5 / (this.stage4Distance - this.stage3Distance);
          let opacity = 0 + step * (this.translate - this.stage3Distance);
          return {
            opacity: opacity
          };
        } else {
          return { opacity: 0 };
        }
      }
    },
    // 下拽容器样式
    droppedWrapperStyle() {
      let opacity = 1;
      if (this.translate > this.stage3Distance) {
        // 第四阶段 1 - 0.2
        let step = 0.8 / (this.stage4Distance - this.stage3Distance);
        opacity = 1 - step * (this.translate - this.stage3Distance);
      }
      return {
        height: this.translate + "px",
        opacity: opacity,
        top: this.topStatus === "loading" ? this.scrollTop + "px" : "0px"
      };
    },
    // 点容器样式
    droppedDotsStyle() {
      let top = (this.translate + 44 + 10 - 6) * 0.5;
      return { top: top + "px" };
    },
    // 左边点样式 阶段I无需考虑样式，其他阶段只做平移
    leftDotStyle() {
      let translate = 0;
      let opacity = 0;
      if (this.translate > this.stage3Distance) {
        // 阶段III: 平移到最左侧 -16
        opacity = 1;
        translate = -16;
      } else if (this.translate > this.stage2Distance) {
        // 阶段II: 慢慢平移 0 -> -16
        let step = 16.0 / (this.stage3Distance - this.stage2Distance);
        opacity = 1;
        translate = -step * (this.translate - this.stage2Distance);
      }
      return {
        opacity: opacity,
        transform: `translate3d(${translate}px, 0, 0)`
      };
    },
    // 右边点样式 阶段I无需考虑样式，其他阶段只做平移
    rightDotStyle() {
      let translate = 0;
      let opacity = 0;
      if (this.translate > this.stage3Distance) {
        // 阶段III: 平移到最右侧
        opacity = 1;
        translate = 16;
      } else if (this.translate > this.stage2Distance) {
        // 阶段II: 慢慢平移 0 -> 16
        let step = 16.0 / (this.stage3Distance - this.stage2Distance);
        opacity = 1;
        translate = step * (this.translate - this.stage2Distance);
      }
      return {
        opacity: opacity,
        transform: `translate3d(${translate}px, 0, 0)`
      };
    },

    // 中间点样式 改点只做scale
    centerDotStyle() {
      let scale = 0;
      let opacity = 0;
      if (this.translate > this.stage3Distance) {
        // 阶段III: 保持scale 为1
        opacity = 1;
        scale = 1;
      } else if (this.translate > this.stage2Distance) {
        // 阶段II: 中间点缩小：2 -> 1
        let step = 1 / (this.stage3Distance - this.stage2Distance);
        opacity = 1;
        scale = 2 - step * (this.translate - this.stage2Distance);
      } else if (this.translate > this.stage1Distance) {
        // 阶段I: 中间点放大：0 -> 2
        let step = 2 / (this.stage2Distance - this.stage1Distance);
        opacity = 1;
        scale = 0 + step * (this.translate - this.stage1Distance);
      }
      return {
        opacity: opacity,
        transform: `scale(${scale}, ${scale})`
      };
    }
  }
};
</script>

<style scoped>
/* 第三方插件的样式 */
.weui-search-bar {
  padding: 10px;
}
.weui-badge {
  position: absolute;
  right: -6px;
  top: 0;
  z-index: 2;
  -webkit-transform: translate3d(0, -40%, 0);
  transform: translate3d(0, -40%, 0);
}

/* 本地样式 */
.relative {
  position: relative;
}
.dropped-animation {
  transition: 0.25s;
}
.mh-mainframe__mask {
  position: fixed;
  z-index: 4;
  width: 100%;
  top: 44px;
  left: 0;
  bottom: 0;
  overflow: hidden;
}
.mh-more__menu {
  position: fixed;
  z-index: 4;
  width: 133px;
  font-size: 16px;
  right: 5px;
  top: 50px;
  text-align: left;
  border-radius: 4px;
  background-color: #49484b;
  /* padding: 0 15px; */
  /* 🔥- [CSS transform(变形)和transform-origin(变形原点)](https://www.cnblogs.com/wcf52web/p/5601454.html) */
  -webkit-transform-origin: 90% 0;
  -ms-transform-origin: 90% 0;
  transform-origin: 90% 0;
}

.mh-more__menu-open {
  -webkit-transition: initial;
  transition: initial;
  opacity: 1;
}

.mh-more__menu-close {
  opacity: 0;
  -webkit-transition: 0.2s opacity ease, 0.6s -webkit-transform ease;
  transition: 0.2s opacity ease, 0.6s transform ease;
  -webkit-transform: scale(0);
  -ms-transform: scale(0);
  transform: scale(0);
}

.mh-more__menu li {
  position: relative;
  height: 40px;
  line-height: 40px;
  color: white;
  font-size: 14px;
}
.mh-more__menu li:not(:last-child)::after {
  content: "";
  width: 200%;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 1px;
  background-color: #5b5b5d;
  -webkit-transform: scale(0.5);
  -ms-transform: scale(0.5);
  transform: scale(0.5);
  -webkit-transform-origin: 0 100%;
  -ms-transform-origin: 0 100%;
  transform-origin: 0 100%;
}

.mh-more__menu li:active {
  background-color: #fff;
}

/* 🔥伪元素before&after以及制作三角箭头
* - [css伪元素before/after和画三角形的搭配应用](https://www.cnblogs.com/lhat/p/4800328.html)
* - [伪元素before&after以及制作三角箭头](https://www.jianshu.com/p/1e06c4fde762)
* - [CSS画三角形以及before,after伪元素的应用。](https://www.cnblogs.com/lanxiansheng/p/7080106.html)
*/
.mh-more__menu::before {
  width: 0;
  height: 0;
  position: absolute;
  top: -6px;
  right: 12px;
  content: "";
  border-width: 0 6px 6px;
  border-color: transparent transparent #49484b transparent;
  border-style: solid;
}

.mh-more__menu-item-icon {
  font-size: 16px;
  margin-right: 10px;
  margin-left: 16px;
}

.content__wrapper {
  position: relative;
  /* margin-top: calc(736px - 44px); */
}

/* 列表 + 列表项 */
.content::after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  color: #ddd;
  background-color: #ddd;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 1;
}

.content__item {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  padding: 12px 16px;
  background-color: #fff;
}

.content__item::after {
  content: " ";
  position: absolute;
  left: 76px;
  bottom: 0;
  right: 0;
  height: 1px;
  color: #d8d8d8;
  background-color: #b8b8b8;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
.item__hd {
  position: relative;
}

.item__bd {
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  overflow: hidden;
  padding-left: 12px;
}
.item__top,
.item__bottom {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.item__top {
  height: 25px;
  line-height: 25px;
}

.item__bottom {
  margin-top: 2px;
}

.item__text,
.item__name {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
.item__name {
  color: rgba(0, 0, 0, 0.9);
  font-weight: 500;
  font-size: 17px;
}
.item__time {
  color: #b2b2b2;
  font-size: 12px;
}
.item__text {
  color: #9b9b9b;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

/* 顶部下拉三个点容器 */
.dropped__wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 0;
}
.dropped__dots {
  margin: 0 auto;
  position: relative;
  width: 38px;
  height: 6px;
  top: 0;
}

.dropped__dots .dot {
  background-color: #b7b7b7;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  position: absolute;
  opacity: 0;
  top: 0;
  /* 默认居中 */
  left: 16px;
}

/* 小程序容器 */
.applet__wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 5;
}
.applet__content {
  transform-origin: 50% 0 0;
  transform: scale(0.5, 0.4);
}
</style>
