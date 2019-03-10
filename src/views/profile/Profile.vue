<template>
  <div>
    <common></common>
  </div>
</template>

<script>
import common from "../../components/common/Common";
import { MHCommonGroup, MHCommonItem } from "../../assets/js/MHCommonGroup.js";
export default {
  name: "profile",
  data() {
    return {
      dataSource: []
    };
  },
  methods: {
    // 配置数据
    configData() {
      // group0
      const group0 = new MHCommonGroup();
      // 支付
      const pay = new MHCommonItem({
        title: "支付"
      });
      group0.items = [pay];

      // group1
      const group1 = new MHCommonGroup();
      // 收藏
      const collect = new MHCommonItem({
        title: "收藏"
      });
      // 相册
      const album = new MHCommonItem({
        title: "相册"
      });
      // 卡包
      const card = new MHCommonItem({
        title: "卡包"
      });
      // 表情
      const expression = new MHCommonItem({
        title: "表情"
      });
      group1.items = [collect, album, card, expression];

      // group2
      const group2 = new MHCommonGroup();
      // 设置
      const setting = new MHCommonItem({
        title: "设置"
      });
      group2.items = [setting];

      this.dataSource = [group0, group1, group2];
    }
  },
  components: {
    common
  }
};
</script>

<style lang="scss" scoped>
</style>