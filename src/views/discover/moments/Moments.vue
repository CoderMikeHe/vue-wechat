// 朋友圈
<template>
  <vue-route-layout>
    <div class="_full-content" @touchstart="touchstartAction">
      <!-- 导航栏透明 -->
      <NavigationBar
        title="朋友圈"
        :left-item="blackBackItem"
        :right-item="cameraLineItem"
        @left-click="$router.back()"
        @right-click="cameraItemDidClick"
        @scroll-to-top="scrollToTop"
        :style="navStyle"
      ></NavigationBar>
      <!-- 导航栏不透明 -->
      <NavigationBar
        :left-item="whiteBackItem"
        :right-item="cameraFaceItem"
        @left-click="$router.back()"
        @right-click="cameraItemDidClick"
        @scroll-to-top="scrollToTop"
        :style="transparentNavStyle"
      ></NavigationBar>
      <!-- refreBall -->
      <div
        class="moment__refresh"
        :style="refreshStyle"
        :class="{ 'moment__refresh--loading': topStatus === 'loading' }"
      ></div>
      <!-- 单条说说 -->
      <div
        class="moment__wrapper"
        ref="momentWrapper"
        @touchstart="startDrag"
        @touchmove="onDrag"
        @touchend="stopDrag"
        @touchcancel="stopDrag"
        @scroll.passive="onScroll($event)"
      >
        <!-- 背景页：需要有数据方可显示 -->
        <div class="moment__background" v-show="moments.length"></div>
        <div
          :style="transform"
          :class="{ moment__dropped: topDropped || bottomDropped }"
        >
          <MomentProfile
            class="moment__profile"
            @cover-click="coverDidClick"
          ></MomentProfile>
          <div
            class="mh-moment"
            v-for="(moment, index) in moments"
            :key="index"
          >
            <!-- 头部 -->
            <div class="mh-moment__hd">
              <!-- 头像 -->
              <img
                :src="moment.user.profile_image_url"
                alt
                @click="skipToContactInfo(moment)"
                @touchstart="avatarTouchStart(moment, $event)"
                @touchmove="avatarTouchMove"
                @touchend="avatarTouchEnd(moment)"
                @touchcancel="avatarTouchEnd(moment)"
              />
            </div>
            <!-- 身体 -->
            <div class="mh-moment__bd">
              <div class="mh-moment__name">
                <span
                  class="mh-moment--tap-highlight"
                  @click="skipToContactInfo(moment)"
                  >{{ moment.user.screen_name }}</span
                >
              </div>
              <!-- 正文 -->
              <!-- 🔥 这里必须得用 v-show 因为我们设置了 ref，必须的渲染出来 ，否则会导致 this.$refs.content.length不对 -->
              <div
                class="moment__content-wrapper"
                v-show="moment.text && moment.text.length > 0"
              >
                <p
                  class="mh-moment__content"
                  :class="{
                    unfold1: moment.unfold === 1,
                    unfold2: moment.unfold === 2
                  }"
                  ref="content"
                  v-html="moment.textHtml"
                  @click="contentDidClick(index, $event)"
                >
                  <!-- {{ moment.text || "" }} -->
                </p>
                <p class="mh-moment__expand" v-if="moment.showUnfold">
                  <span
                    class="mh-moment--tap-highlight"
                    @click="
                      moment.unfold === 1
                        ? (moment.unfold = 0)
                        : (moment.unfold = 1)
                    "
                    >{{ moment.unfold ? "收起" : "全文" }}</span
                  >
                </p>
              </div>

              <!-- 图片九宫格 type === 0 -->
              <div
                class="mh-moment__pictures"
                :style="moment.picsWrapperStyle"
                v-if="
                  moment.pic_infos.length > 0 &&
                    (moment.type === undefined || moment.type === 0)
                "
              >
                <div
                  class="mh-moment__pic"
                  v-for="(pic, idx) in moment.pic_infos"
                  :key="idx"
                  :style="pic.picStyle"
                  @click="picDidClick(index, idx, $event)"
                ></div>
              </div>
              <!-- 视频 type === 1 -->
              <div class="moment__video-wrapper" v-if="moment.type === 1">
                <div class="video-wrapper__play"></div>
              </div>
              <!-- 分享 type === 2 -->
              <div class="moment__share-wrapper" v-if="moment.type === 2">
                <!-- shareInfoType === 0网页 -->
                <div
                  class="share-wrapper__content"
                  v-if="moment.shareInfo.shareInfoType === 0"
                >
                  <div class="content__share-hd">
                    <img :src="moment.shareInfo.thumbImage" alt="" />
                  </div>
                  <div class="content__share-bd">
                    {{ moment.shareInfo.title }}
                  </div>
                </div>
                <!-- shareInfoType === 0音乐 -->
                <div
                  class="share-wrapper__content"
                  v-if="moment.shareInfo.shareInfoType === 1"
                >
                  <div class="content__share-hd">
                    <img :src="moment.shareInfo.thumbImage" alt="" />
                    <div class="content__play"></div>
                  </div>
                  <div class="content__share-bd">
                    <p class="content__title">
                      {{ moment.shareInfo.title }}
                    </p>
                    <p class="content__subtitle">
                      {{ moment.shareInfo.descr }}
                    </p>
                  </div>
                </div>
              </div>
              <!-- 地理位置 -->
              <div
                class="moment__location-wrapper"
                v-if="moment.location && moment.location.length > 0"
              >
                <span class="mh-moment--tap-highlight">{{
                  moment.location
                }}</span>
              </div>

              <!-- 时间/来源/更多 -->
              <div class="mh-moment__more-wrapper">
                <p class="mh-moment__time">
                  {{ moment.created_at | dateFormat }}
                </p>
                <transition name="show-more">
                  <!-- $event 当在父级组件监听这个事件的时候，我们可以通过 $event 访问到被抛出的这个值 -->
                  <MomentOperationMore
                    class="more-wrapper__operation"
                    v-if="moment.showCmt"
                    :thumbed="moment.attitudes_status"
                    @thumb-click="thumbAction(moment, $event)"
                    @comment-click="commentAction(moment)"
                  ></MomentOperationMore>
                </transition>
                <div
                  class="mh-moment__more"
                  @click.stop="moreBtnAction(moment)"
                  @touchstart.stop
                ></div>
              </div>

              <!-- 点赞or评论 列表 -->
              <div
                class="moment__comment-wrapper"
                v-if="
                  moment.attitudes_list.length > 0 ||
                    moment.comments_list.length > 0
                "
              >
                <!-- 点赞列表 -->
                <div
                  class="comment-wrapper__attitudes"
                  v-html="moment.attitudesHtml"
                  @click="attitudesItemDidClick(index, $event)"
                  v-if="moment.attitudes_list.length > 0"
                ></div>
                <!-- 评论列表 -->
                <div
                  class="comment-wrapper__comments"
                  v-if="moment.comments_list.length > 0"
                >
                  <!-- 这里事件把 index idx 都传出去 -->
                  <div
                    class="comment-wrapper__comment"
                    v-for="(cmt, idx) in moment.comments_list"
                    :key="idx"
                    v-html="cmt.commentHtml"
                    @click="commentItemDidClick(index, idx, $event)"
                  ></div>
                </div>
                <!-- 分割线 -->
                <div class="comment-wrapper__line"></div>
              </div>
            </div>
          </div>
          <!-- 上拉加载刷新控件 -->
          <div class="weui-loadmore" v-show="moments.length">
            <i class="weui-loading" v-show="!bottomAllLoaded"></i>
            <span class="weui-loadmore__tips"
              >{{
                bottomAllLoaded
                  ? "别拉了，劳资也是有底线的..."
                  : "&nbsp;正在加载..."
              }}
            </span>
          </div>
        </div>
      </div>

      <!-- ActionSheet -->
      <actionSheet
        v-model="showActionSheet"
        @did-click-item="didClickItem"
        :items="items"
      ></actionSheet>

      <!-- previewer -->
      <previewer
        :list="list"
        ref="previewer"
        :options="options"
        @on-index-change="logIndexChange"
      ></previewer>
    </div>
  </vue-route-layout>
