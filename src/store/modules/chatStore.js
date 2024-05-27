import { defineStore } from "pinia";
import { getAllMessage,
    storeMessage } from '../../api'

export const chatStore = defineStore({
  namespaced: true,
  id: "chat",
  state: () => ({
  }),
  actions: {
    async getAllMessage() {
      const result = await getAllMessage();
      return result;
    },

    async storeMessage(params) {
      const response = await storeMessage(params)
      return response;
    },
  },
  getters: {
    getState: (state) => state,
  },

  persist: {
  },
});