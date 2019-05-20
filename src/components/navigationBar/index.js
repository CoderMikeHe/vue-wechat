import NavigationBarComp from './NavigationBar.vue';

// 这里是重点
const NavigationBar = {
    install: function(Vue){
        Vue.component('NavigationBar',NavigationBarComp);
    }
};

// 导出组件
export default NavigationBar;

// 🔥 vue自定义全局组件
// https://www.jianshu.com/p/26ba589bc161
// https://blog.csdn.net/weixin_42283462/article/details/80600623
// - [vue自定义组件(通过Vue.use()来使用)即install的使用](https://blog.csdn.net/wang729506596/article/details/81018270)

// - [Vuejs（16）——Vue插件写、用详解（附demo）](https://blog.csdn.net/qq20004604/article/details/56965703)
// - [自己写个vue.js插件(1):自定义指令的妙用](https://blog.csdn.net/github_26672553/article/details/53046923)
// - [实战Vue组件和Mixins](https://www.w3cplus.com/vue/practical-use-of-components-and-mixins-in-vue-js.html)
// - [Vue2.0学习笔记：Vue中的Mixins](https://www.w3cplus.com/vue/vue-mixins.html)



