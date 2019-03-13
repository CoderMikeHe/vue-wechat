
import MHPreferenceSettingHelper from './MHPreferenceSettingHelper'

// 组
class MHCommonGroup {
  // 组头标题
  header = "";
  // 组尾标题
  footer = "";
  // items
  items = [];
  // 配置
  constructor({ header = "", footer = "", items = []} = {}) {
    this.header = header;
    this.footer = footer;
    this.items = items;
  }
}

// 基类
class MHCommonItem {
  // icon
  icon = "";
  title = "";
  subtitle = "";
  name = "";   // 跳转路由对象(命名路由) 跟path一样，但优先级较高
  // type 0 ： 默认是 icon+title+subtitle+>
  // type 1 ： 默认是 icon+title+subtitle
  // type 2 ： 默认是 icon+title+switch
  type = 0;
  tapHighlight = true;  // 是否点击高亮

  constructor({ icon = "", title = "", subtitle = "" , type = 0, tapHighlight = true,  name = ""} = {}) {
    this.icon = icon;
    this.title = title;
    this.subtitle = subtitle;
    this.name = name;
    this.type = type;
    this.tapHighlight = tapHighlight;
  }
}


// 按钮 type === 2
class MHCommonItemSwitch extends MHCommonItem{
  // CMH TODO ：ES6 目前还不支持私有属性，本项目约定 _xxx 为私有属性
  _key = "";  // 存储的key 
  _off = false;

  constructor({icon = "", title = "", type = 2, tapHighlight = false, name = "", key = ""} = {}){
    // must调用父类
    super({icon :icon, title: title , type: type, name: name, tapHighlight: tapHighlight});
    // CMH TODO ：setter or getter 针对的是实例来确定的，否则this指向不明
    this._key = "";
    this._off = false;

    // 手动调用 set key
    this.key = key;
  }
   
  // ES6 的 取值函数（getter）和存值函数（setter）
  /**
   * @param {string} value
   */
  set key(value){
    // 赋值
    this._key = value;
    // 从本地获取值
    let off = MHPreferenceSettingHelper.getBooleanItem(value);
    // 调用 set off
    this.off = off;
  }
  get key(){
    return this._key;
  }

  // off switch 开关(true/false)
  /**
   * @param {boolean} value
   */
  set off(value){
    this._off = value;
    if (!this.key) {
      return;
    }
    // CMH TODO ：localStorage 会将 boolean的值转成字符串 'true' or 'false' 所以这里将 其转成 0/1
    /// 存到本地
    MHPreferenceSettingHelper.setBooleanItem(this.key , value);
  }
  get off(){
    return this._off;
  }
}


export { MHCommonGroup, MHCommonItem, MHCommonItemSwitch};
