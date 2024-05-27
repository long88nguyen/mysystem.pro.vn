<template>
    
    <h4>Chat</h4>
    <b>User</b>
    <template v-for="(message, index) in messages" :key="index">
        <div>
            <b class="text-primary">{{ message.user.name }}</b> : {{ message.message }}
        </div>
    </template>

    <div class="d-flex align-items-center">
        <a-input class="m-2" placeholder = "Enter message ..." v-model:value ="messageContent" @keyup.enter="sendMessage"></a-input>
        <a-button type = "primary">Send message</a-button>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue"
import { chatStore } from "../../../store"
import echo from '../../../echo';
import Echo from "laravel-echo";

const messageContent = ref('')
const messages = ref([])
const fetchData = async() => {
    let response = await chatStore().getAllMessage();
    if (response.status)
    {
        messages.value = response.data;
    }
}

const sendMessage = async() => {
    await chatStore().storeMessage({ message:messageContent.value});
    fetchData();
}

onBeforeMount(() => {
    fetchData();
    echo.channel('laravel_database_chatroom').listen('MessagePosted', (data) => {
        const message = data.message
        message.user = data.user
        messages.value.push(message)
    })
})
</script>

<style>

</style>