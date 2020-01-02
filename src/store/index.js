import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import axios from 'axios';

// auth apis
import { signUp, login } from '../api/auth';
// bill apis
import { createBill, listBill } from '../api/bill';

Vue.use(Vuex);

const vuexLocal = new VuexPersist({
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    token: '',
    bills: [],
    user: {},
  },
  getters: {
    isAuthenticated(state) {
      if (state.token) {
        return true;
      }
      return false;
    },
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setBill(state, payload) {
      state.bills = payload;
    },
  },
  actions: {
    async fetchAPI({ commit }, options) {
      try {
        const { data } = await options.method(options.payload);
        return data;
      } catch (error) {
        const response = error.response ? error.response : null;
        if (response) return response.data;
        return error;
      }
    },
    async registerUser({ commit, dispatch }, payload) {
      const result = await dispatch('fetchAPI', {
        method: signUp,
        payload,
      });
      if (result.message.user) {
        commit('setUser', result.message.user);
        return true;
      }
      return false;
    },
    async loginUser({ commit, dispatch }, payload) {
      const result = await dispatch('fetchAPI', {
        method: login,
        payload,
      });
      if (result.message.access_token) {
        axios.defaults.headers.common.Authorization = `Bearer ${result.message.access_token}`;
        commit('setToken', result.message.access_token);
        commit('setUser', result.message.user);
        return true;
      }
      return false;
    },
    async createUserBill({ dispatch }, payload) {
      const result = await dispatch('fetchAPI', {
        method: createBill,
        payload,
      });
      if (result.status === 'ok') {
        return true;
      }
      return false;
    },
    async listUserBills({ commit, dispatch }, payload) {
      const result = await dispatch('fetchAPI', {
        method: listBill,
        payload,
      });
      if (result.status === 'ok') {
        commit('setBill', result.message);
        return true;
      }
      return false;
    },
    logoutUser({ commit }) {
      commit('setUser', {});
      commit('setToken', null);
      commit('setBill', []);
    },
  },
  plugins: [vuexLocal.plugin],
});
