<template>
<div>
    <div class="weui-tab">
        <div class="weui-tab__panel"></div>
        <div class="weui-tabbar">
            <a href="javascript:;" class="weui-tabbar__item weui-bar__item_on" @click="itemClick">
                <img src="../../assets/images/tabbar_contacts_27x23@2x.png" alt class="weui-tabbar__icon">
                <p class="weui-tabbar__label">微信</p>
            </a>
            <a href="javascript:;" class="weui-tabbar__item" @click="itemClick">
                <img src="/src/assets/images/tabbar_contacts_27x23@2x.png" alt class="weui-tabbar__icon">
                <p class="weui-tabbar__label">通讯录</p>
            </a>
            <a href="javascript:;" class="weui-tabbar__item" @click="itemClick">
                <img src="/src/assets/images/tabbar_contacts_27x23@2x.png" alt class="weui-tabbar__icon">
                <p class="weui-tabbar__label">发现</p>
            </a>
            <a href="javascript:;" class="weui-tabbar__item" @click="itemClick">
                <img src="../../assets/images/tabbar_contacts_27x23@2x.png" alt class="weui-tabbar__icon">
                <p class="weui-tabbar__label">我</p>
            </a>
        </div>
    </div>
</div>
</template>

<script>
import 'weui'   
export default {
    data() {
        return {
            
        }
    },
    methods: {
        itemClick(e){
            console.log(e)
        }
    },
};
</script>

<style lang="scss" scoped>
</style>
