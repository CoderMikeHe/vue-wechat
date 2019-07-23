import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false

// 导入animate.css
import 'animate.css'

// 导入mui
// 导入 MUI 的样式
// import "./assets/vendor/mui/css/mui.min.css";
// 导入扩展图标样式
// import "./assets/vendor/mui/css/icons-extra.css";

// 导入全部mint-ui
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

// 导入weui
import 'weui'

// 全局app常量css
import './assets/css/common.css'
import './assets/css/wechat.css'
import './assets/css/iconfont.css'

// 全局导航栏
import NavigationBar from '@/components/navigationBar'
Vue.use(NavigationBar)

// 全局布局和路由过渡动画
import RouteTransition from '@/components/vue-route-transition'
Vue.use(RouteTransition)

import utils from 'assets/utils/utils'
Vue.use(utils)

// 配置偏好设置
import Storage from '@/assets/js/MHPreferenceSettingHelper'
// 初始化
Storage.initialize()
// 账号存储
import AccountHelper from '@/assets/js/account/account'
// 挂在实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


// 重置根路由
AccountHelper.resetRootRouterView()


// {
//   "workbench.iconTheme": "vscode-icons",
//   "editor.fontSize": 18,
//   "workbench.editor.enablePreview": false,
//   "explorer.confirmDelete": false,
//   "beautify.language": {
//     "js": {
//       "type": ["javascript", "json"],
//       "filename": [".jshintrc", ".jsbeautifyrc"]
//     },
//     "css": ["css", "scss"],
//     "html": ["htm", "html"]
//   },
//   "editor.formatOnSave": true,
//   "git.autofetch": true,
//   "editor.tabSize": 2,
//   "window.restoreWindows": "all"
// }

/// --------🔥 Web知识最强参照 🔥-------------
// 👉vue-cli3.0配置详解
// - [vue-cli3.0配置详解](http://www.php.cn/js-tutorial-394518.html)
// - [vue-cli3.0之vue.config.js的配置项（注解）](https://blog.csdn.net/Allen_Fei_/article/details/82691420)
// - [vue-cli3.0-vueadmin](https://github.com/loveRandy/vue-cli3.0-vueadmin)
// - [使用Vue-cli 3.0搭建Vue项目](https://www.jianshu.com/p/6307c568832d)
// - [关于 Vue cli 3的配置 vue.config.js 和使用](https://blog.csdn.net/u012302552/article/details/81742907)
// - [vue.config.js模板](https://www.cnblogs.com/hcq111/p/10283217.html)
// - [vue-cli3.0使用及配置（部分）](https://blog.csdn.net/qq_36407748/article/details/80739787)
// - [vue-cli3.0之vue.config.js的配置项(注解)](https://www.cnblogs.com/wiseant/articles/9789371.html)
// - [vue-cli3.0构建项目后，vue.config.js配置简介](https://blog.csdn.net/qq_21132509/article/details/84067493)
// - [如何配置 vue-cli 3.0 的 vue.config.js](https://segmentfault.com/a/1190000016101954)
// - [vue-config.js配置实战](https://blog.csdn.net/qq_40513881/article/details/84104377)

// 👉 webpack
// - [一字一句的搞懂vue-cli之vue webpack template配置](https://segmentfault.com/a/1190000012472099)
// - [一字一句的搞懂vue-cli之vue webpack template配置](https://www.cnblogs.com/xyyt/p/9117361.html)

// 👉 github 添加 SSH key
// - [github 添加 SSH key](https://www.cnblogs.com/blogzhangwei/p/5944975.html)
// 

// 👉 网页部署到GitHub Pages
// - [部署到GitHub Pages](https://cli.vuejs.org/zh/guide/deployment.html#github-pages)
// - [vue cli 3.x 项目部署到 github pages](https://www.cnblogs.com/stevexu/p/10720106.html)
// - [上传本地Vue项目到github和gh-pages预览](https://blog.csdn.net/hjw453321854/article/details/81780128)

// 👉 vue-cli 3.0 设置环境
// - [环境变量和模式](https://cli.vuejs.org/zh/guide/mode-and-env.html)
// - [vue-cli3.0 环境变量与模式](https://segmentfault.com/a/1190000015133974?utm_source=tag-newest)
// - [vuecli3.0脚手架搭建及不同的打包环境配置vue.config.js](https://blog.csdn.net/qq_36407748/article/details/82050976)


