import { defineStore } from "pinia";
import { storeExam,getAllExam,updatePronunciationExam,deletePronunciationExam,uploadFileAWS,
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

    async updatePronunciationExam(id, params) {
      const result = await updatePronunciationExam(id, params);
      return result;
    },

    async deletePronunciationExam(id) {
      const result = await deletePronunciationExam(id);
      return result;
    },

    async uploadFileAWS(form) {
      const result = await uploadFileAWS(form);
      return result;
    },
  },
  getters: {
    getState: (state) => state,
  },

  persist: {},
});
