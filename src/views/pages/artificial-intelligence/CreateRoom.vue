<template>
  <h5>Tạo phòng chat</h5>
  <a-card title="Cấu hình" class="w-100">
    <div class="col-3">
      <a-input v-model:value = "chatRoom.name" placeholder ="Nhập tên đoạn chat..."></a-input>
      <a-select v-model:value = "chatRoom.language" class="mt-2 w-100" placeholder = "-- Chọn ngôn ngữ --" :options = "LANGUAGES"></a-select>
      <a-select v-model:value = "chatRoom.voice_model" class="mt-2 w-100" placeholder = "-- Chọn giọng đọc --" :options = "VOICES"></a-select>
      <a-select v-model:value = "chatRoom.text_to_speech_model" class="mt-2 w-100" placeholder = "-- Chọn dịch vụ Text To Speech --" :options = "TEXT_TO_SPEECH_MODELS"></a-select>
      <a-select v-model:value = "chatRoom.speech_to_text_model" class="mt-2 w-100" placeholder = "-- Chọn dịch vụ Speech To Text --" :options = "SPEECH_TO_TEXT_MODELS"></a-select>
      <a-select v-model:value = "chatRoom.chat_gpt_model" class="mt-2 w-100" placeholder = "-- Chọn phiên bản chat GPT --" :options = "CHAT_GPT_MODELS"></a-select>
    </div>
  </a-card>
  <a-card title="Tạo nhân vật" class="w-100 mt-4">
    <div class="col-12">
      <b>Chọn nhân vật</b>
      <p>
        <template v-for = "(model,modelKey) in botModels" :key="modelKey">
          <img :src="`/src/assets/uploads/${model}.png`" alt="" srcset="" width="100px" class="img-thumbnail m-2" @click="selectBotChatAvatar(model)" :class="{ 'border-avatar-selected' :  model == chatRoom.bot_avatar }">
        </template>
      </p>
    </div>
    <div class="col-3">
      <a-input v-model:value = "chatRoom.bot_name" placeholder ="Nhập tên nhân vật ..."></a-input>
      <a-input v-model:value = "chatRoom.bot_description" placeholder ="Nhập yêu cầu ..." class="mt-2"></a-input>
    </div>
  </a-card>
  <div class="text-center mt-2">
   <a-button type="primary" @click = "createChatRoom">Tạo phòng chat</a-button>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { LANGUAGES, VOICES, TEXT_TO_SPEECH_MODELS, SPEECH_TO_TEXT_MODELS, CHAT_GPT_MODELS } from "../../../constants/common"
import { chatRoomStore } from "../../../store";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const chatRoom = reactive({
  name:null,
  text_to_speech_model:'tts-1',
  voice_model:'nova',
  speech_to_text_model:'whisper-1',
  chat_gpt_model:'gpt-3.5-turbo-0125',
  language:'en',
  bot_name:null,
  bot_avatar:null,
  bot_description:null,
});

const botModels = ['model_1', 'model_2', 'model_3']

const selectBotChatAvatar = (model) => {
  chatRoom.bot_avatar = model
}

const createChatRoom = async () => {
  await chatRoomStore().storeChatRoom(chatRoom).then((response) => {
    let chatRoomId = response.data.id;
    router.push({
      name:'ChatRoom',
      params: { id: chatRoomId },
    }) 

    message.success('Tạo phòng chat thành công');

  }).catch((error) => {
    console.log(error);
  })
}


</script>

<style scoped>
.border-avatar-selected {
  border: 2px solid #007bff;
}

img{
  cursor: pointer;
}
</style>