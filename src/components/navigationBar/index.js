import NavigationBarComp from './NavigationBar.vue';

// 这里是重点
const NavigationBar = {
    install: function(Vue){
        Vue.component('NavigationBar',NavigationBarComp);
    }
};

// 导出组件
export default NavigationBar;


// https://www.jianshu.com/p/26ba589bc161
// https://blog.csdn.net/weixin_42283462/article/details/80600623