// 利用localStorage 偏好设置

class MHPreferenceSettingHelper {
  // 静态Method
  // 清除掉所有key-values
  static clear(){
    localStorage.clear();
  }
  // delete storage[key]
  static removeItem(key){
    localStorage.removeItem(key);
  }

  // 设置 storage[key] = value
  static setItem(key , value){
    localStorage.setItem(key , value);
  }
  // 获取 value = storage[key] 返回值 string | null
  static getItem(key){
    return localStorage.getItem(key);
  }

  // 设置boolean值
  static setBooleanItem(key , booleanValue){
    localStorage.setItem(key , booleanValue?'1':'0');
  }

  // 获取Boolean值
  static getBooleanItem(key){
    return parseInt(localStorage.getItem(key))>0;
  }

}

// 设置静态属性 本项目规定：大写的属性认为是静态属性且只读
/// ---- 通用
// 听筒模式
MHPreferenceSettingHelper.MHPreferenceSettingReceiverMode = "MHPreferenceSettingReceiverMode";


export default MHPreferenceSettingHelper;

