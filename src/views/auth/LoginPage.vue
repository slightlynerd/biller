<template>
  <section>
    <toast-msg></toast-msg>
    <h1>
      Login to
      <span class="title">Biller</span>
    </h1>
    <p class="lead">Enter your login details to access your account.</p>
    <form @submit.prevent="login">
      <input
        class="form-control"
        type="email"
        placeholder="Email"
        v-model="userDetail.email"
        required
      />
      <input
        class="form-control"
        type="password"
        placeholder="Password"
        v-model="userDetail.password"
        required
      />
      <button class="btn btn-accent rounded-pill px-5" type="submit" :disabled="loading">
        <span v-if="!loading">Login</span>
        <span v-else>Logging in...</span>
      </button>
    </form>
    <hr class="mt-4" />
    <p class="text-secondary mt-4">
      Don't have an account?
      <router-link to="/signup">Sign up</router-link>
    </p>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import Toast from "../../components/Toast.vue";

export default {
  metaInfo: {
    title: "Login",
    titleTemplate: "%s | Biller"
  },
  components: {
    "toast-msg": Toast
  },
  data() {
    return {
      userDetail: {
        email: "",
        password: ""
      },
      loading: false
    };
  },
  methods: {
    ...mapActions(["loginUser"]),
    showToast(msg) {
      $("#myToast").toast({ delay: 3000 });
      $("#myToast").toast("show");
      $(".toast-body").text(msg);
    },
    async login() {
      this.loading = true;
      const result = await this.loginUser(this.userDetail);
      this.loading = false;
      if (!result) {
        return this.showToast("Incorrect email or password.");
      }
      return this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>