<template>
  <h5>Danh sách bài tập</h5>
  <div class="text-end">
    <a-button type = "primary" @click="isOpenCreateModal = true">Tạo mới bài tập</a-button>
  </div>

  <a-table
      :dataSource="dataTable"
      :columns="columns"
      class="mt-2"
      :pagination="false"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key == 'action'">
           <router-link :to = "{ name: 'PronunciationExam', params: { id: record.id } }"><a-button type="primary" >Thực hành</a-button></router-link> 
        </template>
      </template>
    </a-table>
  <CreatePronunciationExam :isOpen = "isOpenCreateModal" @closeModal = "isOpenCreateModal = false" v-if="isOpenCreateModal" @handleOk = "() => { isOpenCreateModal = false, fetchData() }">

  </CreatePronunciationExam>
  <Loading2 v-if = "isLoading2"></Loading2>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { pronunciationStore } from '../../../store';
import CreatePronunciationExam from './CreatePronunciationExam.vue';
import Loading2 from '../../components/Loading2.vue';

const isLoading2 = ref(false);
const dataTable = ref(null);
const isOpenCreateModal = ref(false);
const columns = ref([
  {
    title: "No.",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Tên chủ đề",
    dataIndex: "topic_name",
    key: "topic_name",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
]);

const fetchData = async () => {
  isLoading2.value = true;
  await pronunciationStore().getAllExam().then((response) => {
    isLoading2.value = false;
    dataTable.value = response.data.map((item, key) => ({
        key: key + 1,
        id: item.id,
        topic_name: item.topic_name,
      }));
  }).catch((error) => {
    console.log(error);
    
  })
}

onMounted(() => {
  fetchData()
})

</script>

<style>

</style>