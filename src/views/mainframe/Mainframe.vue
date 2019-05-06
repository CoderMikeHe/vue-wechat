<template>
  <div
    class="_full-content  _content-padding-top44 _content-padding-bottom49"
    id="xo"
    @click="ahk"
  >
    <NavigationBar
      :right-item="addItem"
      title="微信"
      @right-click="rightItemDidClicked"
    ></NavigationBar>
    <h3 style="height: 44px">检点点0</h3>
    <h3 style="height: 44px">检点点</h3>
    <h3 style="height: 44px">检点点</h3>
    <h3 style="height: 44px">检点点</h3>
    <h3 style="height: 44px">检点点</h3>
    <h3 style="height: 44px">检点点</h3>
    <h3 style="height: 44px">检点点</h3>
    <h3 style="height: 44px">检点点</h3>
    <h3 style="height: 44px">检点点0</h3>
    <h3 style="height: 44px">检点点0</h3>
    <h3 style="height: 44px">检点点</h3>
    <h3 style="height: 44px">检点点</h3>
    <h3 style="height: 44px">检点点</h3>
    <h3 style="height: 44px">检点点</h3>
    <h3 style="height: 44px">检点点</h3>
    <h3 style="height: 44px">检点点</h3>
    <h3 style="height: 44px">检点点</h3>
    <h3 style="height: 44px">检点点0</h3>
    <h3 style="height: 44px">检点点0</h3>
    <h3 style="height: 44px">检点点</h3>
    <h3 style="height: 44px">检点点</h3>
    <h3 style="height: 44px">检点点</h3>
    <h3 style="height: 44px">检点点</h3>
    <h3 style="height: 44px">检点点</h3>
    <h3 style="height: 44px">检点点</h3>
    <h3 style="height: 44px">检点点</h3>
    <h3 style="height: 44px">检点点0</h3>
    <h3 style="height: 44px">检点点222222</h3>

    <!-- mask -->
    <div
      class="mh-mainframe__mask"
      v-if="showMenu"
      @click.stop="showMenu = false"
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
export default {
  name: "mainframe",
  data() {
    return {
      // 添加按钮
      addItem: addItem,
      showMenu: false
    };
  },
  created() {
    console.log("我被嗲啊啊 ");
  },
  components: {},
  methods: {
    ahk() {
      var el = document.getElementById("xo");

      console.log(
        "el.scrollTop  ==== " + el.scrollTop + " ====== " + el.clientHeight
      );
      console.log(
        "document.documentElement.scrollTop  ==== " +
          document.documentElement.scrollTop
      );
      console.log("document.body.scrollTop  ==== " + document.body.scrollTop);
    },
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
    }
  }
};
</script>

<style scoped>
.kkkk {
  width: 100px;
  height: 100px;
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
</style>
