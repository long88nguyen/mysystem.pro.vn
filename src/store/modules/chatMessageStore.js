import { defineStore } from "pinia";
import { storeMessageText, storeMessageSpeech } from "../../api";

export const chatMessageStore = defineStore({
  namespaced: true,
  id: "chat-message-store",
  state: () => ({}),
  actions: {
    async storeMessageText(params) {
      const result = await storeMessageText(params);
      return result;
    },

    async storeMessageSpeech(params) {
      const result = await storeMessageSpeech(params);
      return result;
    },
  },
  getters: {
    getState: (state) => state,
  },

  persist: {},
});
