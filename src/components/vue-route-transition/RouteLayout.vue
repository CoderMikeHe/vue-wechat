<template>
  <div class="vue-route-transition__wrapper">
    <header>
      <slot name="header"></slot>
    </header>
    <main class="vue-route-transition__content" :id="cId">
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
<script>
export default {
  name: "vue-route-layout",
  props: {
    id: String
  },
  data() {
    return {
      cId: this.id || this.$route.path.replace(/\//g, "_") || "_null_"
    };
  },
  activated() {
    console.log("🔥🔥 cID " + this.cId);
    console.log("🔥🔥 ID " + this.id);
    console.log("🔥🔥 path " + this.$route.path);
  }
};
</script>

<style scoped>
.vue-route-transition__wrapper {
  background: #ededed;
  position: absolute;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: column nowrap;
  flex-flow: column nowrap;
}

.vue-route-transition__content {
  width: 100%;
  height: 100%;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  position: relative;
}
</style>
