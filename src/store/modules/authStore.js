import { defineStore } from "pinia";
import { login, logout } from '../../api'

export const authStore = defineStore({
  namespaced: true,
  id: "auth",
  state: () => ({
    user: null,
    token: null,
    isShow: false,
  }),
  actions: {
    async login(payload) {
      const result = await login(payload);
      if (result.status) {
        this.user = result.data.user
        this.token = result.data.token
      }
      return result;
    },

    async logout() {
      const response = await logout()
      return response;
    },
  },
  getters: {
    getState: (state) => state,
    isLogin() {
      return this.token !== null;
    },
  },

  persist: {
    storage: sessionStorage,
  },
});