// - [使用 github pages, 快速部署你的静态网页](https://blog.csdn.net/baidu_25464429/article/details/80805237)
// - [NodeJs/Vue项目中对process.env的使用](https://www.jianshu.com/p/07fda339f57e)

// 👉css px/em/rem 的区别
// - [css中单位em和rem的区别](https://www.cnblogs.com/wind-lanyan/p/6978084.html)

// 👉inline/block/inline-blockd 的区别
// - [常见的inline元素、block元素、inline-block元素有哪些？它们之间有什么区别？](https://www.jianshu.com/p/cca9f037a6b9)
// - [block，inline和inline-block概念和区别](http://www.cnblogs.com/KeithWang/p/3139517.html)
// - [inline ， block， inline-blockd的区别](inline ， block， inline-blockd的区别)

// 👉CSS line-height
// - [CSS行高——line-height](https://www.cnblogs.com/dolphinX/p/3236686.html)
// - [CSS line-height概念与举例](https://www.cnblogs.com/zhangyachen/p/8035661.html)
// - [真正的能理解CSS中的line-height，height与line-height](https://blog.csdn.net/a2013126370/article/details/82786681)
// - [深入了解css的行高Line Height属性](http://www.cnblogs.com/fengzheng126/archive/2012/05/18/2507632.html)
// - [CSS深入理解之line-height](https://blog.csdn.net/muzi187/article/details/79171735)
// - [[学习笔记] css中的line-height](https://segmentfault.com/a/1190000003038583)

// 👉设置git提交时的用户名和邮箱
// - [设置git提交时的用户名和邮箱](https://blog.csdn.net/yinxing2008/article/details/82796219)

// 👉重学Web
// - [重学Web](https://www.w3cplus.com/)

// 👉input[type=search]
// - [你不知道的input[type=search]](https://blog.csdn.net/xxxxxMiss/article/details/51534626)

// 👉JS中如何判断一个对象是否为空对象
// - [JS中如何判断一个对象是否为空对象](https://blog.csdn.net/qq_38627581/article/details/77353015)

// 👉CSS BEM规范
// - [编写模块化CSS：BEM](https://www.w3cplus.com/css/css-architecture-1.html)
// - [BEM入门+精通](https://www.w3cplus.com/blog/tags/325.html)
// - [BEM quick-start](https://en.bem.info/methodology/quick-start/)

// 👉谷歌跨域问题
// - [Mac上解决Chrome浏览器跨域问题](https://www.jianshu.com/p/2db73311fcbe)

// 👉Fixed布局的坑
// - [移动端onTouchMove事件 以及Fixed定位的坑](https://juejin.im/post/5b28d6cf51882574d20baa1c)
// - [fixed定位问题](https://www.jianshu.com/p/33da1c0b079c)
// - [深入研究-webkit-overflow-scrolling:touch及ios滚动](https://www.cnblogs.com/xiahj/p/8036419.html)
// - [移动Web开发实践——解决position:fixed自适应BUG](https://www.cnblogs.com/Megasu/p/4104096.html)
// - [移动端web页面使用position:fixed问题总结](https://github.com/maxzhang/maxzhang.github.com/issues/2)
// - [Web移动端Fixed布局的解决方案](https://efe.baidu.com/blog/mobile-fixed-layout/)
// - [解决页面使用overflow: scroll在iOS上滑动卡顿的问题](https://www.jianshu.com/p/1f4693d0ad2d)
// - [fixed兼容性](https://www.cnblogs.com/cina33blogs/p/7251055.html)
// - [小技巧css解决移动端ios不兼容position:fixed属性，无需插件](https://blog.csdn.net/liu__hua/article/details/40106595)
// - [移动端整体布局-解决ios下fixed定位抖动的问题](https://blog.csdn.net/cengjingcanghai123/article/details/51511116)

// 👉数组去重
// - [JS数组去重的几种常见方法](https://www.cnblogs.com/baiyangyuanzi/p/6726258.html)
// - [JavaScript数组去重（12种方法，史上最全）](https://segmentfault.com/a/1190000016418021)

// 👉行内元素和块状元素
// - [常用的块级元素（block）、行内元素（inline）以及行内块元素（inline-block）的解析](https://blog.csdn.net/cc18868876837/article/details/78060347)
// - [Html中行内元素有哪些？块级元素有哪些？](https://www.cnblogs.com/Jackie0714/p/4923639.html)
// - [HTML哪些是块级元素，哪些是行内元素](https://www.cnblogs.com/yxm440/p/7667539.html)

