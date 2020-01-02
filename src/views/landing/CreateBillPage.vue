<template>
  <section class="w-75">
    <toast-msg></toast-msg>
    <h1>Create a Bill</h1>
    <form @submit.prevent="createBill">
      <input class="form-control" type="text" placeholder="Title" v-model="bill.title" required />
      <input
        class="form-control"
        type="text"
        placeholder="Description"
        v-model="bill.description"
        required
      />
      <p>Recipients</p>
      <div v-for="(item, index) in bill.recipients" :key="index">
        <input
          class="form-control"
          type="email"
          placeholder="Recipient Email"
          v-model="bill.recipients[index].email"
        />
        <input
          class="form-control"
          type="number"
          placeholder="Recipient Amount"
          v-model="bill.recipients[index].amount"
        />
        <button
          type="button"
          class="btn text-danger"
          @click="delRecipient(index)"
          v-show="index > 0"
        >Delete recipient</button>
        <hr />
      </div>
      <button class="btn text-info mt-3" type="button" @click="moreRecipients">Add more recipients</button>
      <button class="btn btn-accent rounded-pill px-5 mt-3" type="submit" :disabled="loading">
        <span v-if="!loading">Create Bill</span>
        <span v-else>Creating bill...</span>
      </button>
    </form>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Toast from "../../components/Toast.vue";

export default {
  metaInfo: {
    title: "Create Bill",
    titleTemplate: "%s | Biller"
  },
  components: {
    "toast-msg": Toast
  },
  computed: mapState(["user"]),
  data() {
    return {
      loading: false,
      bill: {
        title: "",
        description: "",
        recipients: [
          {
            email: "",
            amount: ""
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions(["createUserBill"]),
    moreRecipients() {
      this.bill.recipients.push({ email: "", amount: "" });
    },
    delRecipient(index) {
      this.bill.recipients.splice(index, 1);
    },
    showToast(msg) {
      $("#myToast").toast({ delay: 3000 });
      $("#myToast").toast("show");
      $(".toast-body").text(msg);
    },
    async createBill() {
      this.loading = true;
      let computedBill = this.bill;
      this.bill["user_account_id"] = this.user.user_account_id;
      const result = await this.createUserBill(this.bill);
      this.loading = false;
      if (!result) {
        return this.showToast(
          "Failed to create bill. Please fill in all fields!"
        );
      }
      this.showToast("Bill created successfully");
      return this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>