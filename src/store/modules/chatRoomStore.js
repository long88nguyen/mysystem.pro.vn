import { defineStore } from "pinia";
import { getListChatRoom,
  storeChatRoom, getChatRoomById } from "../../api";

export const chatRoomStore = defineStore({
  namespaced: true,
  id: "chat-room-store",
  state: () => ({}),
  actions: {
    async getListChatRoom() {
      const result = await getListChatRoom();
      return result;
    },

    async storeChatRoom(params) {
      const result = await storeChatRoom(params);
      return result;
    },

    async getChatRoomById(id) {
      const result = await getChatRoomById(id);
      return result;
    },

  },
  getters: {
    getState: (state) => state,
  },

  persist: {},
});
