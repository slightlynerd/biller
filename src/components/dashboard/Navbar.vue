<template>
  <nav class="navbar navbar-expand-xs py-2">
    <router-link class="navbar-brand" to="/">Biller</router-link>
    <div class="justify-content-end">
      <div class="navbar-nav">
        <button class="btn btn-accent px-4" @click="logout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["logoutUser"]),
    logout() {
      this.logoutUser();
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/widgets/navbar.scss";
</style>