// 👉 Vue.js 源码学习九 —— 过渡效果 transition 学习
// - [Vue.js 源码学习九 —— 过渡效果 transition 学习](https://www.jianshu.com/p/f283b39aa212)

// 👉 JS正则表达式
// - [JS正则表达式详解](http://www.cnblogs.com/moqiutao/p/6513628.html)
// - [JS正则表达式完整教程](http://www.cnblogs.com/guaidianqiao/p/7615228.html)
// - [JS正则表达式](https://www.runoob.com/regexp/regexp-rule.html)
// - [JS正则表达式](https://www.jianshu.com/p/b88e19474ab3)
// - [js中的正则表达式入门](https://www.cnblogs.com/chenmeng0818/p/6370819.html)

// 👉 web页面emoji表情
// - [web页面如何显示emoji表情呢？](https://segmentfault.com/q/1010000004356514)
// - [umoji](https://github.com/channg/umoji)
// - [emoji](https://github.com/node-modules/emoji)

// 👉 数组嵌套对象响应式
// - [vue如何修改数组中对象的值？](https://segmentfault.com/q/1010000012375354)
// - [vue 数组中嵌套的对象添加新属性--页面更新](https://www.jianshu.com/p/8f0e5bb13735)
// - [vue 列表渲染](https://cn.vuejs.org/v2/guide/list.html)

// 👉 JS 长按实现方案
// - [HTML5-长按事件](https://blog.csdn.net/yqj234/article/details/51923626)
// - [Js实现长按事件](https://www.jianshu.com/p/884ed3939f0c)
// - [javascript长按事件实现方式](https://www.cnblogs.com/wulishun111/p/8857073.html)
// - [移动端长按事件](https://www.cnblogs.com/imsomnus/p/6429074.html)
// - [Js实现移动端长按事件](https://www.jianshu.com/p/11bb9629aa09)

//  👉 Vue事件
// - [Vue2.0学习笔记：Vue事件修饰符的使用](https://www.cnblogs.com/xuqp/p/9406971.html)

// 👉 vue路由高级语法糖
// - [vue路由高级语法糖](https://www.cnblogs.com/lhl66/p/8665042.html)

// 👉 localStorage & sessionStorage
// - [JS 详解 Cookie、 LocalStorage 与 SessionStorage](https://www.cnblogs.com/minigrasshopper/p/8064367.html)
// - [Window​.session​Storage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage)
// - [HTML5 sessionStorage会话存储](https://www.cnblogs.com/polk6/p/5512979.html)

// 👉 浅析CSS——元素重叠及position定位的z-index顺序
// - [浅析CSS——元素重叠及position定位的z-index顺序](https://www.cnblogs.com/xcsn/p/4664404.html)

// 👉 Body & Html 高度
// - [关于html与body的高度问题](https://www.cnblogs.com/xiaoyuersdch/p/9156240.html)
// - [Html设置html与body元素高度问题](https://www.cnblogs.com/qlqwjy/p/7284365.html)
// - [CSS之BODY高度问题](https://www.jianchuankeji.com/blog/archives/462)

// 👉 文本超过两行展示‘全文’
// - [Vue 中文本内容超出规定行数后展开收起的处理](https://www.jianshu.com/p/09154ebf5f44)
// - [判断文字数量超过2行 添加展开按钮 未超过两行则不显示按钮 溢出部分显示省略号](https://www.jianshu.com/p/9d76d4a75e6f)
// - [H5超出文字显示“展开全部”按钮](https://segmentfault.com/q/1010000011700305?sort=created)

// 👉 vue常用事件之v-on:click 以及事件对象，事件冒泡，事件默认行为
// - [vue常用事件之v-on:click 以及事件对象，事件冒泡，事件默认行为](https://blog.csdn.net/qq_34645412/article/details/79100669)

// 👉 get​Computed​Style
// - [Window​.get​Computed​Style()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle)
// - [JS使用getComputedStyle()方法获取CSS属性值](https://www.cnblogs.com/tongzhou/p/6432807.html)
// - [原生JS getComputedStyle的方法解析](https://www.imooc.com/article/27812)

