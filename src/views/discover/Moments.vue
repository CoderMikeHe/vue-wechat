// 朋友圈
<template>
  <div class="_full-container" @touchstart="touchstartAction">
    <div class="_full-content" id="ko">
      <!-- 导航栏 -->
      <!-- <NavigationBar
        title="朋友圈"
        :left-item="backItem"
        :right-item="moreItem"
        @left-click="$router.back()"
        @right-click="rightItemClick"
      ></NavigationBar> -->
      <!-- 背景页 -->

      <!-- refreBall -->
      <div
        class="moment__refresh"
        :style="refreshStyle"
        :class="{ kkk: topStatus === 'loading' }"
      ></div>
      <!-- 单条说说 -->
      <div
        class="moment__wrapper"
        id="drag"
        @touchstart="startDrag"
        @touchmove="onDrag"
        @touchend="stopDrag"
        @touchcancel="stopDrag"
        @scroll.passive="onScroll($event)"
      >
        <div class="moment__background"></div>
        <div
          id="drag-inner"
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
                  :class="moment.unfold ? 'unfold' : 'fold'"
                  ref="content"
                  v-html="moment.text"
                >
                  <!-- {{ moment.text || "" }} -->
                </p>
                <p class="mh-moment__expand" v-if="moment.showUnfold">
                  <span
                    class="mh-moment--tap-highlight"
                    @click="moment.unfold = !moment.unfold"
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
                <transition name="fade">
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
                  @click="xxoo($event)"
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
          <div class="weui-loadmore" ref="loadMore">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">&nbsp;正在加载...</span>
          </div>
        </div>
      </div>

      <!-- ActionSheet -->
      <actionSheet
        v-model="showActionSheet"
        @did-click-item="didClickItem"
        :items="items"
      ></actionSheet>
    </div>
  </div>
</template>

<script>
import MHBarButtonItem, { moreItem } from "assets/js/MHBarButtonItem.js";
import actionSheet, {
  ActionSheetItem
} from "components/actionSheet/ActionSheet";
import MHMoments from "../../assets/js/MHMoments.js";
import MHMoments2 from "../../assets/js/MHMoments2.js";
import MHMoments3 from "../../assets/js/MHMoments3.js";
import MHMoments4 from "../../assets/js/MHMoments4.js";
import MomentOperationMore from "./MomentOperationMore";
import MomentProfile from "./MomentProfile";
import { mapState } from "vuex";
// 工具类
import utils from "../../assets/utils/utils.js";
// 表情类
import emoticons from "../../assets/js/emoticons/emoticons.js";

