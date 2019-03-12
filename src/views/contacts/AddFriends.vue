<template>
  <div class="_full-container" >
    <NavigationBar title="添加朋友" :left-item="backItem" @left-click="$router.back()"></NavigationBar>
    <div class="_full-content _content-margin-top44">
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
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>你好</h1>
      <h1>我不好</h1>
    </div>
  </div>
</template>

<script>
import NavigationBar from "../../components/navigationBar/NavigationBar";
import {backItem} from '../../assets/js/MHBarButtonItem.js'
export default {
  data() {
    return {
      backItem
    }
  },
  components: {
    NavigationBar
  },
  methods: {
    scrollEvent(e){
      console.log(e);
    }
  },
};
</script>

<style scoped>
</style>