// 👉 npm 更新模块
// - [查看使用 npm 安装插件的版本号](https://blog.csdn.net/u011500781/article/details/53066630)
// - [npm-check](https://www.npmjs.com/package/npm-check)
// - [Npm使用npm-check选择升级所有可更新包(全局+局部) + 项目单个依赖](https://blog.csdn.net/pcaxb/article/details/81773475)
// - [npm-check-updates](https://www.npmjs.com/package/npm-check-updates)
// - [nodejs包高效升级插件npm-check-updates](https://blog.csdn.net/baidu_16051437/article/details/51288141)
// - [项目中nodejs包高效升级插件npm-check-updates](https://www.cnblogs.com/xfcao/p/9436012.html)
// - [npm模块升级工具 npm-check](https://www.oschina.net/p/npm-check/related)
// - [模块管理进阶 — npm-check + cnpm 构建包更新环境](https://www.jianshu.com/p/0caedbe65339)

// 👉 npm的package.json中文文档
// - [npm的package.json中文文档](https://github.com/ericdum/mujiang.info/issues/6/)

// 👉 去掉输入框中系统自带的清除小图标
// - [H5 input[type=search] 去掉输入框中系统自带的清除小图标](https://my.oschina.net/u/3237686/blog/1836549)

// 👉 emoji
// - [Emoji表情符号兼容方案(适用ios,android,wp等平台) ](https://bbs.csdn.net/topics/390055415)

// 👉 DOM元素中height, clientHeight,offsetHeight等
// - [DOM元素中height, clientHeight,offsetHeight等，到底是什么？](https://www.cnblogs.com/zhwc-5w4/p/7183217.html)
// - [详解clientHeight、offsetHeight、scrollHeight](https://www.cnblogs.com/top5/archive/2010/08/23/1806389.html)
// - [offsetheight 和clientheight、scrollheight、scrollTop区别](https://www.cnblogs.com/wangdan0915/p/7562708.html)
// - [height、clientHeight、scrollHeight、offsetHeight区别](https://www.cnblogs.com/zyh-club/p/4767727.html)
// - [height、clientHeight、scrollHeight、offsetHeight区别](https://www.jianshu.com/p/59eeb6ea5b41)
// - [DOM系列：视窗、设备、滚动条和文档尺寸](https://www.imooc.com/article/50770)
// - [clientHeight , scrollHeight , offsetHeight之间的区别及兼容方案](https://www.cnblogs.com/nanshanlaoyao/p/5964730.html)
// - [搞清clientHeight、offsetHeight、scrollHeight、offsetTop、scrollTop](https://www.imooc.com/article/17571)
// - [图解scrollHeight, clientHeight, offsetHeight, scrollTop以及获取方法](https://www.jianshu.com/p/d267456ebc0d)
// - [scrollHeight, clientHeight, offsetHeight的区别](https://segmentfault.com/a/1190000016554851)
// - [scrollHeight](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollHeight)
// - [getBoundingClientRect](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)

// 👉 keep-alive和钩子函数
// - [Vue2.0生命周期（组件钩子函数与路由守卫）](https://segmentfault.com/a/1190000013956945)
// - [vue2.0 keep-alive最佳实践](https://segmentfault.com/a/1190000008123035)
// - [vue-navigation](https://github.com/zack24q/vue-navigation)
// - [vue实现前进刷新，后退不刷新](https://juejin.im/post/5a69894a518825733b0f12f2)
// - [Vue / keep-alive](https://www.jianshu.com/p/4b55d312d297)
// - [深入理解vue-router之keep-alive](https://www.zhangshengrong.com/p/JKN8BP216b/)
// - [vue开启keep-alive需要注意的问题](https://www.jianshu.com/p/be24d09f10bf)
// - [Vue 全站缓存之 keep-alive ： 动态移除缓存](https://segmentfault.com/a/1190000015845117?utm_source=tag-newest)

// 👉 input&键盘遮盖处理
// - [2016-11-04完美解决)移动端iOS第三方输入法遮挡底部input及android键盘回落后留白问题]((https://segmentfault.com/a/1190000006243816)
// - [H5移动端弹出键盘时遮挡输入框](https://blog.csdn.net/qq_37231097/article/details/76614702)
// - [移动端H5页面_input获取焦点时，虚拟键盘挡住input输入框解决方法](https://blog.csdn.net/Ned_mahone/article/details/79912559)
// - [关于移动端的文本框获取焦点时导致fixed或absolute定位的按钮被手机键盘顶上去的问题](https://blog.csdn.net/tel13259437538/article/details/80445883)

