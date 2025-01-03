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
            <Message :messages="dataMessages?.messages" 
            :isResponseLoading="isResponseLoading" 
            :isResponseUserLoading = "isResponseUserLoading"
            ref="chatMessagesRef" 
            >
                <div class="text-end" v-if = "dataMessages?.messages?.length == 0">
                    <a-button type = "primary" @click="startConversation"> Bắt đầu </a-button>
                </div>
            </Message>
        </div>
        <div class="chat-room-input mt-3" v-show="!isResponseLoading && dataMessages?.messages?.length">
            <form action="" @submit.prevent="sendMessage">
                <a-input placeholder="Nhập..." class="w-100" v-model:value="message"></a-input>
            </form>
            
            <div class="pronunciation-exam-input text-center mt-3">
                <i class="fa-regular fa-circle-stop icon-circle-2 text-danger mx-3" @click="stopRecording" v-if="isRecording"></i>
                <i class="fa-solid fa-microphone-lines icon-circle-2 text-primary mx-3" @click="startRecording" v-else></i>
             <div>
            <TimerDisplay class="mt-2" v-if="isRecording"></TimerDisplay>
      </div>

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
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Loading2 from "../../components/Loading2.vue"
import RecordRTC from "recordrtc";
import TimerDisplay from './TimerDisplay.vue';

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
const chatMessagesRef = ref(null);
const audioUser = ref(null)

const fetchData = async () => {
    isLoading2.value = true;
    await chatRoomStore().getChatRoomById(route.params.id).then((response) => {
        isLoading2.value = false;
        dataMessages.value = response.data
        nextTick(() => {
            setTimeout(() => {
                chatMessagesRef.value.scrollToBottom();
            }, 0);
        });

    }).catch((error) => {
        console.log(error);
    });
}


onMounted(async() => {
    fetchData();
})

const sendMessage = async () => {
    dataMessages.value.messages.push({
        role: "user",
        content: message.value,
        audio: audioUser.value
    })

    setTimeout(() => {
        chatMessagesRef.value.scrollToBottom();
    }, 0);
    isResponseLoading.value = true;
    await chatMessageStore().storeMessageText({ chat_room_id: route.params.id, text: message.value, audio: audioUser.value }).then((response) => {
        dataMessages.value.messages.push(response.data)
        isResponseLoading.value = false;
        playAudio(response.data.audio);
        nextTick(() => {
            setTimeout(() => {
                chatMessagesRef.value.scrollToBottom();
            }, 0);
        });
    }).catch((error) => {
        console.log(error);
    })

    
    message.value = null;

}

const startConversation = () => {
    message.value = "Bắt đầu";
    sendMessage();
}

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
    nextTick(() => {
        setTimeout(() => {
            chatMessagesRef.value.scrollToBottom();
        }, 0);
    });
    isResponseUserLoading.value = true;
    recorder.value.stopRecording(async () => {
    const blob = recorder.value.getBlob();
    const formData = new FormData();
    formData.append("audio", blob, "recorded_audio.wav");
    formData.append('chat_room_id', route.params.id)
    isRecording.value = false;
        
    await chatMessageStore().storeMessageSpeech(formData).then((response) => {
        isResponseUserLoading.value = false;
        playAudio(response.data.audio);
        message.value = response.data.content
        audioUser.value = response.data.audio
        sendMessage()
        
    }).catch((error) => {
        console.log(error);
    })
  });
};

onUnmounted(() => {
    dataMessages.value.messages.forEach((message) => {
        console.log(message?.isAudioPlaying);
        
        if(message?.isAudioPlaying)
        {   
            message.isAudioPlaying = false;
        }
    })
})
</script>

<style lang="scss" scoped>
.icon-circle-2 {
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border-radius: 30px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  cursor: pointer;
  font-size: 20px;
}
</style>