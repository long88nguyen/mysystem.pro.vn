<template>
<div class="message-system text-start" v-if = "message.role == 'assistant'">
    <div class="message-content mt-1 d-flex">
        <img src="../../../assets/uploads/model_1.png" alt="" class="img-thumbnail avatar-circle">
        <div class="ms-2 message-text message-text-system">
            {{ message.content }}
            <div class="text-end mt-2">
            <!-- <span v-if="message?.audio">
                <i class="fa-solid fa-gauge text-gray" @click="playAudio(0.5)" v-if="!message?.isAudioPlaying"></i>
            </span> -->

            <span class="ms-2" v-if="message?.audio">
                <i class="fa-solid fa-volume-high" v-if="message?.isAudioPlaying"></i>
                <i class="fa-solid fa-volume-low text-gray" v-else @click="playAudioMessage"></i>
            </span> 
            <span>
                
            </span>
            <span class="ms-2" v-if="message?.translation">
                <i class="fa-solid fa-language text-gray" 
                    data-bs-toggle="collapse" 
                    :href="`#collapseExample${messageKey}`" 
                    role="button" aria-expanded="false" 
                    :aria-controls="`collapseExample${messageKey}`">
                </i>
            </span>

            <div class="collapse" :id="`collapseExample${messageKey}`" style="font-size: 12px;">
                <i>{{ message.translation }}</i>
            </div>
            </div>
        </div>
    </div>
  </div>
  <div class="message-user" v-if = "message.role == 'user'">
    <div class="message-content mt-1 d-flex justify-content-end">
        <div class="message-text message-text-user me-2">
            {{ message.content }}
            <div class="text-start">
                <span class="ms-2" v-if="message?.audio">
                    <i class="fa-solid fa-volume-high" v-if="message?.isAudioPlaying"></i>
                    <i class="fa-solid fa-volume-low text-gray" v-else @click="playAudioMessage"></i>
                </span>
            </div>
        </div>
        <img src="../../../assets/uploads/model_3.png" alt="" class="img-thumbnail avatar-circle">
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, ref, toRefs } from 'vue';

const props = defineProps(["message" , "messageKey"])
const emits = defineEmits(["playAudioMessage"])
const { message, messageKey } = toRefs(props)
const audioPlay = ref(null)

onUnmounted(() => {
    if (audioPlay.value) {
        audioPlay.value.pause();
        audioPlay.value = null; // Giải phóng tài nguyên
    }
})

const playAudioMessage = () => {
    emits("playAudioMessage", message.value);
}
</script>

<style lang="scss" scoped>

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

@media (max-width: 768px)
{
    .message-text{
    max-width: 100%;
    font-size: 13px;
    }
    .avatar-circle{
    width: 30px;
    height: 30px;
    border-radius: 15px;
    }
    .message-user, .message-system{
        margin-top: 10px;
    }
}
</style>