<template>
  <div class="slot__wrapper">
    <div class="xxoo">Slot Test</div>
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot :user="user">{{ user.firstName }}</slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        firstName: "Coder",
        lastName: "MikeHe"
      }
    };
  }
};
</script>

<style scoped>
.xxoo {
  background-color: blueviolet;
  height: 40px;
  line-height: 40px;
}

.slot__wrapper {
  background-color: #fff;
}

header {
  background-color: red;
}

main {
  background-color: orange;
}

footer {
  background-color: yellow;
}
</style>
