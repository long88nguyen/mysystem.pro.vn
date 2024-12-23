import { defineStore } from "pinia";
import { storeExam,getAllExam,
  getByIdExam } from "../../api";

export const pronunciationStore = defineStore({
  namespaced: true,
  id: "pronunciation-store",
  state: () => ({}),
  actions: {
    async storeExam(params) {
      const result = await storeExam(params);
      return result;
    },

    async getAllExam() {
      const result = await getAllExam();
      return result;
    },

    async getByIdExam(id) {
      const result = await getByIdExam(id);
      return result;
    },
  },
  getters: {
    getState: (state) => state,
  },

  persist: {},
});