export default {
  name: "moments",
  data() {
    return {
      moreItem: moreItem,

      moments: [],
      // actionSheet 的数据源
      items: [],
      // 显示ActionSheet
      showActionSheet: false,
      // 更多items
      moreItems: [],
      showMore: false,
      // delItems
      delItems: [],
      showDel: false,
      // coverItems
      coverItems: [],
      shwoCover: false,

      // 全文或收起
      expanded: false,

      // 当前显示的moment
      tempMoment: {},
      // 点赞列表爱心
      attitudesIcon:
        "<img src=" +
        require("../../assets/images/moments/wx_albumInformationLikeHL_15x15.png") +
        " width='15' height='15'>",
      // 要删除的评论数据的索引 {section , row}
      delCmtIndexPath: {},
      rotes: false,
      startY: "", //保存touch时的Y坐标
      moveDistance: 0, //保存向下滑动的距离
      // 开始滑动到结束后状态的变化 0:下拉即可刷新 1:释放即可刷新 2:加载中
      refreshState: 0,
      duration: 0, //动画持续时间，0就是没有动画
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

      // tempSt
      tempStartScrollTop: 0,
      tempStartY: 0,
      currentY: 0,
      // page
      page: 1
    };
  },
  destroyed() {
    console.log("++++++ 我已牺牲 ++++++");
  },
  created() {
    console.log("++++++ 重新创建 ++++++");

    // 配置action-sheet item
    this.configItems();
    // 🔥 数组拼接另一个数组
    // 👉 - [js数组拼接的四种方法]https://blog.csdn.net/cristina_song/article/details/82805444
    let temps = this.handleWebDatas(MHMoments.moments);
    // 🔥 尽量用 push 来拼接数组，而不是concat
    // 👉 - [数组更新检测](https://cn.vuejs.org/v2/guide/list.html)
    this.moments.push(...temps); // es6 写法
  },
  mounted() {
    // 处理dom数据
    this.handleDomDatas(0);
    // 开始刷新
    this.topStatus = "loading";
    // 调用一次请求数据
    this.topMethod();
  },
  methods: {
    // https://blog.csdn.net/qq_34439125/article/details/85602508
    // https://www.jianshu.com/p/0fed94bb1239
    // https://www.cnblogs.com/qq120848369/p/6651096.html
    // https://www.cnblogs.com/winyh/p/6714923.html
    // https://www.cnblogs.com/fengfan/p/4506555.html
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Touch_events
    // 开始拖拽
    startDrag(e) {
      this.touchSate = 1;

      this.rotes = false;
      this.duration = 0; // 关闭动画
      this.moveDistance = 0; // 滑动距离归0
      let t = e.targetTouches[0]; // 获得开始Y坐标

      this.startY = t.clientY;
      let scrollTop = document.getElementById("drag").scrollTop;
      console.log("startDrag ====  " + scrollTop);
      // 记录一下起始 st
      this.startScrollTop = scrollTop;

      this.tempStartY = this.startY;
      this.tempStartScrollTop = scrollTop;

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
    // 正在拖拽
    onDrag(e) {
      this.touchSate = 2;
      let scrollEventTarget = document.getElementById("drag");
      let scrollTop = scrollEventTarget.scrollTop;
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
        this.moveDistance = distance;
        // 如果当前正在刷新
        if (this.topStatus !== "loading") {
          // 如果大于临界点，释放即可刷新 的状态
          if (this.moveDistance > this.topDistance) {
            // 减少计算型属性的计算
            if (this.topStatus !== "drop") {
              // 释放即可刷新
              this.topStatus = "drop";
              // 拖拽过程中 一旦某一次有超过了临界点
              this.lastRefreshTop = 60;
            }
          } else {
            // 减少计算型属性的计算
            if (this.topStatus !== "pull") {
              // 下拉即可刷新
              this.topStatus = "pull";
            }
          }
        }

        // 正在刷新 后面就不用区分状态了
        // if (this.refreshState === 2) {
        //   this.lastRefreshTop = 0;
        //   return;
        // } else {
        //   if (distance > this.topDistance) {
        //     this.lastRefreshTop = 60;
        //   }
        // }

        // console.log("++++ 下拉过程中 ++++");
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
          this.moveDistance = distance;
          // 阻止默认事件，在微信浏览器中尤为有用，至于为什么，你去试就知道了。
        }
      }

      // console.log(
      //   "--- scrollTop " +
      //   scrollTop +
      //   " --- direction " +
      //   this.direction +
      //   " --- distance " +
      //   distance +
      //   " --- moveDistance " +
      //   this.moveDistance +
      //   " --- bottomReached " +
      //   this.bottomReached
      // );
    },
    // 🔥检查是否滚动到底部
    // - https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollHeight
    checkBottomReached() {
      let scrollEventTarget = document.getElementById("drag");
      let a = scrollEventTarget.scrollTop + scrollEventTarget.clientHeight;
      let b = scrollEventTarget.scrollHeight;
      return a >= b;
    },
    // 结束拖拽
    stopDrag() {
      let scrollTop = document.getElementById("drag").scrollTop;
      this.touchSate = 0;
      if (
        this.direction === "down" &&
        scrollTop === 0 &&
        this.topStatus !== "loading" &&
        this.moveDistance > 0
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
        this.moveDistance < 0
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
      this.moveDistance = 0;
      // 结束drag
      this.lastRefreshTop = 0;
    },

    // 一旦 scrollTop >0 就会触发onscroll
    onScroll(e) {
      // 滚动条位置
      let scrollTop = e.target.scrollTop;
      // 这里假设 只要露出上拉加载的 80%就认为可以刷新
      let sh = e.target.scrollHeight - 50;
      let st = e.target.scrollTop + e.target.clientHeight;

      // console.log("+++ start +++");
      // console.log("sh === " + sh);
      // console.log("st === " + st);
      // console.log("touchState === " + this.touchSate);

      // 必须是touchEnd的情况下有效，且不是正在下拉刷新
      if (st >= sh && this.touchSate === 0 && this.bottomStatus !== "loading") {
        console.log("+++ OnScroll上拉加载事件 +++");
        this.bottomStatus = "loading";
        // 上拉加载事件
        this.bottomMethod();
      }

      // lastRefreshTop
      this.lastRefreshTop = scrollTop;
    },

    // 导航栏有按钮点击事件
    rightItemClick() {
      this.items = this.moreItems;
      this.showMore = true;
      this.showActionSheet = true;
    },
    // 配置 actionsheet items
    configItems() {
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
      this.moreItems = [takePhoto, album];
      this.delItems = [del];
      this.coverItems = [changeCover];
    },
    // actionSheet事件点击
    didClickItem(index) {
      console.log(index);
      if (index === 0) {
        // 取消按钮
        this.items = [];
        this.showMore = false;
        this.showDel = false;
        this.shwoCover = false;
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
      console.log("tarsss");
      this.tempMoment.showCmt = false;
    },
    xxoo(e) {
      console.log(e);
      console.log(e.target.nodeName);
      console.log(e.target.getAttribute("key"));
    },
    action() {
      console.log("----shhshshhs----");
    },
    // 跳转到用户信息
    skipToContactInfo(moment) {
      this.$router.push("/contacts/contact-info");
    },

    // 评论列表中item的点击事件
    commentItemDidClick(section, row, event) {
      console.log(event);
      console.log(event.target.nodeName);
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

      if (event.target.nodeName === "SPAN") {
        console.log("commeee");
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
            console.log(" +++++ come hear  baby ++++");
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
        // 有点赞数据
        if (thumb === 0) {
          // 取消点赞
          // 先拼接一个,
          moment.attitudesHtml = moment.attitudesHtml + ",";
          // &nbsp;&nbsp;<span>UI中国</span>,&nbsp;&nbsp;<span>photoshop资源库</span>,&nbsp;&nbsp;<span>Lightroom资源库</span>,&nbsp;&nbsp;<span>Mike-乱港三千-Mr_元先森</span>,

          // 删除
          let regExpStr =
            "&nbsp;&nbsp;" + "<span>" + this.user.screen_name + "</span>" + ",";
          let regExp = new RegExp(regExpStr);
          moment.attitudesHtml = moment.attitudesHtml.replace(regExp, "");
          // 删除,
          moment.attitudesHtml = moment.attitudesHtml.substring(
            0,
            moment.attitudesHtml.length - 1
          );
          console.log("取消点赞");
          console.log(moment.attitudesHtml);
          console.log(moment);
        } else {
          // 点赞
          if (moment.attitudes_list.length > 1) {
            moment.attitudesHtml = moment.attitudesHtml + ",";
          }
          // 拼接数据
          moment.attitudesHtml =
            moment.attitudesHtml +
            "&nbsp;&nbsp;" +
            "<span>" +
            this.user.screen_name +
            "</span>";
        }
      }

      console.log("点赞数据列表");
      console.log(moment);
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
        this.topStatus = "";
        this.moveDistance = 0;
      }, 5000);
    },
    // 上拉加载事件
    bottomMethod() {
      let page = this.page + 1;
      // 模拟一下网络请求数据
      setTimeout(() => {
        console.log("++++ 上拉加载事件 ++++ " + page);
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
        }
        this.moments.push(...temps);
        // dom更新
        this.$nextTick(() => {
          this.handleDomDatas(start);
        });
      }, 2500);
    },

    // 数据web处理
    handleWebDatas(ms) {
      // 数据处理
      let temps = [];
      if (!utils.objIsArray(ms)) return temps;

      ms.forEach((element, iii) => {
        if (iii === 0) {
          console.log("数据快报");
          console.log(element);
        }
        // 增加辅助属性
        // 全文/收起 <默认让其全部展开，以便获取到文本的最大高度>
        element.unfold = true;
        // 是否显示 全文/收起
        element.showUnfold = false;
        // 是否显示评论 一进来都不显示
        element.showCmt = false;

        // 针对正文做处理
        element.text = this.regexContent(element.text);

        // 1.针对图片处理
        element.pic_infos = element.pic_infos || [];
        // 图片盒子的样式 <PS：只需要处理 四张图的场景即可，其他场景靠内部图片撑开>
        element.picsWrapperStyle = {};
        let length = element.pic_infos.length;
        if (length > 0) {
          // 先循环一波，配置backgroundImage
          for (let i = 0; i < length; i++) {
            // 取出对象
            let pic = element.pic_infos[i];
            let picStyle = {
              backgroundImage: "url(" + pic.bmiddle.url + ")"
            };
            // 设置图片样式
            pic.picStyle = picStyle;
          }

          // 只处理1张图和4张图的情况
          if (length === 1) {
            // 1张图
            let maxW = 86 * 2 + 12;
            let maxH = 180;

            // 取出对象
            let pic = element.pic_infos[0];
            let bmiddle = pic.bmiddle;

            // 数据处理
            let picW = 0;
            let picH = 0;
            if (
              pic.keep_size === 1 ||
              bmiddle.width < 1 ||
              bmiddle.height < 1
            ) {
              /// 固定方形
              picW = picH = maxW;
            } else {
              /// 等比显示
              if (bmiddle.width < bmiddle.height) {
                picW = (bmiddle.width / bmiddle.height) * maxH;
                picH = maxH;
              } else {
                picW = maxW;
                picH = (bmiddle.height / bmiddle.width) * maxW;
              }
            }
            // 新增属性
            pic.picStyle.width = picW + "px";
            pic.picStyle.height = picH + "px";
          } else if (length === 4) {
            // 4张图
            element.picsWrapperStyle.width = 86 * 2 + 2 * 6 + "px";
          }
        }

        // 点赞列表
        element.attitudes_list = element.attitudes_list || [];
        let len1 = element.attitudes_list.length;
        // 用来添加地点赞 user
        let attitudes = [];
        // 不管有木有点赞，先给我拼个 点赞❤️
        element.attitudesHtml = this.attitudesIcon;
        for (let i = 0; i < len1; i++) {
          // 取出user
          const user = element.attitudes_list[i];
          // 拼接数据
          let screenNameHtml =
            "&nbsp;&nbsp;" + "<span>" + user.screen_name + "</span>";
          // 添加数据
          attitudes.push(screenNameHtml);
        }
        if (attitudes.length > 0) {
          // 用,拼接 默认是按,拼接
          let attitudesHtml = attitudes.join();
          //  辅助属性
          element.attitudesHtml = element.attitudesHtml + attitudesHtml;
        }

        // 评论列表
        element.comments_list = element.comments_list || [];
        let len2 = element.comments_list.length;
        for (let i = 0; i < len2; i++) {
          // 取出comment
          const comment = element.comments_list[i];
          // 评论内容
          let text = "：" + comment.text;
          // 来源
          let fromUser = "<span>" + comment.from_user.screen_name + "</span>";
          // 是否有toUser
          let toUser = "";
          if (comment.to_user) {
            toUser =
              "回复" + "<span>" + comment.to_user.screen_name + "</span>";
          }

          text = this.regexContent(text);

          // 评论内容
          let commentHtml = fromUser + toUser + text;
          // 拓展属性
          comment.commentHtml = commentHtml;
        }
        // 压栈
        temps.push(element);
      });

      return temps;
    },

    // 处理dom数据 start 起始索引
    handleDomDatas(start) {
      if (this.$refs.content === undefined) return;
      // 获取DOM元素列表
      this.$refs.content;
      let length = this.$refs.content.length;
      for (let i = start; i < length; i++) {
        // 取出元素
        const element = this.$refs.content[i];
        // 取出数据
        const moment = this.moments[i];
        // 获取文本内容高度
        let contentH = window
          .getComputedStyle(element)
          .height.replace("px", "");
        // 判断
        if (contentH > 5 * 20) {
          moment.unfold = false;
          moment.showUnfold = true;
        } else {
          moment.unfold = true;
          moment.showUnfold = false;
        }
      }
    },

    // 对内容做正则处理
    regexContent(text) {
      // 1 链接正则
      // let regexLinkUrl = /(http[s]?:\/\/([\w-]+.)+([:\d+])?(\/[\w-\.\/\?%&=]*)?)/gi;
      let regexLinkUrl = new RegExp(
        "((http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)|(www.[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)",
        "gi"
      );
      // 匹配到链接数据
      let linkUrlResults = text.match(regexLinkUrl) || [];
      // 数组去重
      linkUrlResults = utils.uniqueArray(linkUrlResults);

      // 2 🔥手机或电话正则
      // - [一组匹配中国大陆手机号码的正则表达式](https://github.com/VincentSit/ChinaMobilePhoneNumberRegex)
      // let regexPhoneNumber = /((((13[0-9])|(15[^4])|(18[0,1,2,3,5-9])|(17[0-8])|(147))\d{8})|((\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}))+?/g; // 这个也可以
      let regexPhoneNumber = /((?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[35678]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|66\d{2})\d{6})+?/g;
      // 匹配到的电话号码
      let phoneResults = text.match(regexPhoneNumber) || [];
      // 数组去重
      phoneResults = utils.uniqueArray(phoneResults);

      // 3 匹配话题 #xxx#
      let regexTopic = /#[^@#]+?#/g;
      let topicResults = text.match(regexTopic) || [];
      // 数组去重
      topicResults = utils.uniqueArray(topicResults);

      // 3 at @xxx
      let regexAt = /@[-_a-zA-Z0-9\u4E00-\u9FA5]+/g;
      let atResults = text.match(regexAt) || [];
      // 数组去重
      atResults = utils.uniqueArray(atResults);

      // 4.表情正则 \[[^ \\[\]]+?\]    <PS: 先匹配@，再匹配表情，因为表情里面有 @3x @2x>
      let regexEmoticon = /\[[^ \\[\]]+?\]/g;
      // 匹配到表情数据 PS 由于表情是[xxx]，所以不需要去重
      let emoticonResults = text.match(regexEmoticon) || [];

      // 做资源拼接
      // 匹配的链接数据
      for (let i = 0; i < linkUrlResults.length; i++) {
        // value
        const value = linkUrlResults[i];
        // 内容
        let el = "<span>" + value + "</span>";
        // 替换
        let regex = new RegExp(value, "g");
        //
        console.log("链接  " + regex);
        text = text.replace(regex, el);
      }

      // 匹配的电话号码数据
      for (let i = 0; i < phoneResults.length; i++) {
        // value
        const value = phoneResults[i];
        // 内容
        let el = "<span>" + value + "</span>";
        // 替换
        let regex = new RegExp(value, "g");
        text = text.replace(regex, el);
      }

      // 匹配的话题数据
      for (let i = 0; i < topicResults.length; i++) {
        // value
        const value = topicResults[i];
        // 内容
        let el = "<span>" + value + "</span>";
        // 替换
        let regex = new RegExp(value, "g");
        text = text.replace(regex, el);
      }

      // 匹配的@数据
      for (let i = 0; i < atResults.length; i++) {
        // value
        const value = atResults[i];
        // 内容
        let el = "<span>" + value + "</span>";
        // 替换
        let regex = new RegExp(value, "g");
        text = text.replace(regex, el);
      }

      // 匹配的表情
      for (let i = 0; i < emoticonResults.length; i++) {
        // 匹配到的key
        const key = emoticonResults[i];
        // 取出图片地址
        let src = emoticons[key];
        // 没有表情
        if (!src) continue;
        // 图片拼接
        let pic = "<img src=" + "'" + src + "'" + " width='18' height='18'>";
        // 替换
        text = text.replace(key, pic);
      }

      return text;
    }
  },
  // 定义一个过滤器
  filters: {
    // 👉 🔥 JS将时间戳转换
    // - [JS将时间戳转换为刚刚、N分钟前、今天几点几分、昨天几点几分等表示法](https://www.cnblogs.com/taochengyong/p/9341986.html)
    // 朋友圈时间格式化
    dateFormat(srcDate) {
      // 转成时间戳 秒 "Tue Apr 09 18:50:03 +0800 2018"
      let timestamp = Date.parse(srcDate) / 1000;

      // 拼接 0 的操作
      function zeroize(num) {
        return (String(num).length == 1 ? "0" : "") + num;
      }

      var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
      var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数
      var tmDate = new Date(timestamp * 1000); // 参数时间戳转换成的日期对象

      var Y = tmDate.getFullYear(),
        m = tmDate.getMonth() + 1,
        d = tmDate.getDate();

      if (timestampDiff < 60) {
        // 一分钟以内
        return "刚刚";
      } else if (timestampDiff < 3600) {
        // 一小时以内 xx分钟前
        return Math.floor(timestampDiff / 60) + "分钟前";
      } else if (timestampDiff < 86400) {
        // 一天之之内 xx小时前
        return Math.floor(timestampDiff / 3600) + "小时前";
      } else if (timestampDiff < 86400 * 2) {
        // 二天之内 昨天
        return "昨天";
      } else if (timestampDiff < 86400 * 365) {
        // 一年之内 xxx天前
        return Math.floor(timestampDiff / 86400) + "天前";
      } else {
        // 超过一年 yyyy年MM月dd日
        return Y + "年" + zeroize(m) + "月" + zeroize(d) + "日";
      }
    }
  },
  computed: {
    //
    transform() {
      return { transform: `translate3d(0,${this.moveDistance}px, 0)` };
    },

    // 刷新ball样式处理
    refreshStyle() {
      // 控制刷新小球的状态
      var cy = this.moveDistance;
      let opacity = cy > this.topDistance ? 1 : 0;
      let top = -30;
      let transform = "";
      let duration = "0.2s";
      let property = "";
      // 正在刷新
      if (this.topStatus === "loading") {
        // 正在刷新的过程中，小球可以根据页面滚动而滚动
        top = Math.max(-30, 60 - this.lastRefreshTop);
        opacity = 1;
        transform = "";
      } else {
        // 正在touchmove, 只控制显示or隐藏，不做top处理
        if (this.touchSate === 2) {
          top = cy > this.topDistance ? 60 : this.lastRefreshTop;
          transform = "rotate(" + -cy * 3 + "deg)";
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

    ...mapState({
      // 当前用户
      user: state => state.user
    })
  },
  watch: {},
  components: {
    actionSheet,
    MomentOperationMore,
    MomentProfile
  }

  // 🔥👉vue在v-html中绑定事件
  // https://blog.csdn.net/fangdengfu123/article/details/84992278
  // https://blog.csdn.net/qq_25075279/article/details/84646782
  // https://blog.csdn.net/qq_31393401/article/details/81017912
};
</script>

<style scoped>
/* 🔥 弹簧动效 https://www.w3cplus.com/animation/spring-animation-in-css.html */
.fade-enter-active,
.fade-leave-active {
  width: 181px;
  height: 40px;
  transition: width 0.25s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  width: 0;
  height: 40px;
}

/* 下拽回弹动画 */
.moment__dropped {
  transition: 0.25s;
}

.kkk {
  opacity: 1;
  top: 60px;
  animation: rotale 1.25s linear infinite;
  -webkit-animation: rotale 1.25s linear infinite;
}
@keyframes rotale {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 点击高亮 */
.mh-moment--tap-highlight {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  color: inherit;
}
.mh-moment--tap-highlight:active {
  background-color: #c7c7c5;
}
.moment__wrapper {
  position: relative;
  font-size: 17px;
  height: 100%;
  width: 100%;
  /*
  https://segmentfault.com/q/1010000012872663 
  和你的页面布局有关。
正常情况下滚动条是属于 html 的，页面撑开可以正常获取document.documentElement.scrollTop。
在滚动条属于 html 或 body 的情况下document.body.scrollTop || document.documentElement.scrollTop能正常拿到相应值。

如果都为0，那说明：

当前滚动条位置就是在顶部。
没有产生滚动。
你当前的滚动条不再属于 html 或者 body。
其它我没想到的= =。 

*/
  overflow: scroll;
  background-color: #fff;
}

/* 单条说说--Start */
.mh-moment {
  padding: 10px 20px 0;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: flex-start;
  -webkit-align-items: flex-start;
  align-items: flex-start;

  background-color: #fff;
  font-size: 16px;
}

.mh-moment::after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  color: #d8d8d8;
  background-color: #d8d8d8;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}

.mh-moment__hd img {
  margin-right: 10px;
  width: 44px;
  height: 44px;
  border-radius: 4px;
}

.mh-moment__bd {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}

.mh-moment__name {
  color: #5b6a91;
  font-size: 16px;
  font-weight: 500;
  padding-bottom: 6px;
}

.moment__content-wrapper {
  padding-bottom: 10px;
}
.mh-moment__content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 24px;
  font-size: 16px;
}
.mh-moment__content >>> img {
  vertical-align: text-bottom;
}

.mh-moment__content >>> span {
  color: #4380d1;
}

.mh-moment__content >>> span:active {
  background-color: #c7c7c5;
}

.mh-moment__content.fold {
  -webkit-line-clamp: 5;
}

.mh-moment__content.unfold {
  -webkit-line-clamp: 100;
}

/* 全文/收齐 */
.mh-moment__expand {
  color: #5b6a91;
  padding-top: 10px;
}

.mh-moment__pictures {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  flex-flow: row wrap;
}

.mh-moment__pic {
  width: 86px;
  height: 86px;
  margin-right: 6px;
  margin-bottom: 6px;
  /* 👉 🔥 Vue 的style绑定显示background-image
  *  - [本地](https://www.cnblogs.com/anns/p/8565033.html) 
  *  - [远程](https://blog.csdn.net/qq_34664239/article/details/79106570)
  *  - [vue 动态加载图片src的解决办法](http://blog.csdn.net/Mr_YanYan/article/details/78783091)
  */
  /* background-image: url("http://ww4.sinaimg.cn/or360/dccb2f02gw1evo8ku5d1uj21kw7401ky.jpg"); */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.moment__location-wrapper {
  padding-top: 5px;
  color: #5b6a91;
  font-size: 14px;
}

.mh-moment__more-wrapper {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;

  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;

  justify-content: space-between;
  -webkit-justify-content: space-between;

  height: 41px;
}

.more-wrapper__operation {
  position: absolute;
  right: 30px;
}

.mh-moment__time {
  color: #b2b2b2;
  font-size: 14px;
}
.mh-moment__more {
  background-image: url("../../assets/images/moments/wx_albumOperateMore_25x25.png");
  background-size: cover;
  background-repeat: no-repeat;
  width: 25px;
  height: 25px;

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  color: inherit;
}
.mh-moment__more:active {
  background-image: url("../../assets/images/moments/wx_albumOperateMoreHL_25x25.png");
}

/* 评论盒子 */
.moment__comment-wrapper {
  position: relative;
  background-color: #f3f3f5;
}

/* 向上三角形 */
.moment__comment-wrapper::before {
  width: 0;
  height: 0;
  position: absolute;
  top: -6px;
  left: 10px;
  content: "";
  border-width: 0 6px 6px;
  border-color: transparent transparent #f3f3f5 transparent;
  border-style: solid;
  z-index: 2;
}

/* 点赞 */
.comment-wrapper__attitudes,
.comment-wrapper__comment {
  position: relative;
  font-size: 14px;
  color: black;
  padding: 6px 10px;
  line-height: 20px;
}

.comment-wrapper__attitudes::after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  color: rgb(236, 236, 236);
  background-color: rgb(236, 236, 236);
  z-index: 2;
}

/* https://cn.vuejs.org/v2/api/#v-html */
.comment-wrapper__attitudes >>> span {
  color: #5b6a91;
  font-weight: 500;
}
.comment-wrapper__attitudes >>> span:active {
  background-color: #c7c7c5;
}
.comment-wrapper__attitudes >>> img {
  vertical-align: text-top;
}

/* 问题： 父元素有 active ，子元素 也有active 会同时响应 */
.comment-wrapper__comment:active {
  background-color: #ced2de;
}

.comment-wrapper__comment >>> img {
  vertical-align: text-bottom;
}

.moment__profile {
  margin-top: -64px;
}
.moment__background {
  width: 100%;
  height: 100%;
  background: url(../../assets/images/moments/wx_around-friends_bg_320x568.png)
    no-repeat 0 0;
  background-size: contain;
  position: absolute;
  left: 0;
}

.moment__refresh {
  position: absolute;
  opacity: 0;
  left: 20px;
  top: -30px;
  z-index: 4;
  width: 30px;
  height: 30px;
  background: url(../../assets/images/moments/wx_album_refresh.png) no-repeat 0
    0;
  background-size: contain;
}
.comment-wrapper__comment >>> span {
  color: #5b6a91;
  font-weight: 500;
}
.comment-wrapper__comment >>> span:active {
  background-color: #c7c7c7;
}

.comment-wrapper__line {
  background-color: #fff;
  height: 16px;
}

.moment__video-wrapper {
  width: 103px;
  height: 181px;
  background: url(../../assets/images/moments/wx_video_cover.png) no-repeat 0 0;
  background-size: contain;
}
.video-wrapper__play {
  height: 100%;
  background-image: url(../../assets/images/moments/Fav_List_Video_Play_40x40.png);
  background-repeat: no-repeat;
  background-size: 40px 40px;
  background-position: center;
}

.video-wrapper__play:active {
  background-image: url(../../assets/images/moments/Fav_List_Video_Play_HL_40x40.png);
}

.moment__share-wrapper {
  background-color: #f3f3f5;
}
.moment__share-wrapper:active {
  background-color: #ced2de;
}
.share-wrapper__content {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 5px;
}

.share-wrapper__content .content__share-hd {
  margin-right: 5px;
  position: relative;
  width: 40px;
  height: 40px;
}
.content__share-hd img {
  width: 40px;
  height: 40px;
}

.share-wrapper__content .content__share-bd {
  flex: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  font-size: 13px;
}

.share-wrapper__content .content__share-bd p {
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  line-height: 20px;
  height: 20px;
}
.content__share-bd .content__title {
  vertical-align: top;
}
.content__share-bd .content__subtitle {
  color: #737373;
  font-size: 12px;
  vertical-align: bottom;
}
.content__share-hd .content__play {
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  position: absolute;
  background-image: url(../../assets/images/moments/GiftVideoPlayIcon_23x23.png);
  background-repeat: no-repeat;
  background-size: 23px 23px;
  background-position: center;
}
</style>
