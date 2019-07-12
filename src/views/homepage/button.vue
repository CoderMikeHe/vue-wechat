<template>
  <vue-route-layout>
    <div class="ooxx" @click="xk">
      <div>这是一段文字</div>
    </div>
  </vue-route-layout>
</template>

<script>
export default {
  name: "btn",
  methods: {
    xk() {
      this.$router.push({
        name: "rate"
      });
    }
  },
  created() {
    console.log("btn -- =++created");
  },
  mounted() {
    console.log("btn -- =++mounted");
  },
  activated() {
    console.log("btn -- activated");
  }
};
</script>
<style scoped>
.ooxx {
  background-color: yellow;
  height: 300px;
}
</style>
