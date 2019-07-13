<template>
  <!-- https://www.cnblogs.com/mmzuo-798/p/10712009.html -->
  <div class="vue-route-transition">
    <!-- <transition :name="state.pageDirection" @leave="setRouterMap">
      <keep-alive v-if="this.keepAlive===true && $route.meta.keepAlive!==false">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </transition> -->
    <!-- <transition :name="state.pageDirection" @leave="setRouterMap">
      <keep-alive>
        <router-view
          v-if="keepAlive === true && $route.meta.keepAlive !== false"
        ></router-view>
      </keep-alive>
    </transition>
    <transition :name="state.pageDirection" @leave="setRouterMap">
      <router-view
        v-if="keepAlive === false || $route.meta.keepAlive === false"
      ></router-view>
    </transition> -->
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-on:after-leave="afterLeave"
      v-bind:css="false"
    >
      <keep-alive>
        <router-view
          v-if="keepAlive === true && $route.meta.keepAlive !== false"
        ></router-view>
      </keep-alive>
    </transition>
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-on:after-leave="afterLeave"
      v-bind:css="false"
    >
      <router-view
        v-if="keepAlive === false || $route.meta.keepAlive === false"
      ></router-view>
    </transition>
    <!-- <transition-group :name="state.pageDirection" @leave="setRouterMap">
      <keep-alive :key="1234">
      <router-view :key="2134" v-if="this.keepAlive===true && $route.meta.keepAlive!==false"></router-view>
      </keep-alive>
      <router-view :key="234" v-if="this.keepAlive===false || $route.meta.keepAlive===false"></router-view>
    </transition-group> -->
  </div>
