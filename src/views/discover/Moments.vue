// 朋友圈
<template>
  <div class="_full-container" @touchstart="touchstartAction">
    <div class="_full-content _content-padding-top44">
      <!-- 导航栏 -->
      <NavigationBar
        title="朋友圈"
        :left-item="backItem"
        :right-item="moreItem"
        @left-click="$router.back()"
        @right-click="rightItemClick"
      ></NavigationBar>

      <!-- 单条说说 -->
      <div class="mh-moment" v-for="(moment, index) in moments" :key="index">
        <!-- 头部 -->
        <div class="mh-moment__hd">
          <!-- 头像 -->
          <img :src="moment.user.profile_image_url" alt />
        </div>
        <!-- 身体 -->
        <div class="mh-moment__bd">
          <div class="mh-moment__name">
            <span class="mh-moment--tap-highlight">{{
              moment.user.screen_name
            }}</span>
          </div>
          <p
            class="mh-moment__content"
            :class="moment.unfold ? 'unfold' : 'fold'"
            ref="content"
          >
            {{ moment.text }}
          </p>
          <p class="mh-moment__expand" v-if="moment.showUnfold">
            <span
              class="mh-moment--tap-highlight"
              @click="moment.unfold = !moment.unfold"
              >{{ moment.unfold ? "收起" : "全文" }}</span
            >
          </p>
          <!-- 图片九宫格 -->
          <div class="mh-moment__pictures" :style="moment.picsWrapperStyle">
            <div
              class="mh-moment__pic"
              v-for="(pic, idx) in moment.pic_infos"
              :key="idx"
              :style="pic.picStyle"
            ></div>
          </div>

          <!-- 时间/来源/更多 -->
          <div class="mh-moment__more-wrapper">
            <p class="mh-moment__time">{{ moment.created_at | dateFormat }}</p>
            <transition name="fade">
              <MomentOperationMore
                class="more-wrapper__operation"
                v-if="moment.showCmt"
              ></MomentOperationMore>
            </transition>
            <div
              class="mh-moment__more"
              @click.stop="moreAction(moment)"
              @touchstart.stop
            ></div>
          </div>

          <!-- 点赞or评论 -->
          <div class="moment__comment-wrapper">
            <!-- 点赞列表 -->
            <div
              class="comment-wrapper__attitudes"
              v-html="moment.attitudesHtml"
              @click="xxoo($event)"
            ></div>
            <!-- 评论列表 -->
            <div
              class="comment-wrapper__comment"
              v-for="(cmt, idx) in moment.comments_list"
              :key="idx"
              v-html="cmt.commentHtml"
              @click="abcd"
            ></div>
            <!-- 分割线 -->
            <div class="comment-wrapper__line"></div>
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

export default {
  name: "moments",
  data() {
    return {
      moreItem: moreItem,
      items: [],
      moments: [],
      // 显示ActionSheet
      showActionSheet: false,
      // 全文或收起
      expanded: false,

      // 当前显示的moment
      tempMoment: {},
      ets: ""
    };
  },
  created() {
    // 配置action-sheet item
    this.configItems();

    // 数据额外处理
    MHMoments.moments.forEach(element => {
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
      // 用来添加 user
      let attitudes = [];
      for (let i = 0; i < len1; i++) {
        // 取出user
        const user = element.attitudes_list[i];
        // 拼接数据
        let screenNameHtml =
          "&nbsp;&nbsp;" + "<span>" + user.screen_name + "</span>";
        // 添加数据
        attitudes.push(screenNameHtml);
      }
      // 用,拼接 默认是,
      let attitudesHtml = attitudes.join();
      element.attitudesHtml =
        "<img src=" +
        require("../../assets/images/moments/wx_albumInformationLikeHL_15x15.png") +
        " width='15' height='15'>" +
        attitudesHtml;

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
  },
  methods: {
    rightItemClick() {
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
      this.items = [takePhoto, album];
    },
    didClickItem(index) {
      console.log(index);
    },
    moreAction(moment) {
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
    abcd(e) {
      console.log(e);
      console.log(e.target.nodeName);
      e.stopPropagation();
      if (e.target.nodeName === "SPAN") {
        console.log("commeee");
      }
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

      var curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
      var tmDate = new Date(timestamp * 1000); // 参数时间戳转换成的日期对象

      var Y = tmDate.getFullYear(),
        m = tmDate.getMonth() + 1,
        d = tmDate.getDate();

      var H = tmDate.getHours(),
        i = tmDate.getMinutes(),
        s = tmDate.getSeconds();

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
  computed: {},
  components: {
    actionSheet,
    MomentOperationMore
  }

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

/* 点击高亮 */
.mh-moment--tap-highlight {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  color: inherit;
}
.mh-moment--tap-highlight:active {
  background-color: #c7c7c5;
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
  padding-bottom: 8px;
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
  height: 40px;
  line-height: 40px;
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

  height: 43px;
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

/* 评论 */
</style>
