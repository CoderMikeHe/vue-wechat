// 利用localStorage 偏好设置

class MHPreferenceSettingHelper {
  // 静态Method
  // 清除掉所有key-values
  static clear() {
    localStorage.clear();
  }
  // delete storage[key]
  static removeItem(key) {
    localStorage.removeItem(key);
  }

  // 设置 storage[key] = value
  static setItem(key, value) {
    localStorage.setItem(key, value);
  }
  // 获取 value = storage[key] 返回值 string | null
  static getItem(key) {
    return localStorage.getItem(key);
  }

  // 设置boolean值
  static setBooleanItem(key, booleanValue) {
    localStorage.setItem(key, booleanValue ? '1' : '0');
  }

  // 获取Boolean值
  static getBooleanItem(key) {
    return parseInt(localStorage.getItem(key)) > 0;
  }


  // --- 应用相关
  //  初始化配置
  static initialize() {
    if (!MHPreferenceSettingHelper.getBooleanItem(MHPreferenceSettingHelper.MHInitializedKey)) {
      // 第一次使用
      MHPreferenceSettingHelper.setBooleanItem(MHPreferenceSettingHelper.MHInitializedKey, true);

      // 配置发现页的默认参数
      MHPreferenceSettingHelper.setBooleanItem(MHPreferenceSettingHelper.MHMomentsKey, true);
      MHPreferenceSettingHelper.setBooleanItem(MHPreferenceSettingHelper.MHQrCodeKey, true);
      MHPreferenceSettingHelper.setBooleanItem(MHPreferenceSettingHelper.MHShakeKey, true);
      MHPreferenceSettingHelper.setBooleanItem(MHPreferenceSettingHelper.MHLookKey, true);
      MHPreferenceSettingHelper.setBooleanItem(MHPreferenceSettingHelper.MHSearchKey, true);
      MHPreferenceSettingHelper.setBooleanItem(MHPreferenceSettingHelper.MHLocationServiceKey, true);
      MHPreferenceSettingHelper.setBooleanItem(MHPreferenceSettingHelper.MHBottleKey, true);
      MHPreferenceSettingHelper.setBooleanItem(MHPreferenceSettingHelper.MHShoppingKey, true);
      MHPreferenceSettingHelper.setBooleanItem(MHPreferenceSettingHelper.MHGameKey, true);
      MHPreferenceSettingHelper.setBooleanItem(MHPreferenceSettingHelper.MHMoreAppsKey, true);

      // 新消息通知
      MHPreferenceSettingHelper.setBooleanItem(MHPreferenceSettingHelper.MHCallReminderKey, true);
      MHPreferenceSettingHelper.setBooleanItem(MHPreferenceSettingHelper.MHNotifyMessageDetailKey, true);
      MHPreferenceSettingHelper.setBooleanItem(MHPreferenceSettingHelper.MHNotifyVibrationKey, true);


      console.log("++++ Configure Complete ++++");
    }
  }
}

// 设置静态属性 本项目规定：大写的属性认为是静态属性且只读
/// ---- 应用
/// 第一次使用
MHPreferenceSettingHelper.MHInitializedKey = "MHInitializedKey";

/// ---- 通用
// 听筒模式
MHPreferenceSettingHelper.MHReceiverModeKey = "MHReceiverModeKey";

/// ---- 发现页key
// 朋友圈
MHPreferenceSettingHelper.MHMomentsKey = "MHMomentsKey";
// 扫一扫
MHPreferenceSettingHelper.MHQrCodeKey = "MHQrCodeKey";
// 摇一摇
MHPreferenceSettingHelper.MHShakeKey = "MHShakeKey";
// 看一看
MHPreferenceSettingHelper.MHLookKey = "MHLookKey";
// 搜一搜
MHPreferenceSettingHelper.MHSearchKey = "MHSearchKey";
// 附近的人
MHPreferenceSettingHelper.MHLocationServiceKey = "MHLocationServiceKey";
// 漂流瓶
MHPreferenceSettingHelper.MHBottleKey = "MHBottleKey";
// 购物
MHPreferenceSettingHelper.MHShoppingKey = "MHShoppingKey";
// 游戏
MHPreferenceSettingHelper.MHGameKey = "MHGameKey";
// 小程序
MHPreferenceSettingHelper.MHMoreAppsKey = "MHMoreAppsKey";


/// ---- 新消息通知
// 新消息通知
MHPreferenceSettingHelper.MHMessageNotifyKey = "MHMessageNotifyKey";
// 语音和视频通话提醒 
MHPreferenceSettingHelper.MHCallReminderKey = "MHCallReminderKey";
// 通知显示消息详情
MHPreferenceSettingHelper.MHNotifyMessageDetailKey = "MHNotifyMessageDetailKey";
// 声音
MHPreferenceSettingHelper.MHNotifyVoiceKey = "MHNotifyVoiceKey";
// 振动
MHPreferenceSettingHelper.MHNotifyVibrationKey = "MHNotifyVibrationKey";

export default MHPreferenceSettingHelper;