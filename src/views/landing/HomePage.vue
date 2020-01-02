<template>
  <section class="pb-5">
    <h1>Dashboard</h1>
    <toast-msg></toast-msg>
    <p
      class="text-info"
      v-show="bills.length < 1"
    >No bills yet. Create a new bill by clicking the + button</p>
    <div v-if="loading" class="spinner-border text-success" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="row" v-else>
      <div v-for="bill in bills" :key="bill.bill_id" class="col-md-4 mt-4">
        <div class="card bill border-0 shadow-sm">
          <div class="card-body">
            <p class="f-24">{{ bill.title }}</p>
            <p>
              <strong>Description</strong>
              : {{ bill.description }}
            </p>
            <div
              class="mt-4"
              v-for="(recipient, index) in bill.bill_recipients"
              :key="recipient.id"
            >
              <h6 class="lead">Recipient {{ index + 1 }}</h6>
              <p>
                <strong>Email</strong>
                : {{ recipient.email }}
              </p>
              <p>
                <strong>Amount</strong>
                :
                <span class="bill-amount">{{ recipient.amount }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-link class="btn fab shadow-lg" to="/create-bill">+</router-link>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Toast from "../../components/Toast.vue";

export default {
  metaInfo: {
    title: "Dashboard",
    titleTemplate: "%s | Biller"
  },
  data() {
    return {
      loading: false
    };
  },
  components: {
    "toast-msg": Toast
  },
  computed: mapState(["user", "bills"]),
  async mounted() {
    this.loading = true;
    const result = await this.listUserBills(this.user.user_account_id);
    this.loading = false;
    if (!result) {
      return this.showToast(
        "Failed to load bills. Please reload to try again."
      );
    }
  },
  methods: {
    ...mapActions(["listUserBills"]),
    showToast(msg) {
      $("#myToast").toast({ delay: 3000 });
      $("#myToast").toast("show");
      $(".toast-body").text(msg);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/core/home.scss";
</style>