import { defineStore } from "pinia";
import { sendMail } from '../../api'

export const mailStore = defineStore({
  namespaced: true,
  id: "mail",
  state: () => ({
  }),
  actions: {
    async sendMail(params) {
      const result = await sendMail(params);
      return result;
    },
  },
  getters: {
    getState: (state) => state,
  },

  persist: {
  },
});