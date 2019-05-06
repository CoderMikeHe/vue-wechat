// 表情相关的业务

// 默认表情
import Default from './default'
// 取出emoji
import Emoji from './emoji'
// 取出lxh
import Lxh from './lxh'

// 图片表情的路径地址 (default + lxh)
let emoticons = {}

// 取出default的数据
Default.emoticons.forEach(emo => {
  // 取出 key-value
  let value = emo.png
  let key = emo.chs
  // key or value 都必须有值
  if (value.length !== 0 && key.length !== 0) {
    // relativePath
    let relativePath = '/emoticons/default/'
    // 查找 @3x @2x @1x 的图片
    let scales = ['@3x', '@2x', '']
    // length
    let length = scales.length
    for (let i = 0; i < length; i++) {
      const el = scales[i]
      // 🔥 - [JS获取文件扩展名方法](https://www.cnblogs.com/FallIntoDarkness/p/9757334.html)
      let spl = value.split('.')
      let fileName = spl[0]
      let suffix = spl[1]
      let path = relativePath + fileName + el + '.' + suffix
      let gr = fileName
      let ko = new RegExp(gr, '')
      // let png = require(path)
      console.log('火火火火火火' + ko)
      // console.log(png)
      // console.log(path)
      console.log(isHasImg(path))
    }
  }
})

function isHasImg(pathImg) {
  var ImgObj = new Image()
  ImgObj.src = pathImg
  console.log('Come baby  ' + pathImg)
  if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
    return true
  } else {
    return false
  }
}

function validateImage(url) {
  var xmlHttp
  if (window.ActiveXObject) {
    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP')
  } else if (window.XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest()
  }
  // false会导致⚠️ [Deprecation] Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience.
  xmlHttp.open('GET', url, false)
  xmlHttp.send()
  console.log('Come baby ' + xmlHttp.status)
  if (xmlHttp.status === 404) return false
  if (xmlHttp.status === 200) return true
  return false
}
