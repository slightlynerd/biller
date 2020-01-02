<template>
  <section>
    <toast-msg></toast-msg>
    <h1>
      Sign up to
      <span class="title">Biller</span>
    </h1>
    <p class="lead">Create an account to access amazing features of biller!</p>
    <form @submit.prevent="signUp">
      <input
        class="form-control"
        type="text"
        placeholder="Username"
        v-model="userDetail.username"
        required
      />
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
        <span v-if="!loading">Sign Up</span>
        <span v-else>Registering...</span>
      </button>
    </form>
    <hr class="mt-4" />
    <p class="text-secondary mt-4">
      Have an account already?
      <router-link to="/login">Login</router-link>
    </p>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import Toast from "../../components/Toast.vue";

export default {
  metaInfo: {
    title: "Signup",
    titleTemplate: "%s | Biller"
  },
  components: {
    "toast-msg": Toast
  },
  data() {
    return {
      userDetail: {
        username: "",
        email: "",
        password: ""
      },
      loading: false
    };
  },
  methods: {
    ...mapActions(["registerUser"]),
    showToast(msg) {
      $("#myToast").toast({ delay: 3000 });
      $("#myToast").toast("show");
      $(".toast-body").text(msg);
    },
    async signUp() {
      this.loading = true;
      const result = await this.registerUser(this.userDetail);
      this.loading = false;
      if (!result) {
        return this.showToast(
          "Username or email already taken. Please try again."
        );
      }
      this.showToast("Registration successful!");
      return this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>