<template>
  <a-modal :open="isOpen" title="Add new employee" @cancel = "emits('handleCancel')" @ok = "saveEmployee">
        <form action="" @submit.prevent="saveEmployee" class="mt-3">
            <a-input placeholder = "Enter name ..." v-model:value="form.name"></a-input>
            <a-input placeholder = "Enter age ..." class="mt-3" v-model:value="form.age"></a-input>
        </form>
  </a-modal>
</template>

<script setup>
import { reactive, toRefs } from "vue"
import axios from "axios"
import { message } from "ant-design-vue"

const props = defineProps(['isOpen'])
const { isOpen } = toRefs(props)
const emits = defineEmits(['handleCancel', 'handleOk'])

const form = reactive({})
const url = import.meta.env.VITE_APP_API
const saveEmployee = async() => {
    let response = await axios.post(url + "employee/store",form)
    if(response.status)
    {
        message.success('Add new record successfully') 
        emits('handleOk')
    }
}
</script>

<style>

</style>