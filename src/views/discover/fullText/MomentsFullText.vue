<template>
  <div class="_full-container">
    <NavigationBar
      :left-item="blackBackItem"
      @left-click="$router.back()"
      title="全文"
    ></NavigationBar>
    <div class="_full-content _content-padding-top44">
      <!-- 正文wrapper -->
      <div :style="style">
        <p
          class="mh-moment__content"
          ref="content"
          v-html="moment.textHtml"
          @click="contentDidClick"
        ></p>
      </div>
      <!-- ActionSheet -->
      <ActionSheet
        v-model="showActionSheet"
        @did-click-item="didClickItem"
        :items="items"
      ></ActionSheet>
    </div>
  </div>
</template>

<script>
import helper from "../moments/js/momentsHelper.js";
import ActionSheet, {
  ActionSheetItem
} from "components/actionSheet/ActionSheet";
export default {
  name: "moments-full-text",
  data() {
    return {
      moment: {},
      contentH: 0,
      // actionSheet 的数据源
      items: [],
      // 显示ActionSheet
      showActionSheet: false,
      // actionSheetTitle
      actionSheetTitle: "",
      // 电话号码items
      showPhoneNumber: false
    };
  },
  created() {
    this.moment = this.$route.params.moment;
  },
  mounted() {
    // 取出元素
    const element = this.$refs.content;
    // 获取样式
    let style = window.getComputedStyle(element);
    // 获取文本内容高度
    this.contentH = style.height.replace("px", "");
  },
  methods: {
    didClickItem(index) {
      console.log(index);
      if (index === 0) {
        return;
      }
      this.showPhoneNumber = false;
      this.actionSheetTitle = "";
    },
    // 微信正文点击事件
    contentDidClick(event) {
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
        this.$router.push({
          name: "moments-other",
          params: {
            value: value
          }
        });
      }
    }
  },
  computed: {
    style() {
      // 🔥 获取屏幕的宽高
      // - [js获取移动端屏幕高度和宽度等设备尺寸](http://www.51xuediannao.com/javascript/jshqyddpmgdhkddsbcc_1021.html)
      let clientHeight = document.documentElement.clientHeight;
      let height = clientHeight - 44 + 16 + this.contentH * 1;
      return {
        padding: "16px",
        height: height + "px"
      };
    }
  },
  components: {
    ActionSheet
  }
};
</script>
<style src="../moments/css/moments.css" scoped></style>
