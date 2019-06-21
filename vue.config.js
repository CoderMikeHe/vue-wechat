const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-wechat/'
    : '/',
  
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
  }
}

// 🔥 config.resolve.alias 设置文件别名
// - [vue-cli 3.x 修改dist路径](https://blog.csdn.net/sunny_desmond/article/details/80916706)
// - [【vue】vue-cli中自定义路径别名 assets和static文件夹的区别](https://blog.csdn.net/z767327552/article/details/79533792)
// - [【vue-cli 3.0】 vue.config.js配置 - 路径别名](https://segmentfault.com/a/1190000016135314)
// - [vue-cli 3.0配置webpack目录别名alias](https://www.jianshu.com/p/e4716e5bc8bb)
// - [vue-cli 3.0 中 vue.config.js 配置路径别名](https://blog.csdn.net/yun_hou/article/details/86530164)
