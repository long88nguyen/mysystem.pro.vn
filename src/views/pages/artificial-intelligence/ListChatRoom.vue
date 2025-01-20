<template>
  <h5>Danh sách phòng chat</h5>
  <div class="text-end">
    <router-link
      :to="{ name: 'CreateRoom' }"
      class="btn btn-sm btn-sm btn-primary"
      >Tạo phòng chat</router-link
    >
    <a-table
      :dataSource="dataTable"
      :columns="columns"
      class="mt-2"
      :pagination="false"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key == 'action'">
           <router-link :to = "{ name: 'ChatRoom', params: { id: record.id } }"><a-button type="link" ><i class="fa-solid fa-comments"></i></a-button></router-link> 
           <i class="fa-solid fa-file-pen ms-2 text-success" @click="isOpenModal = true"></i>
        </template>
      </template>
    </a-table>
  </div>
  <Loading2 v-if="isLoading"/>
  <EditChatRoom :isOpen = "isOpenModal" v-if = "isOpenModal" @handleCancel = "isOpenModal = false" @handleUpdate = "() => { isOpenModal = false; fetch() }"></EditChatRoom>
</template>

<script setup>
import Loading2 from "../../components/Loading2.vue";
import { onMounted, ref } from "vue";
import { chatRoomStore } from "../../../store";
import EditChatRoom from "./EditChatRoom.vue";

const chatRooms = ref(null);
const dataTable = ref([]);
const isLoading = ref(false);
const isOpenModal = ref(false);

const columns = ref([
  {
    title: "No.",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Tên đoạn chat",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
]);

const fetch = async () => {
  isLoading.value = true;
  await chatRoomStore()
    .getListChatRoom()
    .then((response) => {
      isLoading.value = false;
      chatRooms.value = response.data;
      dataTable.value = chatRooms.value.map((item, key) => ({
        key: key + 1,
        id: item.id,
        name: item.name,
      }));
    })
    .catch((error) => {
      console.log(error);
    });
};

onMounted(() => {
  fetch();
});
</script>

<style></style>
