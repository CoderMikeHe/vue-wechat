<template>
  <vue-route-layout>
    <div class="xxoo" @click="$router.back()"></div>
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
  },
  activated() {
    console.log("nnnn");
  }
};
</script>

<style scoped>
.xxoo {
  background-color: red;
  height: 500px;
}
</style>
