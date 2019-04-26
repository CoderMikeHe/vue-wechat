// 朋友圈
<template>
  <div class="_full-container" @touchstart="touchstartAction">
    <div class="_full-content" id="ko">
      <!-- 导航栏 -->
      <NavigationBar
        title="朋友圈"
        :left-item="backItem"
        :right-item="moreItem"
        @left-click="$router.back()"
        @right-click="rightItemClick"
      ></NavigationBar>
      <div class="moment__background"></div>
      <!-- refreBall -->
      <div
        class="moment__refresh"
        :style="refreshStyle"
        :class="{ kkk: refreshState === 2 }"
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
        <div :style="style">
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
                >
                  {{ moment.text || "" }}
                </p>
                <p class="mh-moment__expand" v-if="moment.showUnfold">
                  <span
                    class="mh-moment--tap-highlight"
                    @click="moment.unfold = !moment.unfold"
                    >{{ moment.unfold ? "收起" : "全文" }}</span
                  >
                </p>
              </div>

              <!-- 图片九宫格 -->
              <div
                class="mh-moment__pictures"
                :style="moment.picsWrapperStyle"
                v-if="moment.pic_infos.length > 0"
              >
                <div
                  class="mh-moment__pic"
                  v-for="(pic, idx) in moment.pic_infos"
                  :key="idx"
                  :style="pic.picStyle"
                ></div>
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
          <div class="weui-loadmore">
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
import MomentOperationMore from "./MomentOperationMore";
import MomentProfile from "./MomentProfile";
import { mapState } from "vuex";
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
      criticalPoint: 40,
      // touchState 触摸状态(0 touchend ; 1 touchstart ; 2 touchend)
      touchSate: 0,
      // 最后一次topValue
      lastTop: 0,
      // startScrollTop
      startScrollTop: 0
    };
  },
  destroyed() {
    console.log("++++++ 我已牺牲 ++++++");
  },
  created() {
    console.log("++++++ 重新创建 ++++++");

    // 配置action-sheet item
    this.configItems();

    // 数据额外处理
    MHMoments.moments.forEach((element, iii) => {
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
          if (pic.keep_size === 1 || bmiddle.width < 1 || bmiddle.height < 1) {
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
          toUser = "回复" + "<span>" + comment.to_user.screen_name + "</span>";
        }
        // 评论内容
        let commentHtml = fromUser + toUser + text;
        // 拓展属性
        comment.commentHtml = commentHtml;
      }

      // 压栈
      this.moments.push(element);
    });
  },
  mounted() {
    console.log("after");
    console.log(this.$refs.content);

    let winWidth = window.innerWidth;
    console.log("winWidth:" + winWidth);

    // 获取DOM元素列表
    let length = this.$refs.content.length;

    console.log("dom --length is " + length);

    for (let index = 0; index < length; index++) {
      const element = this.$refs.content[index];
      const moment = this.moments[index];

      let descHeight = window
        .getComputedStyle(element)
        .height.replace("px", "");

      if (descHeight > 5 * 20) {
        moment.unfold = false;
        moment.showUnfold = true;
      } else {
        moment.unfold = true;
        moment.showUnfold = false;
      }
      // console.log("descHeight:" + descHeight);
    }

    // 开始刷新
    this.refreshState = 2;
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
      let t1 = e.changedTouches[0];
      // console.log("start clientY==== " + t.clientY);
      // console.log("start pageY==== " + t.pageY);
      // console.log("start screenY==== " + t.screenY);
      // console.log("-------------------------------");
      // console.log("start clientY==== " + t1.clientY);
      // console.log("start pageY==== " + t1.pageY);
      // console.log("start screenY==== " + t1.screenY);
      this.startY = t.clientY;
      let scrollTop = document.getElementById("drag").scrollTop;
      console.log("startDrag ====  " + scrollTop);
      this.startScrollTop = scrollTop;
    },
    // 正在拖拽
    onDrag(e) {
      this.touchSate = 2;

      console.log(document.getElementById("drag"));
      console.log(document.getElementById("ko").scrollTop);
      console.log(document.body.scrollTop);
      console.log(document.documentElement.scrollTop);
      let scrollTop = document.getElementById("drag").scrollTop;
      console.log("onDrag ====  " + scrollTop);

      let t = e.targetTouches[0];

      // console.log("moving clientY==== " + t.clientY);
      // console.log("moving pageY==== " + t.pageY);
      // console.log("moving screenY==== " + t.screenY);
      console.log("moving move before ==== " + (t.clientY - this.startY));

      // 如果滚动条已经在顶部了。就没必要做下拉刷新了,且会触发 onscroll 事件
      if (scrollTop > 0) {
        return;
      }
      if (this.startScrollTop > 0 && scrollTop === 0) {
        // 从已经下滑一段距离向下拖拽，会导致 move 距离很大，当到达临界点的时候，突然掉下来 影响用户体验
        this.startY = t.clientY - 1;
        this.startScrollTop = 0;
      }

      let move = t.clientY - this.startY;
      console.log("moving move after ==== " + move);
      // 判断手指滑动的距离，只有为正数才代表用户下拉了。
      if (move > 0) {
        let move = t.clientY - this.startY;
        // 阻止默认事件，在微信浏览器中尤为有用，至于为什么，你去试就知道了。
        e.preventDefault();
        // 增加滑动阻力的感觉
        let d = Math.pow(move, 0.8);
        // let k = d - this.startScrollTop;
        // console.log("开始时的startScrollTop === " + this.startScrollTop);
        // console.log("差值计算值 === " + k);
        this.moveDistance = d;
        console.log("moving distance ====== " + Math.pow(move, 0.8));
        // 正在刷新 后面就不用区分状态了
        if (this.refreshState === 2) {
          this.lastTop = 0;
          return;
        } else {
          if (d > this.criticalPoint) {
            this.lastTop = 60;
          }
        }
        // 如果大于临界点，释放即可刷新 的状态
        if (this.moveDistance > this.criticalPoint) {
          // 减少计算型属性的计算
          if (this.refreshState === 1) return;
          // 释放即可刷新
          this.refreshState = 1;
        } else {
          // 减少计算型属性的计算
          if (this.refreshState === 0) return;
          // 下拉即可刷新
          this.refreshState = 0;
        }
      }
    },
    // 结束拖拽
    stopDrag(e) {
      let scrollTop = document.getElementById("drag").scrollTop;
      console.log("stopDrag ====  " + scrollTop);

      this.touchSate = 0;
      if (this.refreshState === 2) {
      } else {
        this.lastTop = 0;
      }
      // 只要手指拿开，我都需要加上结束时的动画，这里为300ms
      this.duration = 300;

      if (this.moveDistance > this.criticalPoint) {
        // 这里逻辑跟touchMove一样，但是需要真的加载数据了，那refreshState变为2 所以加载动画在这出现
        this.refreshState = 2;
        // this.$emit("refresh", () => {
        //   //这里就是成功后的回调了，如果该函数被调用，那就以为着加载数据完成，所以状态要回到0，当然需要在父组件调用。
        //   this.refreshState = 0;
        // });
      }

      // 微信结束了拖拽，都得归0处理
      this.moveDistance = 0;
    },

    // 一旦 scrollTop >0 就会触发onscroll
    onScroll(e) {
      let ele = document.getElementById("drag");
      console.log("+++ start +++");
      console.log("onScroll-scrollTop   ==== ", e.target.scrollTop);
      console.log("onScroll-scrollTop   ==== ", ele.scrollTop);
      console.log("onScroll-scrollHeight   ==== ", ele.scrollHeight);
      console.log("onScroll-scrollHeight   ==== ", ele.clientHeight);
      console.log("+++ end +++");

      // 滚动条位置
      let scrollTop = e.target.scrollTop;
      // lastTop
      this.lastTop = scrollTop;
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
    style() {
      return {
        transition: `${this.duration}ms`,
        transform: `translate3d(0,${this.moveDistance}px, 0)`
      };
    },

    // 刷新ball样式处理
    refreshStyle() {
      // 控制刷新小球的状态
      var cy = this.moveDistance;
      let opacity = cy > 40 ? 1 : 0;
      let top = -30;
      let transform = "";
      let transition = "";

      // 正在刷新
      if (this.refreshState === 2) {
        console.log(
          "正在刷新 touchState ===== " +
            this.touchSate +
            "lastTop ===== " +
            this.lastTop
        );
        // 正在刷新的过程中，小球可以根据页面滚动而滚动
        top = 60 - this.lastTop;
        opacity = 1;
        transform = "";
        transition = "";
      } else {
        // 正在touchmove, 只控制显示or隐藏，不做top处理
        if (this.touchSate === 2) {
          console.log(
            "正在拖拽 touchState ===== " +
              this.touchSate +
              "  " +
              "lastTop ===== " +
              this.lastTop
          );
          top = cy > this.criticalPoint ? 60 : this.lastTop;
          transform = "rotate(" + -cy * 3 + "deg)";
          transition = "top 0.2s ease";
        } else if (this.touchSate === 0) {
          console.log(
            "借宿拖拽 touchState ===== " +
              this.touchSate +
              "  " +
              "lastTop ===== " +
              this.lastTop
          );
          transition = "all 0.2s ease";
        }
      }
      // 返回样式
      return {
        top: top + "px",
        transition: transition,
        opacity: opacity,
        transform: transform
      };
    },

    ...mapState({
      // 当前用户
      user: state => state.user
    })
  },
  watch: {
    //这里是给用户操作返回的核心
    refreshState(state) {
      // 我们监听refreshState的状态，
      // 0意味着开始也意味着结束，这里是结束，并且只有动画生效我们才能 moveDistance 设为0，
      // 为什么动画生效才行，因为动画生效意味着手指离开了屏幕，如果不懂去看touchEnd方法，这时
      // 我们让距离变为0才会有动画效果。

      if (state === 0) {
        console.log("+++++ 下拉即可刷新 +++++");
        if (state === 0 && this.duration === 300) {
          this.moveDistance = 0;
        }
      } else if (state === 1) {
        console.log("+++++ 松手即可刷新 +++++");
      } else {
        console.log("+++++ 正在刷新 +++++");
        setTimeout(() => {
          this.refreshState = 0;
        }, 5000);
      }
    }
  },
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
  line-height: 20px;
  font-size: 16px;
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
  line-height: 18px;
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
  top: -414px;
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
</style>
