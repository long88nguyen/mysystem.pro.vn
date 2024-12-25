import { defineStore } from "pinia";
import { storePronoun } from "../../api";

export const pronunciationResultStore = defineStore({
  namespaced: true,
  id: "pronunciation-result-store",
  state: () => ({}),
  actions: {
    async storePronoun(params) {
      const result = await storePronoun(params);
      return result;
    },
  },
  getters: {
    getState: (state) => state,
  },

  persist: {},
});
