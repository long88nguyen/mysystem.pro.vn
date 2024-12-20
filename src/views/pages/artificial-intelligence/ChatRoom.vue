<template>
  <div class="chat-room">
    <div class="chat-room-header">
        <div class="d-flex justify-content-between align-items-center">
            <div class="avatar">
                <img src="../../../assets/uploads/model_1.png" alt="" width="50px" height="50px" class="img-thumbnail" style="border-radius: 25px;">
                <b class="ms-2">BOT chat 1</b>
            </div>
            <router-link :to="{ name: 'ListChatRoom' }"><a-button>Quay lại<i class="fa-solid fa-arrow-right ms-2"></i></a-button></router-link> 
        </div>
    </div>
    <hr>
    <div class="chat-room-message">
        <Message :messages = "messages"></Message>
    </div>
    <div class="chat-room-input d-flex">
        <a-input placeholder = "Nhập..."></a-input>
        <a-button class="ms-2" type = "primary">Gửi</a-button>
    </div>
    
    <div class="chat-room-footer">

    </div>
  </div>
</template>

<script setup>
import Message from './Message.vue';
import { chatRoomStore } from '../../../store';

const dataMessages = ref(null);


const messages = [
    {
        role : 'system',
        message : 'Look how big the moon is!',
        time: '11:00:00',
    },
    {
        role : 'user',
        message : 'I want to go to the zoo tomorrow.',
        time: '12:00:00',
    },
    {
        role : 'user',
        message : 'Clean your room now!',
        time: '13:00:00',
    },
    {
        role : 'system',
        message : 'I like going to school!',
        time: '14:00:00',
    }   
]
</script>

<style>

</style>