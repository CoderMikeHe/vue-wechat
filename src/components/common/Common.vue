// 快速搭建设置界面的组件
<template>
  <div class="mh-cells-group">
    <div class="mh-header-title"></div>
    <a
      class="mh-cell _mh-cell_access"
      v-for="(item,row) in group.items"
      :key="row"
      @click="didSelectRow(section,row)"
    >
      <div class="mh-cell-header"></div>
      <div class="mh-cell-body">
        <div class="mh-body">
          <p class="mh-title">{{ item.title }}</p>
        </div>
        <div class="mh-footer">
          <p class="mh-subtitle">{{ item.subtitle }}</p>
          <img class="mh-right-arrow" src="@/assets/images/common/tableview_arrow_8x13.png" alt>
        </div>
      </div>
    </a>
    <div class="mh-footer-title"></div>
  </div>
</template>

<script>
import { MHCommonGroup, MHCommonItem } from "assets/js/MHCommonGroup.js";
export default {
  name: "common",
  props: {
    group: MHCommonGroup, // Group Object
    section: Number // Group Index
  },
  data() {
    return {};
  },
  methods: {
    didSelectRow(section, row) {
      this.$emit("did-select-row", section, row);
    }
  }
};
</script>

<style scoped>
/* cell 组 */
.mh-cells-group {
  background-color: #ffffff;
  line-height: 56px;
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
  padding: 0px 14px;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.mh-cell-body:before {
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
  left: 14px;
  z-index: 2;
}
.mh-cell-body:first-child:before {
  display: none;
}

.mh-cell-body {
  /* 占据整个剩余空间 */
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;

  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-between; /* Safari 6.1+ */
  justify-content: space-between;
}

.mh-cell-body .mh-footer {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.mh-footer .mh-right-arrow {
  display: inline-block;
  width: 8px;
  height: 13px;
  margin-left: 10px;
}

.mh-body .mh-title {
  color: #191919;
}

.mh-footer .mh-subtitle {
  color: #7f7f7f;
}
</style>

