class MHBarButtonItem {
    // 构造函数
    constructor(title, imageSrc, type) {
        this.title = title;
        this.imageSrc = imageSrc;
        this.type = type;
    }
}
// defalult 构造器
export default MHBarButtonItem;
// 返回按钮
export const backItem = new MHBarButtonItem('', 'nav_bar_back_arrow', 1);
// 更多按钮
export const moreItem = new MHBarButtonItem('', 'nav_bar_more', 1);