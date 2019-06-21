<template>
  <div class="_full-container">
    <div class="_full-content _content-padding-top44">
      <!-- 导航栏 -->
      <NavigationBar
        :left-item="leftItem"
        @left-click="$router.back()"
        :right-item="rightItem"
        @right-click="navRightItemAction"
        title="设置语言"
      ></NavigationBar>
      <!-- language -->
      <div class="weui-cells weui-cells_radio">
        <label
          class="weui-cell weui-check__label"
          v-for="(lan, index) in languages"
          :key="index"
        >
          <div class="weui-cell__bd">
            <p>{{ lan }}</p>
          </div>
          <div class="weui-cell__ft">
            <input
              type="radio"
              class="weui-check"
              id="lan"
              :value="lan"
              v-model="language"
            />
            <span class="weui-icon-checked"></span>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import MHBarButtonItem from "@/assets/js/MHBarButtonItem.js";
export default {
  name: "language-picker",
  components: {},
  data() {
    return {
      languages: [],
      language: "简体中文",
      // 点击完成,置为true
      completed: false,
      leftItem: new MHBarButtonItem("取消", "", 0),
      rightItem: new MHBarButtonItem("完成", "", 0)
    };
  },
  created() {
    console.log(this.$route.params);
    this.language = this.$route.params.language;
    this.configTitles();
  },
  activated() {},
  methods: {
    configTitles() {
      /// https://www.zybang.com/question/8b478510701184609e88eec8d869f87e.html 国家语言列表 拿走不谢
      let titles = [
        "简体中文",
        "繁體中文（台灣）",
        "繁體中文（香港）",
        "English",
        "Bahasa Indonesia",
        "Bahasa Melayu",
        "español",
        "한국어",
        "Italiano",
        "日本語",
        "Polski",
        "Português",
        "Русский",
        "ภาษาไทย",
        "Tiếng Việt",
        "العربية",
        "हिन्दी",
        "עברית",
        "Türkçe",
        "Deutsch",
        "Français"
      ];
      this.languages = titles;
    },
    navRightItemAction() {
      this.completed = true;
      // 返回
      this.$router.back();
    }
  },
  // 导航守卫
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    if (this.completed) {
      // 🔥 - [路由反向传参](https://www.cnblogs.com/buerjj/archive/2017/11/26/7900696.html)
      to.params.language = this.language;
    }
    // 调用next
    next();
  }
};
</script>

<style scoped>
.weui-cells {
  margin-top: 0;
  line-height: 1;
}
</style>
