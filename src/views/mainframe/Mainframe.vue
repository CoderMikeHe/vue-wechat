<template>
    <div class="bbb"> 
        <NavigationBar :left-items= "leftItems" :right-items="rightItems" title="微信" @left-click="leftItemDidClicked" @right-click="rightItemDidClicked" ></NavigationBar> 
    </div>
</template>

<script>
import NavigationBar from '../../components/navigationBar/NavigationBar'
import MHBarButtonItem from '../../assets/js/MHBarButtonItem.js'
export default {
  name: "app",
  data() {
    return {
      // 返回按钮
      leftItems: [new MHBarButtonItem('','nav_bar_back_arrow',1)],
      rightItems: [new MHBarButtonItem('','nav_bar_add',1),new MHBarButtonItem('编辑','',0)]
    };
  },
  components: {
    NavigationBar
  },
  methods: {
    leftItemDidClicked(index){
      console.log(index);
    },
    rightItemDidClicked(index){
      console.log(index);
      this.$router.push("/mainframe/add-friend");

    },
  },
}
</script>

<style lang="scss" scoped>

.bbb{
  display: flex;
}
.mh-button-item{
  background-color: #000;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  color: #F00;
}
</style>