// 👉 input输入&聚焦相关
// - [Dcloud Mui H5+移动Web开发 IOS端input无法输入](https://blog.csdn.net/leytton/article/details/72884241)
// - [vue框架中的表单输入框不支持focus以及blur事件的解决方案](https://blog.csdn.net/weixin_42011096/article/details/80764182)
// - [Vue中自动获取input焦点](https://blog.csdn.net/weixin_40890907/article/details/82346042)
// - [vue进页面第一个input框自动获得焦点](https://blog.csdn.net/xiasohuai/article/details/81209862)
// - [vue-auto-focus:控制自动聚焦行为的vue指令](https://blog.csdn.net/haihuan2004/article/details/54572143)
// - [vue爬坑记录：ios系统下，触摸input框以及textarea框无法唤起输入法](https://blog.csdn.net/mirage003/article/details/89792492)
// - [关于微信手机端IOS系统中input输入框无法输入的问题](https://www.cnblogs.com/mrnut/p/7656019.html)
// - [关于移动端input框 在手机页面中无法输入文字的问题](https://blog.csdn.net/joey_ch/article/details/72155121)
// - [VUE 移动端安卓 ios ，input搜索， 软键盘回车触发搜索事件！](https://blog.csdn.net/MtangEr/article/details/86611779)
// - [在ios中，input唤出软键盘中‘换行’转‘搜索’、‘前往’，及直接唤醒数字键盘的实现（vue）](https://blog.csdn.net/zuoyiran520081/article/details/80613082)
// - [ios input输入框type=search，软键盘搜索按钮](https://blog.csdn.net/xuexizhe88/article/details/79744258)

// 👉 flex相关
// - [flex布局1](https://www.cnblogs.com/yiyistar/p/6537026.html)
// - [flex布局2](https://www.cnblogs.com/yiyistar/p/6539485.html)
// - [CSS的flex布局看完这篇你就懂了](https://blog.csdn.net/Allenyhy/article/details/81605547)
// - [深入flex：grow，shrink，basis](https://juejin.im/post/5bba149c5188255c372f6d9f)
// - [flex-basis 的真正的使用方法以及flex-shrink计算方法](https://blog.csdn.net/lmmxxoo/article/details/83094818)
// - [css弹性盒子-------桃园三兄弟之：flex-grow、flex-shrink、flex-basis详解](https://blog.csdn.net/m0_37058714/article/details/80765562)
// - [flex布局下的flex-grow、flex-shrink、flex-basis属性详解](https://blog.51cto.com/13876655/2154955)
// - [深入理解 flex-grow & flex-shrink & flex-basis](https://segmentfault.com/a/1190000006741711)
// - [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
// - [Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

// 👉 Vue过渡动画
// - [pageAinimate](https://github.com/zhengguorong/pageAinimate)
// - [Vue实现路由前进后退动画效果](https://www.jianshu.com/p/3e9fbc96f8d0)
// - [vue-route-transition路由前进后退动画](https://www.jianshu.com/p/4ea5b444e7bb)
// - [vue-route-transition](https://github.com/dreamback/vue-route-transition)

// 👉 JS 字符串转数字
// - [浅谈JS 数字和字符串之间相互转化的纠纷](https://www.jb51.net/article/126286.htm)
// - [JavaScript字符串转数字的5种方法及遇到的坑](https://www.jb51.net/article/143833.htm)

// 👉 H5移动端适配总结
// - [H5移动端适配总结](https://www.jianshu.com/p/64877ce6e893)
// - [解惑好文：移动端H5页面高清多屏适配方案](http://www.cocoachina.com/webapp/20150715/12585.html )
// - [hotcss](https://github.com/imochen/hotcss)
// - [h5页面适配小结](https://www.cnblogs.com/luoxiaoer/p/9465589.html)
// - [CSS尺寸单位 % px em rem 详解](https://www.cnblogs.com/HDK2016/p/6128503.html)
// - [CSS3用rem,em,px设置字体大小](https://www.cnblogs.com/design-engineer/p/5382051.html)

// 👉 vue-lazyload使用
// - [vue-lazyload](https://github.com/hilongjw/vue-lazyload)
// - [vue中使用图片懒加载vue-lazyload插件详细指南](https://segmentfault.com/a/1190000011672452)
// - [VUE图片懒加载-vue lazyload插件的简单使用](https://www.cnblogs.com/xyyt/p/7650539.html)
// - [vue 图片懒加载插件 vue-lazyload 使用说明](https://segmentfault.com/a/1190000014928116)

