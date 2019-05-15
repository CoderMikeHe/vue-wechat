class MHBarButtonItem {
  // 构造函数
  constructor(title, imageSrc, type) {
    this.title = title
    this.imageSrc = imageSrc
    this.type = type
  }
}
// defalult 构造器
export default MHBarButtonItem
// 黑色返回按钮
export const blackBackItem = new MHBarButtonItem('', 'nav_bar_black_back_arrow', 1)
// 白色返回按钮
export const whiteBackItem = new MHBarButtonItem('', 'nav_bar_white_back_arrow', 1)
// 更多按钮
export const moreItem = new MHBarButtonItem('', 'nav_bar_more', 1)
// 添加按钮
export const addItem = new MHBarButtonItem('', 'nav_bar_add', 1)
// 朋友圈照线性相机按钮
export const cameraLineItem = new MHBarButtonItem('', 'wx_moments_camera_line', 1)
// 朋友圈照面性相机按钮
export const cameraFaceItem = new MHBarButtonItem('', 'wx_moments_camera_face', 1)