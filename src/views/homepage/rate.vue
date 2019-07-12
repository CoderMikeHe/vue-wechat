<template>
  <vue-route-layout>
    <div class="xxoo"></div>
  </vue-route-layout>
</template>
<script>
export default {
  data() {
    return {
      value: 3
    };
  },
  mounted() {
    console.log("mmmm");
  }
};
</script>

<style scoped>
.xxoo {
  background-color: red;
  height: 500px;
}
</style>
