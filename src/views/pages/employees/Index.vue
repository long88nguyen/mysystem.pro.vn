<template>
    <div class="w-100">
        <div class="text-end">
            <a-button @click="openModal">+ Add new record</a-button>
        </div>
        <a-table :dataSource="data" :columns="columns" class="mt-2">
            <template #bodyCell = "{ column, record }">
                <template v-if="column.key == 'action'">
                    <a-popconfirm placement="top" title="Are you sure to delete this record ?" ok-text="Yes" cancel-text="No" @confirm="deleteRecord(record.id)">
                        <a-button type = "link" :key="record.key">Xóa</a-button>
                    </a-popconfirm>
                </template>
            </template>
        </a-table>
    </div>
    <EmployeeCreateModal :isOpen = "isOpenAddNewModal" @handleCancel = "closeModal" @handleOk = "updateList" v-if="isOpenAddNewModal"></EmployeeCreateModal>
</template>

<script setup>
import axios from "axios"
import { onMounted, ref } from "vue";
import moment from "moment";
import { message } from 'ant-design-vue';
import EmployeeCreateModal from "./modals/EmployeeCreateModal.vue";

const isOpenAddNewModal = ref(false);
const url = import.meta.env.VITE_APP_API
const data = ref(null)
const columns = ref([
    {
        title: 'No.',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Created at',
        dataIndex: 'created_at',
        key: 'created_at',
    },

    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
    },

])
const fetchData = async() => {
    let response = await axios.get(url + "employee");
    if(response.status)
    {
        data.value = response.data.data.map((item,index) => ({
            id: item.id,
            key: index + 1,
            name: item.name,
            age: item.age,
            created_at: moment(item.created_at).format("H:s DD/MM/YYYY"),
        }));
    }
}

const openModal = () => {
    isOpenAddNewModal.value = true;
}

const closeModal = () => {
    isOpenAddNewModal.value = false;
}

const updateList = () => {
    isOpenAddNewModal.value = false;
    fetchData();
}

const deleteRecord = async(employeeId) =>
{
    let response = await axios.delete(url + "employee/delete/" + employeeId);
    if(response.status)
    {
        message.success('Record deleted successfully!')
        fetchData();
    }
}

onMounted(() => {
    fetchData();
})
</script>

<style>

</style>