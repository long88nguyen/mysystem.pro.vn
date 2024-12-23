<template>
    <div class="chat-room">
        <div class="chat-room-header">
            <div class="d-flex justify-content-between align-items-center">
                <div class="avatar">
                    <img src="../../../assets/uploads/model_1.png" alt="" width="50px" height="50px"
                        class="img-thumbnail" style="border-radius: 25px;">
                    <b class="ms-2">{{ dataMessages?.bot_name }}</b>
                </div>
                <h5>{{ dataMessages?.name }}</h5>
                <router-link :to="{ name: 'ListChatRoom' }"><a-button>Quay lại<i class="fa-solid fa-arrow-right ms-2"></i></a-button></router-link>
            </div>
        </div>
        <hr>
        <div class="chat-room-message">
            <Message :messages="dataMessages?.messages" :isResponseLoading="isResponseLoading" :isResponseUserLoading = "isResponseUserLoading"></Message>
        </div>
        <div class="chat-room-input mt-3">
            <form action="" @submit.prevent="sendMessage">
                <a-input placeholder="Nhập..." class="w-100" v-model:value="message"></a-input>
            </form>
            <div class="text-center mt-3">
                <button class="btn btn-sm btn-success" v-if="isRecording" @click="stopRecording">Dừng lại</button>
                <button class="btn btn-sm btn-primary" v-else @click="startRecording">Ghi âm</button>
            </div>
        </div>

        <div class="chat-room-footer">

        </div>
        <Loading2 v-if="isLoading2"></Loading2>
    </div>
</template>

<script setup>
import Message from './Message.vue';
import { chatRoomStore, chatMessageStore } from '../../../store';
import { nextTick, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Loading2 from "../../components/Loading2.vue"
import RecordRTC from "recordrtc";

const recorder = ref(null);
const audioURL = ref(null);
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const audioResultUrl = ref(null)

const isRecording = ref(false)
const isResponseLoading = ref(false)
const isResponseUserLoading = ref(false)
const message = ref(null)
const dataMessages = ref(null);
const route = useRoute();
const isLoading2 = ref(false);

const fetchData = async () => {
    isLoading2.value = true;
    await chatRoomStore().getChatRoomById(route.params.id).then((response) => {
        isLoading2.value = false;
        dataMessages.value = response.data
        nextTick(() => {
            scrollToBottom();
        });

    }).catch((error) => {
        console.log(error);
    });
}


onMounted(() => {
    fetchData();
})

const sendMessage = async () => {
    dataMessages.value.messages.push({
        role: "user",
        content: message.value
    })

    isResponseLoading.value = true;
    await chatMessageStore().storeMessageText({ chat_room_id: route.params.id, text: message.value }).then((response) => {
        dataMessages.value.messages.push(response.data)
        isResponseLoading.value = false;
        playAudio(response.data.audio);
        nextTick(() => {
            scrollToBottom();
        });
    }).catch((error) => {
        console.log(error);
    })
    
    message.value = null;
}

const scrollToBottom = () => {
    const chatContainer = dataMessages.value.messages;
    if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
};

const playAudio = (url) => {
    let audioPlay = new Audio(url);
    audioPlay.currentTime = 0;
    audioPlay.play();
}

const startRecording = () => {
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    isRecording.value = true;
    recorder.value = new RecordRTC(stream, { type: "audio", mimeType: isIOS ? "audio/m4a" : "audio/wav" });
    recorder.value.startRecording();
  });
};

const stopRecording = async () => {
    isResponseUserLoading.value = true;
    recorder.value.stopRecording(async () => {
    const blob = recorder.value.getBlob();
    const formData = new FormData();
    formData.append("audio", blob, "recorded_audio.wav");
    formData.append('chat_room_id', route.params.id)
    isRecording.value = false;
        
    await chatMessageStore().storeMessageSpeech(formData).then((response) => {
        dataMessages.value.messages.push(response.data)
        isResponseUserLoading.value = false;
        playAudio(response.data.audio);
    }).catch((error) => {
        console.log(error);
    })

    // let response = await axios.post(apiURL + 'convert-speech-to-text', formData);
    
    // if(response.status) 
    // {
    //   audioResultUrl.value = response.data.data.url;
    //   playAudio(audioResultUrl.value)
    // }
  });
};

</script>

<style></style>