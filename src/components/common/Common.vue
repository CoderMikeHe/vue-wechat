// 快速搭建设置界面的组件
<template>
  <div class="mh-cells-group">
    <div class="mh-header-title"></div>
    <div class="mh-cell">
      <div class="mh-cell-header"></div>
      <div class="mh-cell-body"></div>
    </div>
    <div class="mh-footer-title"></div>
  </div>
</template>

<script>
import { MHCommonGroup, MHCommonItem } from "../../assets/js/MHCommonGroup.js";
export default {
  props: {
    group: MHCommonGroup
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
/* cell 组 */
.mh-cells-group {
  margin-top: 1.17647059em;
  background-color: #ffffff;
  line-height: 1.47058824;
  font-size: 17px;
  overflow: hidden;
  position: relative;
}

/* top分割线 */
.mh-cells-group:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #d8d8d8;
  color: #d8d8d8;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
/* bottom分割线 */
.mh-cells-group:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #d8d8d8;
  color: #d8d8d8;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}

.mh-cell {
  padding: 10px 15px;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.mh-cell:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #d8d8d8;
  color: #d8d8d8;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  left: 15px;
  z-index: 2;
}
.mh-cell:first-child:before {
  display: none;
}
</style>

