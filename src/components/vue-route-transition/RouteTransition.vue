<template>
  <div class="vue-route-transition">
    <transition :name="state.pageDirection" @leave="setRouterMap">
      <keep-alive
        v-if="this.keepAlive === true && $route.meta.keepAlive !== false"
      >
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </transition>
  </div>
</template>
<script>
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
    } catch (error) {
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
    addRouteChain(route) {
      if (this.state.addCount === 0 && localSessionRouteChain.length > 0) {
        // 排除刷新的时候
        this.state.addCount = 1;
      } else {
        if (
          (this.state.addCount !== 0 &&
            this.state.routeChain[this.state.routeChain.length - 1].path !==
              route.path) ||
          this.state.addCount === 0
        ) {
          this.state.routeChain.push({
            path: route.path
          });
          sessionStorage.setItem(
            "$$routeChain",
            JSON.stringify(this.state.routeChain)
          );
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
      let dir = this.state.pageDirection;
      let to = this.state.routerMap.to.replace(/\//g, "_");
      let from = this.state.routerMap.from.replace(/\//g, "_");
      console.log("setRouterMap", dir);
      console.log("setRouterMap", to);
      console.log("setRouterMap", from);
      try {
        if (dir === "slide-left") {
          // 进入
          this.state.routerMap[from] = document.getElementById(from).scrollTop;
        } else if (dir === "slide-right") {
          // 返回
          if (this.keepAlive === true && this.$route.meta.keepAlive !== false) {
            document.getElementById(to).scrollTop = this.state.routerMap[to];
          }
        } else {
        }
      } catch (error) {}
    }
  },
  mounted() {
    this.$router.beforeEach((to, from, next) => {
      console.log("🐴beforeEach");
      console.log(to);
      console.log(from);

      // 定义一个可以记录路由路径变化的数据，这里用sessionStorage,或者在window.routeChain等变量
      let routeLength = this.state.routeChain.length;
      if (routeLength === 0 || this.state.addCount === 0) {
        this.setPageDirection({ dir: "slide-left", to, from });
        this.addRouteChain(from);
        this.addRouteChain(to);
      } else if (routeLength === 1) {
        this.setPageDirection({ dir: "slide-left", to, from });
        this.addRouteChain(to);
      } else {
        let lastBeforeRoute = this.state.routeChain[routeLength - 2];
        if (lastBeforeRoute.path === to.path && to.meta.slideLeft !== true) {
          this.popRouteChain();
          this.setPageDirection({ dir: "slide-right", to, from });
        } else {
          this.addRouteChain(to);
          this.setPageDirection({ dir: "slide-left", to, from });
        }
      }
      next();
    });
  },
  activated() {
    console.log("😁😁😁  " + this.state);
  }
};
</script>

<style lang="less">
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
  animation: pageFadeIn 400ms forwards;
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
  animation: pageFromCenterToLeft 400ms forwards;
  z-index: 1;
}

/*路由后退，进入*/

.slide-right-enter-active {
  animation: pageFromLeftToCenter 400ms forwards;
  z-index: 1;
}

/*路由后退，退出*/

.slide-right-leave-active {
  animation: pageFromCenterToRight 400ms forwards;
  z-index: 10;
  box-shadow: -3px 0 5px rgba(0, 0, 0, 0.1);
}

/*路由前进，进入*/

.slide-left-enter-active {
  animation: pageFromRightToCenter 400ms forwards;
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
