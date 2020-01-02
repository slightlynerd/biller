import Vue from 'vue';
import './plugins/axios';
import VueMeta from 'vue-meta';
import App from './App.vue';
import router from './router';
import store from './store';

// import layout files
import Dashboard from './layouts/Dashboard.vue';
import Auth from './layouts/Auth.vue';

Vue.component('dashboard-layout', Dashboard);
Vue.component('auth-layout', Auth);

Vue.config.productionTip = false;
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true,
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
