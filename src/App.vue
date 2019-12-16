<template>
  <!-- 🔥按需加载路由：- [另辟蹊径：vue单页面，多路由，前进刷新，后退不刷新](https://segmentfault.com/a/1190000012083511) -->
  <!-- - [vue-router 之 keep-alive](https://www.jianshu.com/p/0b0222954483) -->
  <!-- - [<keep-alive>组件缓存问题](https://github.com/vuejs/vue-router/issues/811) -->
  <!-- <div class="app__wrapper">
    <transition
      name="custom-classes-transition"
      :enter-active-class="enterAnimate"
      :leave-active-class="leaveAnimate"
    >
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition
      name="custom-classes-transition"
      :enter-active-class="enterAnimate"
      :leave-active-class="leaveAnimate"
    >
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div> -->
  <!-- 启动页 -->
  <div id="app">
    <Launch></Launch>
    <!-- <router-view></router-view> -->
    <vue-route-transition :keepAlive="true"></vue-route-transition>
  </div>
</template>

<script>
import tabBar from "./components/tabBar/TabBar";
import navigationBar from "./components/navigationBar/NavigationBar";
import MHBarButtonItem from "./assets/js/MHBarButtonItem.js";
import Launch from "./components/launch/Launch";
export default {
  name: "app",
  components: {
    Launch
  },
  data() {
    return {
      blackBackItem: new MHBarButtonItem(
        "返回",
        "./assets/images/navBar/nav_bar_black_back_arrow.png",
        1
      ),
      enterAnimate: "", // 页面进入动效
      leaveAnimate: "" // 页面离开动效
    };
  },

  watch: {
    // 监听路由变化 设置页面的过度效果
    $route(to, from) {
      // console.log(to, from);
      const toDepth = 3;
      //  to.path.split("/").length;
      const fromDepth = 2;
      //  from.path.split("/").length;

      console.log(toDepth + this.enterAnimate);
      console.log(fromDepth + this.leaveAnimate);

      //同一级页面无需设置过渡效果
      if (toDepth === fromDepth) {
        this.enterAnimate = "";
        this.leaveAnimate = "";
        return;
      }

      // 动画
      this.enterAnimate =
        toDepth > fromDepth
          ? "animated slideInRight faster"
          : "animated slideInLeft faster";
      this.leaveAnimate =
        toDepth > fromDepth
          ? "animated slideOutLeft faster"
          : "animated slideOutRight faster";
    }
  },
  mounted() {
    console.log("appvue");
    console.log(this.$route.meta);
  },
  created() {}
};
</script>

<style scoped>
/* app 容器 */
#app {
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
}

/*
//一些常用的正则表达式
export default {
  //电话号码
  isTelCode(str) {
    let reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
    return reg.test(str);
  },
  //邮件正则
  IsEmail(str) {
    let reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
    return reg.test(str);
  },
  // 用户名 密码正则  --- 以小写字母开头 支持小写字母和数字,总长度6-16位
  IsUserPassword(str) {
    let reg = /^[a-z]{1}[a-z0-9]{5,15}$/;
    return reg.test(str);
  },
  // 必须有数字和小写英文的正则表达   6-16位
  IsMustMa(str) {
    let reg = /^(?![0-9]+$)(?![a-z]+$)[0-9a-z]{6,16}$/;
    return reg.test(str);
  },
  //仅能输入大于0的数字
  IsZMath(str) {
    let reg = /^\+?[1-9][0-9]*$/;
    return reg.test(str);
  },
  //仅能输入数字或者字母大小写正则
  IsMathOrLatter(str){
    const reg =  /^[0-9a-zA-Z]+$/
    return reg.test(str)
  }
  ,
  IsMustNumber(str) {
    let reg = /^[0-9]*$/;
    return reg.test(str);
  },

  //车牌号码正则
  IsCpattern(str) {
    let reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    return reg.test(str);
  },
  //中文大小写字母正则
  IsChinaAa(str) {
    let reg = /^[\u4e00-\u9fa5_a-zA-Z]+$/;
    return reg.test(str);
  },
  //验证IP地址
  IsHttpIp(str) {
    let reg = /^http:\/\/([0-9]{1,3}\.){3}([0-9]){1,3}:([0-9]){1,4}$/;
    return reg.test(str);
  },
  //验证ip地址2
  isIpHost(str) {
    let reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
    return (reg = reg.test(str));
  },
  //验证身份证正则
  
  isIdCard(str){
    const reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    return reg.test(str)
  },
  //验证数字字符串
  isNumberFloat(str){
    const reg = /^\d+$|^\d+\.\d+$/g;
    return reg.test(str)
  }
};
*/
</style>
