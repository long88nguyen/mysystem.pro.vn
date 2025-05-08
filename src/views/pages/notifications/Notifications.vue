<template>
  Thông báo
  <input type="text" class="form-control" v-model="messageItem">
    <div class="text-center mt-3">
        <button class="btn btn-sm btn-primary" @click="sendMessage">Gửi tin nhắn</button>
    </div>
  <div class="card mt-3">
    <div class="card-header">
        <b>Danh sách thông báo</b>
    </div>
    <div class="card-body">
        <li v-for="(item, key) in messages" :key="key">
          {{ item?.user_id }}. {{ item.message }}
        </li>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import echo from "../../../utils/echo"
import { notificationStore } from '../../../store';
import { message } from 'ant-design-vue';

const messageItem = ref(null);
const messages = ref([]);

const getMessage = async() => {
    await notificationStore().getNotification().then((response) => {
        messages.value = response.data
    });
}

const sendMessage = async () => {
    await notificationStore().sendNotification({ message : messageItem.value}).then((response) => {
    })
}

onMounted(() => {
    getMessage()
    echo.channel('notifications-2')
      .listen('NotificationEvent', (data) => {
        messages.value?.push(data.message)
      });
})

onBeforeUnmount(() => {
    echo.leaveChannel('notifications');
})
</script>

<style>

</style>