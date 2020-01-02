<template>
  <main class="main">
    <nav-menu></nav-menu>
    <div class="content px-3 py-3">
      <slot />
    </div>
  </main>
</template>

<script>
import Navbar from "../components/dashboard/Navbar.vue";

export default {
  components: {
    "nav-menu": Navbar
  }
};
</script>

<style lang="scss">
@import "../assets/styles/core/dashboard.scss";
</style>