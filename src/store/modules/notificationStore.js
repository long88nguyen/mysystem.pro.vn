import { defineStore } from "pinia";
import { sendNotification, getNotification } from '../../api'

export const notificationStore = defineStore({
  namespaced: true,
  id: "notification",
  state: () => ({
  }),
  actions: {
    async sendNotification(params) {
      const result = await sendNotification(params);
      return result;
    },

    async getNotification(params) {
        const result = await getNotification(params);
        return result;
      },
  },
  getters: {
    getState: (state) => state,
  },

  persist: {
  },
});