</template>
<script>
// 全局的
var localSessionRouteChain = sessionStorage.getItem("$$routeChain") || [];
export default {
  name: "vue-route-transition",
  props: {
    keepAlive: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    try {
      localSessionRouteChain =
        this.$route.path !== "/" ? JSON.parse(localSessionRouteChain) : [];
      console.log("6666");
    } catch (error) {
      console.log("8888");
      localSessionRouteChain = [];
    }
    return {
      state: {
        addCount: localSessionRouteChain.length,
        routerMap: {},
        pageDirection: "fade",
        routeChain: localSessionRouteChain
      }
    };
  },
  methods: {
    // --------
    // 进入中
    // --------

    beforeEnter: function(el) {
      // ...
      console.log("beforeEnter", el);
      console.log(this.state.pageDirection);

      let dir = this.state.pageDirection;
      if (dir === "slide-left") {
        // 进入
        // el.style.transform = 'translate(100%, 0)'
      } else if (dir === "slide-right") {
        // 返回
        // el.style.transform = 'translate(-20%, 0)'
      } else {
        // fade
      }

      console.log(el.style.transform);
      console.log("-----------------");
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    enter: function(el, done) {
      // ...
      console.log("enter", el);
      console.log(this.state.pageDirection);
      console.log("-----------------");
      // eslint-disable-next-line no-unused-expressions
      el.offsetWidth;
      let dir = this.state.pageDirection;
      if (dir === "slide-left") {
        // 进入
        // el.style.transform = 'translate(0, 0)'
        // el.style.transition = 'all 0.4s'
        el.style.animation = "pageFromRightToCenter 5000ms forwards";
        el.style.zIndex = "10";
        el.style.boxShadow = " -3px 0 5px rgba(0, 0, 0, 0.1)";
      } else if (dir === "slide-right") {
        // 返回
        // el.style.transform = 'translate(0, 0)'
        // el.style.transition = 'transform 0.4s'
        el.style.animation = "pageFromLeftToCenter 5000ms forwards";
        el.style.zIndex = "1";
      } else {
        // fade
      }
      setTimeout(() => {
        done();
      }, 5000);
      // done()
    },
    afterEnter: function(el) {
      // ...
      console.log("afterEnter", el);
      console.log(this.state.pageDirection);
      console.log("-----------------");
    },

    // --------
    // 离开时
    // --------

    beforeLeave: function(el) {
      // ...
      console.log("beforeLeave", el);
      console.log(this.state.pageDirection);
      console.log("-----------------");

      let dir = this.state.pageDirection;
      if (dir === "slide-left") {
        // 进入
        // el.style.transform = 'translate(0, 0)'
      } else if (dir === "slide-right") {
        // 返回
        // el.style.transform = 'translate(0, 0)'
      } else {
        // fade
      }
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    leave: function(el, done) {
      // ...
      console.log("leave", el);
      console.log(this.state.pageDirection);
      let dir = this.state.pageDirection;
      let to = this.state.routerMap.to.replace(/\//g, "_");
      let from = this.state.routerMap.from.replace(/\//g, "_");
      console.log("setRouterMap", dir);
      console.log("setRouterMap", to);
      console.log("setRouterMap", from);
      console.log("-----------------");
      // eslint-disable-next-line no-unused-expressions
      el.offsetWidth;
      if (dir === "slide-left") {
        // el.style.transform = 'translate(-100%, 0)'
        // el.style.transition = 'all 0.4s'
        el.style.animation = "pageFromCenterToLeft 5000ms forwards";
        el.style.zIndex = "1";
      } else if (dir === "slide-right") {
        // 返回
        // el.style.transform = 'translate(100%, 0)'
        // el.style.transition = 'all 0.4s'
        el.style.animation = "pageFromCenterToRight 5000ms forwards";
        el.style.boxShadow = " -3px 0 5px rgba(0, 0, 0, 0.1)";
        el.style.zIndex = "10";
      } else {
        // fade
      }

      setTimeout(() => {
        done();
      }, 5000);
      // done()
    },
    afterLeave: function(el) {
      // ...
      console.log("afterLeave", el);
      console.log(this.state.pageDirection);
      console.log("-----------------");
    },

    addRouteChain(route) {
      console.log("addRouteChain - ", this.state.addCount);
      console.log("addRouteChain - ", localSessionRouteChain.length);
      if (this.state.addCount === 0 && localSessionRouteChain.length > 0) {
        // 排除刷新的时候
        this.state.addCount = 1;
        console.log("哭泣哭泣");
      } else {
        if (
          this.state.addCount === 0 ||
          (this.state.addCount !== 0 &&
            this.state.routeChain[this.state.routeChain.length - 1].path !==
              route.path)
        ) {
          // 入栈
          this.state.routeChain.push({
            path: route.path
          });
          // 存储
          sessionStorage.setItem(
            "$$routeChain",
            JSON.stringify(this.state.routeChain)
          );
          // 添加数
          this.state.addCount++;
        }
      }
    },
    popRouteChain() {
      this.state.routeChain.pop();
      sessionStorage.setItem(
        "$$routeChain",
        JSON.stringify(this.state.routeChain)
      );
    },
    setPageDirection({ dir, to, from }) {
      this.state.pageDirection = dir;
      this.state.routerMap["to"] = to.path;
      this.state.routerMap["from"] = from.path;
    },
    setRouterMap() {
      console.log("🐴setRouterMap", this.$route);
      let dir = this.state.pageDirection;
      let to = this.state.routerMap.to.replace(/\//g, "_");
      let from = this.state.routerMap.from.replace(/\//g, "_");
      console.log("setRouterMap", dir);
      console.log("setRouterMap", to);
      console.log("setRouterMap", from);
      try {
        if (dir === "slide-left") {
          // 进入
          console.log("进入");
          this.state.routerMap[from] = document.getElementById(from).scrollTop;
        } else if (dir === "slide-right") {
          // 返回
          console.log("返回");
          if (this.keepAlive === true && this.$route.meta.keepAlive !== false) {
            document.getElementById(to).scrollTop = this.state.routerMap[to];
          }
        } else {
        }
      } catch (error) {}
    }
  },
  mounted() {
    console.log("vue-route-transition");
    this.$router.beforeEach((to, from, next) => {
      console.log("🐴beforeEach");
      console.log(to);
      console.log(from);

      // 定义一个可以记录路由路径变化的数据，这里用sessionStorage,或者在window.routeChain等变量
      let routeLength = this.state.routeChain.length;

      console.log("routeLength -- ", routeLength);
      console.log("state.addCount -- ", this.state.addCount);
      if (routeLength === 0 || this.state.addCount === 0) {
        console.log("🔥-1");
        this.setPageDirection({ dir: "slide-left", to, from });
        this.addRouteChain(from);
        this.addRouteChain(to);
      } else if (routeLength === 1) {
        console.log("🔥-2");
        this.setPageDirection({ dir: "slide-left", to, from });
        this.addRouteChain(to);
      } else {
        console.log("🔥-3");
        let lastBeforeRoute = this.state.routeChain[routeLength - 2];
        if (lastBeforeRoute.path === to.path && to.meta.slideLeft !== true) {
          console.log("🔥-4");
          this.popRouteChain();
          this.setPageDirection({ dir: "slide-right", to, from });
        } else {
          console.log("🔥-5");
          this.addRouteChain(to);
          this.setPageDirection({ dir: "slide-left", to, from });
        }
      }
      console.log("🔥😪🔥");
      console.log(this.state);
      next();
    });
  },
  created() {
    // console.log('created😁😁😁  ', this.$route.meta)
    // console.log('created😁😁😁  ', this.state)
  },
  activated() {
    // console.log('activated😁😁😁  ', this.$route.meta)
    // console.log('activated😁😁😁  ', this.state)
  }
};
</script>

<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
}
.vue-route-transition {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  backface-visibility: hidden;
  perspective: 1000;
}
.fade-enter-active {
  animation: pageFadeIn 5000ms forwards;
}
@keyframes pageFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/*路由前进，退出*/
.slide-left-leave-active {
  animation: pageFromCenterToLeft 5000ms forwards;
  z-index: 1;
}

/*路由后退，进入*/
.slide-right-enter-active {
  animation: pageFromLeftToCenter 5000ms forwards;
  z-index: 1;
}

/*路由后退，退出*/
.slide-right-leave-active {
  animation: pageFromCenterToRight 5000ms forwards;
  z-index: 10;
  box-shadow: -3px 0 5px rgba(0, 0, 0, 0.1);
}

/*路由前进，进入*/
.slide-left-enter-active {
  animation: pageFromRightToCenter 5000ms forwards;
  z-index: 10;
  box-shadow: -3px 0 5px rgba(0, 0, 0, 0.1);
}

/*-------------------------------*/

/*路由前进，进入*/

@keyframes pageFromRightToCenter {
  from {
    /* left: 100%; */
    transform: translate3d(100%, 0, 0);
    opacity: 1;
  }
  to {
    /* left: 0; */
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

/*路由前进，退出*/

@keyframes pageFromCenterToLeft {
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    /* left:0; */
  }
  to {
    opacity: 0.5;
    transform: translate3d(-20%, 0, 0);
    /* left:-20%; */
  }
}

/*路由后退，进入*/

@keyframes pageFromLeftToCenter {
  from {
    opacity: 0.5;
    transform: translate3d(-20%, 0, 0);
    /* left: -20%; */
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    /* left: 0; */
  }
}

/*路由后退，退出*/

@keyframes pageFromCenterToRight {
  from {
    /* left: 0; */
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  to {
    /* left: 100%; */
    transform: translate3d(100%, 0, 0);
    opacity: 1;
  }
}
</style>