// 👉 vue 组件按需引用，vue-router懒加载，vue打包优化，加载动画
// - [vue 组件按需引用，vue-router懒加载，vue打包优化，加载动画](https://www.cnblogs.com/coolslider/p/7074609.html)
// - [vue-router路由懒加载（解决vue项目首次加载慢）](https://www.cnblogs.com/lijuntao/p/7777581.html)
// - [Vue-Router + Webpack 路由懒加载实现](https://segmentfault.com/a/1190000015904599)
// - [实现vue-router 路由懒加载](https://segmentfault.com/a/1190000012705647)
// - [vue项目实现按需加载的3种方式：vue异步组件、es提案的import()、webpack的require.ensure()](https://segmentfault.com/a/1190000011519350)

// 👉 图片浏览器相关
// - [PhotoSwipe中文API(一)](https://www.cnblogs.com/jiangxiaobo/p/5695831.html)
// - [PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe)
// - [好用并强大的图片插件：PhotoSwipe.js](https://blog.csdn.net/weixin_39717076/article/details/81481910)
// - [H5端js实现图片放大滑动查看-插件photoswipe的使用](https://www.cnblogs.com/liboxncg/p/7098349.html)
// - [PhotoSwipe之参数options（3）](https://blog.csdn.net/my_study_everyday/article/details/85685190)
// - [PhotoSwipe入门（2）](https://blog.csdn.net/my_study_everyday/article/details/85617257)

// 👉 JS 深拷贝
// - [在vue中子组件修改props引发的对js深拷贝和浅拷贝的思考](https://www.cnblogs.com/hutuzhu/p/10119698.html)

/// --------🔥 Third Lib 🔥-------------
// - [vue-lazyload)](https://github.com/hilongjw/vue-lazyload)
// - [better-scroll](https://github.com/ustbhuangyi/better-scroll)
// - [cube-ui](https://github.com/didi/cube-ui/)
// - [当 better-scroll 遇见 Vue](https://zhuanlan.zhihu.com/p/27407024)
// - [IScroll 实践指南(上)](https://qbaty.iteye.com/blog/1221061)
// - [ChinaMobilePhoneNumberRegex](https://github.com/VincentSit/ChinaMobilePhoneNumberRegex)
// - [JSVerbalExpressions](https://github.com/VerbalExpressions/JSVerbalExpressions)
// - [精致的下拉刷新和上拉加载 js框架](https://github.com/mescroll/mescroll)
// - [zepto](https://github.com/madrobby/zepto)
// - [vue-preview](https://github.com/LS1231/vue-preview)
// - [PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe)
// - [viewerjs](https://github.com/fengyuanchen/viewerjs)
// - [vue点击图片预览放大（可旋转、翻转、缩放、上下切换、键盘操作viewerjs](https://blog.csdn.net/guozhangqiang/article/details/82251893)
// - [专注于移动端的fullPage.js](https://github.com/yanhaijing/zepto.fullpage)
// - [强烈推荐优秀的Vue UI组件库](https://www.jianshu.com/p/398a3b2e535f)
// - [dynamicsjs](http://dynamicsjs.com/)
// - [velocity](https://github.com/julianshapiro/velocity)
// - [dropzone](https://github.com/enyo/dropzone)





// https://github.com/SunshineBrother/JHBlog

/** 
 * 
 * {
  "explorer.confirmDragAndDrop": false,
  "workbench.sideBar.location": "left",
  "workbench.editor.showTabs": false,
  "editor.fontSize": 18,
  "explorer.confirmDelete": false,
  "editor.tabSize": 2,
  "window.restoreWindows": "all",
  "editor.formatOnSave": true,
  "css.fileExtensions": ["css", "scss"],
  "editor.quickSuggestions": {
    "other": true,
    "comments": true,
    "strings": true
  },
  "diffEditor.ignoreTrimWhitespace": true,
  "files.autoSave": "off",
  "workbench.iconTheme": "vscode-icons",

  "prettier.singleQuote": true,
  "prettier.semi": false,
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    {
      "language": "vue",
      "autoFix": true
    },
    {
      "language": "html",
      "autoFix": true
    },
    {
      "language": "javascript",
      "autoFix": true
    },
    {
      "language": "javascriptreact",
      "autoFix": true
    },
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "typescriptreact",
      "autoFix": true
    }
  ],
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}

*/
