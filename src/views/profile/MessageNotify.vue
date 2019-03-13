// 新消息通知
<template>
  <div class="_full-container">
    <NavigationBar title="新消息通知" :left-item="backItem" @left-click="$router.back()"></NavigationBar>
    <div class="_full-content _content-margin-top44">
      <div class="mh-common-group" v-for="(group,section) in dataSource" :key="section">
        <common :group="group" :section="section"></common>
      </div>
    </div>
  </div>
</template>

<script>
import common from "components/common/Common";
import { MHCommonGroup, MHCommonItemSwitch } from "assets/js/MHCommonGroup.js";
import MHPreferenceSettingHelper from "assets/js/MHPreferenceSettingHelper.js";
export default {
  name: "MessageNotify",
  data() {
    return {
      dataSource: []
    };
  },
  created() {
    this.configData();
  },
  methods: {
    // 配置数据
    configData() {
      // group0
      const group0 = new MHCommonGroup({
        header: "微信未打开时"
      });
      // 新消息通知
      const messageNotify = new MHCommonItemSwitch({
        title: "新消息通知",
        key: MHPreferenceSettingHelper.MHMessageNotifyKey
      });
      // 语音和视频通话提醒
      const callReminder = new MHCommonItemSwitch({
        title: "语音和视频通话提醒 ",
        key: MHPreferenceSettingHelper.MHCallReminderKey
      });
      // 通知显示消息详情
      const messageDetail = new MHCommonItemSwitch({
        title: "通知显示消息详情",
        key: MHPreferenceSettingHelper.MHNotifyMessageDetailKey
      });

      group0.items = [messageNotify, callReminder, messageDetail];

      // group1
      const group1 = new MHCommonGroup({
        header: "微信打开时"
      });
      // 声音
      const notifyVoice = new MHCommonItemSwitch({
        title: "声音",
        key: MHPreferenceSettingHelper.MHNotifyVoiceKey
      });
      // 振动
      const notifyVibration = new MHCommonItemSwitch({
        title: "振动",
        key: MHPreferenceSettingHelper.MHNotifyVibrationKey
      });
      group1.items = [notifyVoice, notifyVibration];

      this.dataSource = [group0, group1];
    }
  },
  components: {
    common
  }
};
</script>

<style scoped>
.mh-common-group {
  margin-top: 8px;
}
</style>
