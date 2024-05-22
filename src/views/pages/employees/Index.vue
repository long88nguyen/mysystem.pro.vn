<template>
  <div class="w-100">
    <div class="text-end">
      <a-button @click="openModal">+ Add new record</a-button>
    </div>
    <a-table
      :dataSource="data"
      :columns="columns"
      class="mt-2"
      :pagination="false"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key == 'action'">
          <a-popconfirm
            placement="top"
            title="Are you sure to delete this record ?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="deleteRecord(record.id)"
          >
            <a-button type="link" :key="record.key">Xóa</a-button>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
  <a-card hoverable style="width: 300px" class="mt-2">
    <template #cover>
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    </template>
    <template #actions>
      <SettingOutlined key="setting" />
      <edit-outlined key="edit" />
      <ellipsis-outlined key="ellipsis" />
    </template>
  </a-card>
  <EmployeeCreateModal
    :isOpen="isOpenAddNewModal"
    @handleCancel="closeModal"
    @handleOk="updateList"
    v-if="isOpenAddNewModal"
  ></EmployeeCreateModal>

  <a-pagination
    v-model:current="pagination.current_page"
    @change="changePage"
    v-model:page-size="pagination.per_page"
    :total="pagination.total"
    show-less-items
    class="text-center mt-3"
  />
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { SettingOutlined, EditOutlined, EllipsisOutlined } from "@ant-design/icons-vue";
import moment from "moment";
import { message } from "ant-design-vue";
import EmployeeCreateModal from "./modals/EmployeeCreateModal.vue";

const isOpenAddNewModal = ref(false);
const url = import.meta.env.VITE_APP_API;
const data = ref(null);
const pagination = ref([]);

const columns = ref([
  {
    title: "No.",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Created at",
    dataIndex: "created_at",
    key: "created_at",
  },

  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
]);
const fetchData = async (params = {}) => {
  let response = await axios.get(url + "employee", { params });
  if (response.status) {
    data.value = response.data.data.data.map((item, index) => ({
      id: item.id,
      key: index + 1,
      name: item.name,
      age: item.age,
      created_at: moment(item.created_at).format("H:s DD/MM/YYYY"),
    }));

    pagination.value = response.data.data;
  }
};

const openModal = () => {
  isOpenAddNewModal.value = true;
};

const closeModal = () => {
  isOpenAddNewModal.value = false;
};

const updateList = () => {
  isOpenAddNewModal.value = false;
  fetchData();
};

const deleteRecord = async (employeeId) => {
  let response = await axios.delete(url + "employee/delete/" + employeeId);
  if (response.status) {
    message.success("Record deleted successfully!");
    fetchData();
  }
};

const changePage = (page) => {
  fetchData({ page: page });
};
onMounted(() => {
  fetchData();
});
</script>

<style>
</style>