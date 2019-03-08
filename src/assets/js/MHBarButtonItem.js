
/**
 *
 *
 * @export
 * @class
 */
class MHBarButtonItem {
    //
    constructor(title , imageSrc , type) {
        this.title = title;
        this.imageSrc = imageSrc;
        this.type = type;
    }
}
export default MHBarButtonItem;

// 返回按钮
export const backItem = new MHBarButtonItem('','nav_bar_back_arrow',1);