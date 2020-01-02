import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/signup',
    meta: { layout: 'auth', requiresAuth: false },
    component: () => import('../views/auth/SignupPage.vue'),
  },
  {
    path: '/login',
    meta: { layout: 'auth', requiresAuth: false },
    component: () => import('../views/auth/LoginPage.vue'),
  },
  {
    path: '/',
    meta: { layout: 'dashboard', requiresAuth: true },
    component: () => import('../views/landing/HomePage.vue'),
  },
  {
    path: '/create-bill',
    meta: { layout: 'dashboard', requiresAuth: true },
    component: () => import('../views/landing/CreateBillPage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const authenticated = store.getters.isAuthenticated;

  if (requiresAuth && !authenticated) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath },
    });
  }

  return next();
});

export default router;
