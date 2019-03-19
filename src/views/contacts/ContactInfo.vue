// 联系人信息
<template>
  <div class="_full-container">
    <NavigationBar title="哈哈" :left-item="backItem" @left-click="$router.back()"></NavigationBar>
    <div class="_full-content _content-margin-top44">
      <section class="contact-info-group">
        <div class="contact-info-group__info"></div>
        <div class="contact-info-group__remark"></div>
      </section>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.contact-info-group {
  overflow: hidden;
  position: relative;
  background-color: #fff;
}
</style>
