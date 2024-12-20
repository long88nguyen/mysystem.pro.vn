import { defineStore } from "pinia";
import { storeMessageText } from "../../api";

export const chatMessageStore = defineStore({
  namespaced: true,
  id: "chat-message-store",
  state: () => ({}),
  actions: {
    async storeMessageText(params) {
      const result = await storeMessageText(params);
      return result;
    },
  },
  getters: {
    getState: (state) => state,
  },

  persist: {},
});
