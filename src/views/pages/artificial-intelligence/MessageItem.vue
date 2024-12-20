<template>
  <div class="message-system text-start" v-if = "message.role == 'system'">
    <div class="message-content mt-1 d-flex">
        <img src="../../../assets/uploads/model_1.png" alt="" class="img-thumbnail avatar-circle">
        <div class="ms-2 message-text message-text-system">
            {{ message.content }}
            <div class="text-end mt-2">
               <span>
                <i class="fa-solid fa-volume-high" v-if="message?.isAudioPlaying"></i>
                <i class="fa-solid fa-volume-low text-gray" v-else @click="playAudio"></i>
            </span> <span class="ms-2"><i class="fa-solid fa-language text-gray"></i></span> 
            </div>
        </div>
    </div>
  </div>
  <div class="message-user" v-if = "message.role == 'user'">
    <div class="message-content mt-1 d-flex justify-content-end">
        <div class="message-text message-text-user me-2">
            {{ message.content }}
        </div>
        <img src="../../../assets/uploads/model_3.png" alt="" class="img-thumbnail avatar-circle">
    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps(["message" , "messageKey"])
const { message, messageKey } = toRefs(props)
const playAudio = () => {
    
    let audioPlay = new Audio(message.value.audio);
    message.value.isAudioPlaying = true;
    audioPlay.currentTime = 0;
    audioPlay.play();
    audioPlay.addEventListener('ended', () => {
        message.value.isAudioPlaying = false;
    });
}
</script>

<style lang="scss" scoped>
.message-system,.message-user{
    
}

.avatar-circle{
    width: 40px;
    height: 40px;
    border-radius: 20px;
}

.message-text{
    max-width: 50%;
    min-width: 80px;
    height: auto;
    padding: 10px;
    border-radius: 10px;
    font-size: 15px;
}

.message-text-system{
    background: #F0F0F0;

}

.message-text-user{
    background: #009990;
    color: white;

}
</style>