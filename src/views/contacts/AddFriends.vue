<template>
  <div class="_full-container">
    <NavigationBar title="添加朋友" :left-item="blackBackItem" @left-click="$router.back()"></NavigationBar>
    <div class="_full-content _content-padding-top44">
      <h1>你好吗</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1 class>你好</h1>
      <h1 class>你好</h1>
      <h1 class="kkkk">你好</h1>
      <h1 class="hhhh">我不好</h1>
    </div>
  </div>
</template>

<script>
import NavigationBar from "../../components/navigationBar/NavigationBar";
import { blackBackItem } from "../../assets/js/MHBarButtonItem.js";
export default {
  data() {
    return {
      blackBackItem
    };
  },
  components: {
    NavigationBar
  },
  methods: {
    scrollEvent(e) {
      console.log(e);
    }
  }
};
</script>

<style scoped>
.hhhh {
  color: aliceblue;
}

.kkkk {
  color: yellow;
}

.llll {
  color: antiquewhite;
}
</style>
