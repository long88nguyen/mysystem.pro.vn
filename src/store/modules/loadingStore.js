//store/modules/auth.js
import { defineStore } from "pinia";
export const loadingStore = defineStore({
  namespaced: true,
  id: "loading",
  state: () => ({
    loadingOpen: false,
  }),
  actions: {
    async start() {
      this.loadingOpen = true;
      // document.querySelector('.loading_component').classList.remove("d-none");
    },
    async stop(timeout = 0) {
      setTimeout(() => {
        this.loadingOpen = false;
        // document.querySelector('.loading_component').classList.add("d-none");
      }, timeout);
    },
  },
  getters: {
    dataStore: (state) => state
  },
  persist: {
    storage: sessionStorage, // data in sessionStorage is cleared when the page session ends.
  },
});