</template>

<script>
import {
  cameraLineItem,
  cameraFaceItem,
  whiteBackItem
} from "assets/js/MHBarButtonItem.js";
import actionSheet, {
  ActionSheetItem
} from "components/actionSheet/ActionSheet";
import MHMoments1 from "@/assets/js/MHMoments1.js";
import MHMoments2 from "@/assets/js/MHMoments2.js";
import MHMoments3 from "@/assets/js/MHMoments3.js";
import MHMoments4 from "@/assets/js/MHMoments4.js";
import MomentOperationMore from "./view/MomentOperationMore";
import MomentProfile from "./view/MomentProfile";
import { mapState } from "vuex";
// helper
import helper from "./js/momentsHelper.js";
// 图片预览
import previewer from "components/previewer/Previewer";
export default {
  name: "moments",
  data() {
    return {
      cameraLineItem,
      cameraFaceItem,
      whiteBackItem,
      moments: [],
      // actionSheet 的数据源
      items: [],
      // 显示ActionSheet
      showActionSheet: false,
      // actionSheetTitle
      actionSheetTitle: "",
      // 更多items
      cameraItems: [],
      showCamera: false,
      // delItems
      delItems: [],
      showDel: false,
      // coverItems
      coverItems: [],
      shwoCover: false,
      // 电话号码items
      showPhoneNumber: false,
      // 长按头像的items
      showAvatar: false,
      attitudesIcon:
        "<img src=" +
        require("@/assets/images/moments/wx_albumInformationLikeHL_15x15.png") +
        " width='15' height='15'>",

      // 当前显示的moment
      tempMoment: {},
      // 要删除的评论数据的索引 {section , row}
      delCmtIndexPath: {},
      startY: "", //保存touch时的Y坐标
      translate: 0, //保存向下滑动的距离
      // 刷新控件隐藏的位置
      refreshHiddenValue: -30,
      // 刷新控件最终显示的位置
      refreshShowValue: 60,
      // 下拉刷新临界点
      topDistance: 40,
      // touchState 触摸状态(0 touchend ; 1 touchstart ; 2 touchend)
      touchSate: 0,

      // 最后一次topValue
      lastRefreshTop: 0,
      // startScrollTop
      startScrollTop: 0,

      // 移动方向 up：上拉 down：下拉
      direction: "",
      // 下拉刷新状态
      topStatus: "",
      topDropped: false,

      // 是否到达底部
      bottomReached: false,
      // 底部控件状态
      bottomStatus: "",
      // 底部控件是否处于 drop状态
      bottomDropped: false,
      // 是否已经加载完毕,必须的有数据
      bottomAllLoaded: true,

      // tempSt
      tempStartScrollTop: 0,
      tempStartY: 0,
      currentY: 0,
      // page
      page: 1,
      // 定时器
      timeOutEvent: 0,
      lastOpacity: 0,
      list: [], // 图片浏览器资源
      options: {}, // 图片浏览器配置

      // 承载朋友圈的容器
      momentWrapperEl: null
    };
  },
  destroyed() {
    console.log("++++++ 我已牺牲 ++++++");
  },
  created() {
    console.log("++++++ created ++++++");
    // 配置action-sheet item
    this.configActionSheetItems();
    // 开始刷新
    this.topStatus = "loading";
    // 调用一次请求数据
    this.topMethod();
  },
  mounted() {
    console.log("++++++ mounted ++++++");
    // 获取滚动容器
    this.momentWrapperEl = this.$refs.momentWrapper;
  },
  activated() {
    console.log("++++++ activated ++++++");
  },
  deactivated() {
    console.log("朋友圈deactivated");
  },
  methods: {
    // 九宫格图片被点击了
    picDidClick(section, row, event) {
      let el = event.target;
      let parentElement = el.parentElement;
      // 取出 moment
      let moment = this.moments[section];
      // 数据源
      this.list = helper.configPreviewerList(moment.pic_infos);
      // 配置
      let options = {
        // -[FAQ](https://photoswipe.com/documentation/faq.html)
        showHideOpacity: true,
        getThumbBoundsFn(index) {
          // find thumbnail element
          let thumbnail = parentElement.children[index];
          // get window scroll Y
          let pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop;
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect();
          console.log(rect);
          // w = width
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      };
      this.options = options;

      // Fixed Bug : 先让dom更新，然后show
      this.$nextTick(() => {
        // 弹出浏览器
        this.$refs.previewer.show(row);
      });
    },
    logIndexChange(index) {
      console.log(index);
    },
    // 滚动到顶部
    scrollToTop() {
      // 🔥 web原生滚动
      // - [scrollTo](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollTo)
      // - [scroll、scrollBy和 scrollTo三种方法定位滚动条位置，以及在vue中使用的注意事项](https://blog.csdn.net/github_39598787/article/details/80310997)
      this.momentWrapperEl.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      // 开始刷新
      this.topStatus = "loading";
      // 调用一次请求数据
      this.topMethod();
    },
    // 头像长按/点击事件
    avatarTouchStart(m, e) {
      // 阻止掉页面的默认事件
      e.preventDefault();
      let timeOutEvent = setTimeout(() => {
        this.timeOutEvent = 0;
        const permission = new ActionSheetItem({
          title: "设置权限"
        });
        const complain = new ActionSheetItem({
          title: "投诉"
        });
        this.items = [permission, complain];
        this.showActionSheet = true;
        this.showAvatar = true;
      }, 500);
      this.timeOutEvent = timeOutEvent;
    },
    avatarTouchMove() {
      clearTimeout(this.timeOutEvent);
      this.timeOutEvent = 0;
    },
    avatarTouchEnd(m) {
      clearTimeout(this.timeOutEvent);
      if (this.timeOutEvent !== 0) {
        // 点击事件
        this.skipToContactInfo(m);
      }
      return false;
    },

    // 🔥 touch事件
    // - [Vue实现下拉刷新组件（简单明了）](https://blog.csdn.net/qq_34439125/article/details/85602508)
    // - [基于vue封装的轻量级下拉刷新组件](https://www.jianshu.com/p/0fed94bb1239)
    // - [JS+CSS实现的下拉刷新/上拉加载插件](https://www.cnblogs.com/qq120848369/p/6651096.html)
    // - [JS移动客户端--触屏滑动事件](https://www.cnblogs.com/winyh/p/6714923.html)
    // - [移动端 js touch事件](https://www.cnblogs.com/fengfan/p/4506555.html)
    // - [Touch_events](https://developer.mozilla.org/zh-CN/docs/Web/API/Touch_events)
    // - [Vue2.0 实战 之 上啦加载下拉刷新](https://blog.csdn.net/qq_16559905/article/details/70160807)
    // - [Vue Scroller](https://github.com/wangdahoo/vue-scroller)
    // - [简单灵活且强大的Vue下拉刷新组件](https://juejin.im/entry/59ace2c4518825243a78f1c3)
    // - [vue 实现上拉加载下拉刷新（思路贼清晰）](https://blog.csdn.net/qq_28027903/article/details/80242714)

    // 开始拖拽
    startDrag(e) {
      this.touchSate = 1;
      this.translate = 0; // 滑动距离归0
      let t = e.targetTouches[0]; // 获得开始Y坐标

      this.startY = t.clientY;
      let scrollTop = this.momentWrapperEl.scrollTop;
      // 记录一下起始 st
      this.startScrollTop = scrollTop;

      this.tempStartY = this.startY;
      this.tempStartScrollTop = scrollTop;

      this.bottomReached = false;

      if (this.topStatus !== "loading") {
        this.topStatus = "pull";
        this.topDropped = false;
        this.lastRefreshTop = 0;
      }
      if (this.bottomStatus !== "loading") {
        this.bottomStatus = "pull";
        this.bottomDropped = false;
      }
    },
    // 正在拖拽
    onDrag(e) {
      this.touchSate = 2;
      let scrollEventTarget = this.momentWrapperEl;
      let currentY = e.targetTouches[0].clientY;
      let currentScrollTop = scrollEventTarget.scrollTop;
      // 偏移距离
      let distance = (currentY - this.startY) / 2;
      // 上拉or下拉
      this.direction = distance > 0 ? "down" : "up";

      // 判断是否在顶部且处于下拉状态
      if (currentScrollTop === 0 && this.direction === "down") {
        // 阻止默认事件，在微信浏览器中尤为有用，至于为什么，你去试就知道了。
        // 组织掉 onscroll 默认事件
        e.preventDefault();
        e.stopPropagation();
        // 容错处理：从已经下滑一段距离向下拖拽，会导致 move 距离很大，当到达临界点的时候，突然掉下来 影响用户体验
        if (this.startScrollTop !== 0 && currentScrollTop === 0) {
          this.startY = currentY;
          this.startScrollTop = 0;
          distance = 0;
        }
        // 不管下拉刷新状态，这个distance长期有效
        this.translate = distance;
        // 如果当前正在刷新
        if (this.topStatus !== "loading") {
          // 如果大于临界点，释放即可刷新 的状态
          if (this.translate > this.topDistance) {
            // 减少计算型属性的计算
            if (this.topStatus !== "drop") {
              // 释放即可刷新
              this.topStatus = "drop";
              // 拖拽过程中 一旦某一次有超过了临界点
              this.lastRefreshTop = this.refreshShowValue;
            }
          } else {
            // 减少计算型属性的计算
            if (this.topStatus !== "pull") {
              // 下拉即可刷新
              this.topStatus = "pull";
            }
          }
        }
      }

      // 如果滚动条已经在顶部了。就没必要做下拉刷新了,且会触发 onscroll 事件
      // 上拉
      if (this.direction === "up") {
        // 检测上拉临界点
        let upCriP =
          scrollEventTarget.scrollHeight - scrollEventTarget.clientHeight;
        // 这里需要容个错
        if (currentScrollTop === upCriP && this.startScrollTop !== upCriP) {
          // 赋值
          this.startScrollTop = upCriP;
          // 重新设置 startY
          this.startY = currentY;
          // distance 值赋值为0
          distance = 0;
          this.currentY = currentY;
        }
        // 检查是否到达过底部（PS：微信的逻辑：只要上拉刷新控件完全显示了，就认为可以加载更多）
        this.bottomReached = this.checkBottomReached();
        if (this.bottomReached) {
          // 主要是阻止 OnScroll事件
          e.preventDefault();
          e.stopPropagation();
          this.translate = distance;
          // 阻止默认事件，在微信浏览器中尤为有用，至于为什么，你去试就知道了。
        }
      }
    },
    // 🔥检查是否滚动到底部
    // - https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollHeight
    checkBottomReached() {
      let scrollEventTarget = this.momentWrapperEl;
      let a = scrollEventTarget.scrollTop + scrollEventTarget.clientHeight;
      let b = scrollEventTarget.scrollHeight;
      return a >= b;
    },
    // 结束拖拽
    stopDrag() {
      let scrollTop = this.momentWrapperEl.scrollTop;
      this.touchSate = 0;
      if (
        this.direction === "down" &&
        scrollTop === 0 &&
        this.topStatus !== "loading" &&
        this.translate > 0
      ) {
        this.topDropped = true;
        if (this.topStatus === "drop") {
          this.topStatus = "loading";
          this.topMethod();
        } else {
          this.topStatus = "pull";
        }
      }
      // 只要到达了上拉控件到达了底部，就给我刷新
      if (
        this.direction === "up" &&
        this.bottomReached &&
        this.bottomStatus !== "loading" &&
        this.translate < 0 &&
        !this.bottomAllLoaded
      ) {
        this.bottomDropped = true;
        this.bottomReached = false;
        this.bottomStatus = "loading";
        // 上拉加载事件
        this.bottomMethod();
      }
      // 清空
      this.direction = "";
      // 微信结束了拖拽，都得归0处理
      this.translate = 0;
      // 这里需要做个容错处理，loading状态下，只认刷新控件的 scrollTop
      if (this.topStatus === "loading") {
        this.lastRefreshTop = scrollTop;
      } else {
        this.lastRefreshTop = 0;
      }
    },

    // 一旦 scrollTop >0 就会触发onscroll
    onScroll(e) {
      // 滚动条位置
      let scrollTop = e.target.scrollTop;
      // 这里假设 只要露出上拉加载的 80%就认为可以刷新
      let sh = e.target.scrollHeight - 50;
      let st = e.target.scrollTop + e.target.clientHeight;
      // 必须是touchEnd的情况下有效，且不是正在下拉刷新
      if (
        st >= sh &&
        this.touchSate === 0 &&
        this.bottomStatus !== "loading" &&
        !this.bottomAllLoaded
      ) {
        console.log("+++ OnScroll上拉加载事件 +++");
        this.bottomStatus = "loading";
        // 上拉加载事件
        this.bottomMethod();
      }
      // 获取屏幕宽度
      let clientWidth = document.documentElement.clientWidth;
      let topOffset = clientWidth - 64 - 75;
      let opacity = (scrollTop - topOffset) / 44 + 0;
      opacity = Math.min(Math.max(0, opacity), 1);
      if (this.lastOpacity !== opacity) {
        this.lastOpacity = opacity;
      }
      // Fixed Bug: 20190715 不需要设置lastRefreshTop 过大，否则会导致出现两根滚动条的Bug
      // lastRefreshTop 只要设置为 this.refreshShowValue - this.refreshHiddenValue 为临界点即可
      this.lastRefreshTop = Math.min(
        this.refreshShowValue - this.refreshHiddenValue,
        scrollTop
      );
    },

    // 导航栏有按钮点击事件
    cameraItemDidClick() {
      this.items = this.cameraItems;
      this.showCamera = true;
      this.showActionSheet = true;
    },
    // 配置 actionsheet items
    configActionSheetItems() {
      const takePhoto = new ActionSheetItem({
        title: "拍摄",
        subtitle: "照片或视频"
      });
      const album = new ActionSheetItem({
        title: "从手机相册选取"
      });
      const del = new ActionSheetItem({
        title: "删除",
        destructive: true
      });
      const changeCover = new ActionSheetItem({
        title: "更换相册封面"
      });
      // 引用数组
      this.cameraItems = [takePhoto, album];
      this.delItems = [del];
      this.coverItems = [changeCover];
    },
    // actionSheet事件点击
    didClickItem(index) {
      console.log(index);
      if (index === 0) {
        // 取消按钮
        this.items = [];
        this.showCamera = false;
        this.showDel = false;
        this.shwoCover = false;
        this.showPhoneNumber = false;
        this.showAvatar = false;
        this.actionSheetTitle = "";
        this.delCmtIndexPath = {};
        return;
      }
      // 如果是弹出删除
      if (this.showDel) {
        this.showDel = false;
        // 调用删除评论事件
        this.deleteComment(this.delCmtIndexPath);
        this.delCmtIndexPath = {};
      }
      if (this.showPhoneNumber) {
        this.showPhoneNumber = false;
        this.actionSheetTitle = "";
      }
    },
    // 删除评论数据
    deleteComment(indexPath) {
      // 删除数据 容错处理
      indexPath = indexPath || {};
      if (Object.keys(indexPath).length === 0) return;
      // 取出moment
      const moment = this.moments[indexPath.section];
      // 取出评论数据
      const comment = moment.comments_list[indexPath.row];
      // 开始删除
      moment.comments_list.some((cmt, i) => {
        if (cmt.idstr === comment.idstr) {
          moment.comments_list.splice(i, 1);
          return true;
        }
      });
    },
    // moment 更多按钮事件
    moreBtnAction(moment) {
      // 三部曲
      if (Object.keys(this.tempMoment).length === 0) {
        moment.showCmt = true;
        this.tempMoment = moment;
      } else if (
        Object.keys(this.tempMoment).length !== 0 &&
        this.tempMoment === moment
      ) {
        moment.showCmt = !moment.showCmt;
      } else if (
        Object.keys(this.tempMoment).length !== 0 &&
        this.tempMoment !== moment
      ) {
        this.tempMoment.showCmt = false;
        moment.showCmt = true;
        this.tempMoment = moment;
      }
    },
    // 这里监听冒泡
    touchstartAction() {
      this.tempMoment.showCmt = false;
    },

    action() {
      console.log("----shhshshhs----");
    },

    // 跳转到用户信息
    skipToContactInfo(moment) {
      let user = moment.user;
      // 找到了,则跳转到用户信息
      this.$router.push({
        name: "contact-info",
        params: user
      });
    },
    // 👉🔥vue在v-html中绑定事件
    // https://blog.csdn.net/fangdengfu123/article/details/84992278
    // https://blog.csdn.net/qq_25075279/article/details/84646782
    // https://blog.csdn.net/qq_31393401/article/details/81017912
    // 点赞列表用户被点击
    attitudesItemDidClick(section, event) {
      // 点击html中的某个span
      if (event.target.nodeName === "SPAN") {
        let dataKeyJson = event.target.getAttribute("data-key");
        let dataKeyObj = JSON.parse(dataKeyJson);
        // 判断是否点击了用户
        if (dataKeyObj[helper.userInfoKey]) {
          let idstr = dataKeyObj[helper.userInfoKey];
          // 找到用户
          let moment = this.moments[section];
          // find
          moment.attitudes_list.some(item => {
            if (idstr === item.idstr) {
              // 找到了,则跳转到用户信息
              this.$router.push({
                name: "contact-info",
                params: item
              });
              return true;
            }
          });
        }
      }
    },
    // 评论列表中item的点击事件
    commentItemDidClick(section, row, event) {
      let moment = this.moments[section];
      let comment = moment.comments_list[row];

      if (event.target.nodeName === "DIV") {
        // 单纯的点击某个评论列表
        // 取出moment
        const moment = this.moments[section];
        // 取出评论数据
        const comment = moment.comments_list[row];
        if (comment.from_user.idstr === this.user.idstr) {
          // 自己的评论
          this.items = this.delItems;
          this.showDel = true;
          this.showActionSheet = true;
          this.delCmtIndexPath = {};
          // 记录要删除的评论索引
          this.delCmtIndexPath = {
            section: section,
            row: row
          };
        } else {
          // 回复/评论
          // CMH TODO
        }
        return;
      }
      // 点击v-html中的某个span
      if (event.target.nodeName === "SPAN") {
        let dataKeyJson = event.target.getAttribute("data-key");
        let dataKeyObj = JSON.parse(dataKeyJson);
        // 判断是否点击了用户
        if (dataKeyObj[helper.userInfoKey]) {
          let idstr = dataKeyObj[helper.userInfoKey];
          // 找到用户
          let user = {};
          if (comment.from_user.idstr === idstr) {
            user = comment.from_user;
          } else if (comment.to_user && comment.to_user.idstr === idstr) {
            user = comment.to_user;
          } else {
            // 这种情况就是 点击 @xxx 这里随便伪造一个 哈哈
            user.idstr = "89757";
            user.profile_image_url =
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553016104583&di=45244cedc3d47c3c1fd7261869dc23da&imgtype=0&src=http%3A%2F%2Fimg1.touxiang.cn%2Fuploads%2F20140122%2F22-074744_465.jpg";
            user.screen_name = idstr;
          }
          // 跳转到用户信息
          this.$router.push({
            name: "contact-info",
            params: user
          });
        }
        // 常规处理
        this.handleContentOrCommentRichText(dataKeyObj);
      }
    },
    // 微信正文点击事件
    contentDidClick(section, event) {
      let moment = this.moments[section];
      if (moment.unfold === 2) {
        // 超过八行的，点击啥都给我跳全文，且把moment对象传过去
        this.$router.push({
          name: "moments-full-text",
          params: {
            moment: moment
          }
        });
        return;
      }

      // 点击v-html中的某个span
      if (event.target.nodeName === "SPAN") {
        let dataKeyJson = event.target.getAttribute("data-key");
        let dataKeyObj = JSON.parse(dataKeyJson);
        // 判断是否点击了用户
        if (dataKeyObj[helper.userInfoKey]) {
          let idstr = dataKeyObj[helper.userInfoKey];
          // 跳转到用户信息
          let user = {};
          // 这种情况就是 点击 @xxx 这里随便伪造一个 哈哈
          user.idstr = "89757";
          user.profile_image_url =
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553016104583&di=45244cedc3d47c3c1fd7261869dc23da&imgtype=0&src=http%3A%2F%2Fimg1.touxiang.cn%2Fuploads%2F20140122%2F22-074744_465.jpg";
          user.screen_name = idstr;
          this.$router.push({
            name: "contact-info",
            params: user
          });
        }
        // 常规处理
        this.handleContentOrCommentRichText(dataKeyObj);
      }
    },

    // 正文+评论 富文本事件处理
    handleContentOrCommentRichText(dataKeyObj) {
      // 判断是否点击了电话号码
      if (dataKeyObj[helper.phoneNumberKey]) {
        // 取出电话号码
        let phoneNumber = dataKeyObj[helper.phoneNumberKey];
        // 弹出框
        this.actionSheetTitle = phoneNumber + "可能是一个电话号码，你可以";
        const call = new ActionSheetItem({
          title: "呼叫"
        });
        const copy = new ActionSheetItem({
          title: "复制号码"
        });
        const add = new ActionSheetItem({
          title: "添加到手机通讯录"
        });
        this.items = [call, copy, add];
        this.showActionSheet = true;
        this.showPhoneNumber = true;
      }

      // 链接/话题
      if (dataKeyObj[helper.linkUrlKey] || dataKeyObj[helper.topicKey]) {
        let value =
          dataKeyObj[helper.linkUrlKey] || dataKeyObj[helper.topicKey];
        console.log(value);
        this.$router.push({
          name: "moments-other",
          params: {
            value: value
          }
        });
      }
    },

    // 点赞
    thumbAction(moment, thumb) {
      moment.showCmt = false;
      moment.attitudes_status = thumb;
      moment.attitudes_list = moment.attitudes_list || [];
      // 数据处理
      if (thumb === 0) {
        // 取消点赞
        moment.attitudes_count -= 1;
        if (moment.attitudes_count < 0) moment.attitudes_count = 0;
        moment.attitudes_list.some((item, i) => {
          if (item.idstr === this.user.idstr) {
            // 从数组中删除
            moment.attitudes_list.splice(i, 1);
            return true;
          }
        });
      } else {
        // 点赞
        moment.attitudes_count += 1;
        moment.attitudes_list.push(this.user);
      }
      // 数据处理
      if (moment.attitudes_list.length === 0) {
        // 没有点赞数据
        moment.attitudesHtml = this.attitudesIcon;
      } else {
        // 拼接要携带的数据
        let userInfo = {};
        userInfo[helper.userInfoKey] = this.user.idstr;
        // 对象转字符串
        let dataKey = JSON.stringify(userInfo);
        // 有点赞数据
        if (thumb === 0) {
          // 取消点赞
          // 先拼接一个,
          moment.attitudesHtml = moment.attitudesHtml + ",";
          // 删除
          let regExpStr =
            "&nbsp;&nbsp;" +
            "<span data-key=" +
            dataKey +
            ">" +
            this.user.screen_name +
            "</span>" +
            ",";
          let regExp = new RegExp(regExpStr);
          moment.attitudesHtml = moment.attitudesHtml.replace(regExp, "");
          // 删除,
          moment.attitudesHtml = moment.attitudesHtml.substring(
            0,
            moment.attitudesHtml.length - 1
          );
        } else {
          // 点赞
          if (moment.attitudes_list.length > 1) {
            moment.attitudesHtml = moment.attitudesHtml + ",";
          }
          // 拼接数据
          moment.attitudesHtml =
            moment.attitudesHtml +
            "&nbsp;&nbsp;" +
            "<span data-key=" +
            dataKey +
            ">" +
            this.user.screen_name +
            "</span>";
        }
      }
    },
    // 评论
    commentAction(moment) {
      console.log(moment);
    },
    // 封面被点击
    coverDidClick() {
      this.items = this.coverItems;
      this.shwoCover = true;
      this.showActionSheet = true;
    },

    // 下拉刷新事件
    topMethod() {
      setTimeout(() => {
        // 🔥 数组拼接另一个数组
        // 👉 - [js数组拼接的四种方法]https://blog.csdn.net/cristina_song/article/details/82805444
        let temps = this.handleWebDatas(MHMoments1.moments);
        // 🔥 尽量用 push 来拼接数组，而不是concat
        // 👉 - [数组更新检测](https://cn.vuejs.org/v2/guide/list.html)
        this.moments.push(...temps); // es6 写法
        // dom更新
        this.$nextTick(() => {
          this.handleDomDatas(0);
        });
        this.topStatus = "";
        this.translate = 0;
        this.page = 1;
        this.bottomAllLoaded = temps.length === 0;
      }, 1500);
    },
    // 上拉加载事件
    bottomMethod() {
      let page = this.page + 1;
      // 模拟一下网络请求数据
      setTimeout(() => {
        this.page = page;
        this.bottomStatus = "";
        // 记录一一下起始索引
        let start = this.moments.length;
        // 数据更新
        let temps = [];
        if (page === 2) {
          temps = this.handleWebDatas(MHMoments2.moments);
        } else if (page === 3) {
          temps = this.handleWebDatas(MHMoments3.moments);
        } else if (page === 4) {
          temps = this.handleWebDatas(MHMoments4.moments);
          // 假设到了 4页 就无法上拉加载了
          this.bottomAllLoaded = true;
        }
        this.moments.push(...temps);
        // dom更新
        this.$nextTick(() => {
          this.handleDomDatas(start);
        });
      }, 1500);
    },

    // 数据web处理
    handleWebDatas(ms) {
      return helper.handleWebDatas(ms);
    },

    // 处理dom数据 start 起始索引
    handleDomDatas(start) {
      // 容错处理
      if (this.$refs.content === undefined) return;
      // 获取DOM元素列表
      let length = this.$refs.content.length;
      for (let i = start; i < length; i++) {
        // 取出元素
        const element = this.$refs.content[i];
        // 取出数据
        const moment = this.moments[i];
        // 获取样式
        let style = window.getComputedStyle(element);
        // 获取文本内容高度
        let contentH = style.height.replace("px", "");
        // 行高
        let lineHeight = style["line-height"].replace("px", "");
        // 判断 超过八行，则显示一行
        // unfold 0: 全部展示； 1：大于5行小于8行，显示5行； 2：大于8行，显示1行
        if (contentH > 8 * lineHeight) {
          moment.unfold = 2;
          moment.showUnfold = false;
        } else if (contentH > 5 * lineHeight) {
          moment.unfold = 1;
          moment.showUnfold = true;
        } else {
          moment.unfold = 0;
          moment.showUnfold = false;
        }
      }
    }
  },
  // 定义一个过滤器
  filters: {
    // 👉 🔥 JS将时间戳转换
    // - [JS将时间戳转换为刚刚、N分钟前、今天几点几分、昨天几点几分等表示法](https://www.cnblogs.com/taochengyong/p/9341986.html)
    // 朋友圈时间格式化
    dateFormat(srcDate) {
      return helper.dateFormat(srcDate);
    }
  },
  computed: {
    // 滚动列表的动态样式
    transform() {
      return { transform: `translate3d(0,${this.translate}px, 0)` };
    },

    // 刷新控件ball样式处理
    refreshStyle() {
      // 控制刷新小球的状态
      var translate = this.translate;
      let opacity = translate > this.topDistance ? 1 : 0;
      let top = this.refreshHiddenValue;
      let transform = "";
      let duration = "0.2s";
      let property = "";
      if (this.topStatus === "loading") {
        // 正在刷新的过程中，小球可以根据页面滚动而滚动，且不需要动画
        top = Math.max(
          this.refreshHiddenValue,
          this.refreshShowValue - this.lastRefreshTop
        );
        opacity = 1;
        duration = ""; // 去掉过渡动画
      } else {
        // 正在touchmove, 只控制旋转和显示or隐藏，不做top处理
        if (this.touchSate === 2) {
          top =
            translate > this.topDistance
              ? this.refreshShowValue
              : this.lastRefreshTop;
          transform = "rotate(" + -translate * 3 + "deg)";
          property = "top,opacity";
        } else if (this.touchSate === 0) {
          property = "top,opacity";
        }
      }
      // 返回样式
      return {
        top: top + "px",
        transitionDuration: duration,
        transitionProperty: property,
        opacity: opacity,
        transform: transform
      };
    },
    // 实心导航栏样式
    navStyle() {
      return { opacity: this.lastOpacity };
    },
    // 透明度导航栏样式
    transparentNavStyle() {
      return {
        opacity: 1 - this.lastOpacity,
        backgroundColor: "rgba(237,237,237,0)"
      };
    },
    ...mapState({
      // 当前用户
      user: state => state.user
    })
  },
  watch: {
    $route(val, oldval) {
      console.log("++++++ $route ++++++");
    }
  },
  components: {
    actionSheet,
    MomentOperationMore,
    MomentProfile,
    previewer
  },

  // - [导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB)
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(vm => {
      // 通过 `vm` 访问组件实例
      let scrollTop = sessionStorage.getItem("$$momentWrapperEl") || 0;
      if (from.name === "discover") {
        // 取出时间
        let t1 = sessionStorage.getItem("$$momentCurrentTime");
        if (t1) {
          let d = new Date();
          let t2 = d.getTime();
          // 计算差值 秒
          let sec = (t2 - t1 * 1) / 1000;
          // 1.1 超过30s, 重新请求第一页数据
          // 1.2 30s之内, 不请求数据，且滚动到指定位置
          if (sec > 30) {
            scrollTop = 0;
            if (vm.topStatus !== "loading") {
              // 排除掉 created 的请求
              // 开始刷新
              vm.topStatus = "loading";
              // 调用一次请求数据
              vm.topMethod();
            }
          }
          console.log("sec", sec);
        } else {
          // 娶不到缓存时间
          scrollTop = 0;
        }
      }
      // 设置到指定位置
      vm.momentWrapperEl.scrollTop = scrollTop * 1;
    });
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    next();
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // 朋友圈：不管前进还是后退，你都得记录滚动条位置
    let scrollTop = this.momentWrapperEl.scrollTop + "";
    console.log(scrollTop);
    // 存到sessionStorage
    sessionStorage.setItem("$$momentWrapperEl", scrollTop);
    if (to.name === "discover") {
      // 朋友圈 -> 发现 ： 记录当前时间
      let d = new Date();
      let t = d.getTime() + "";
      sessionStorage.setItem("$$momentCurrentTime", t);
    }
    next();
  }
};
</script>

<style src="./css/moments.css" scoped>
/* 🔥 Vue style里面使用scoped属性并@import引入外部css, 作用域是全局的解决方案 */
/* - [Vue style里面使用@import引入外部css, 作用域是全局的解决方案](https://www.cnblogs.com/ajaxlu/p/9086651.html) */
/* - [Vue style里面使用scoped属性并@import引入外部css, 作用域是全局的解决方案](https://blog.csdn.net/weixin_39941429/article/details/80254724) */
/* @import "./css/moments.css"; */
</style>
