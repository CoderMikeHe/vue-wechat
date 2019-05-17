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