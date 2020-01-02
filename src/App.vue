<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
const defaultLayout = "dashboard";

export default {
  computed: {
    layout() {
      return `${this.$route.meta.layout || defaultLayout}-layout`;
    }
  }
};
</script>

<style lang="scss">
@import "assets/styles/main.scss";
</style>
