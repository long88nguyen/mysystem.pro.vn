<template>
     <div class="assistant-model text-center">
        <h6>{{ textResult }}</h6>
        <div>
          <Loading v-if="isLoading"></Loading>
        </div>
        <img src="../../../assets/uploads/ai_assistant2.gif" alt="" width="300px" v-if="audioPlaying">
        <img src="../../../assets/uploads/ai_assistant2-0000.jpg" alt="" width="300px" v-else>
    </div>
    <!-- <div class="col-3">
        <form action="" method="post" @submit.prevent="submitRequest()">
            <a-input placeholder = "Nhập ..." allowClear v-model:value = "form.text"></a-input>
            <a-select :options = "languages" class="mt-2 w-100" placeholder = "-- Chọn ngôn ngữ --" allowClear v-model:value = "form.language"></a-select>
            <a-select :options = "voices" class="mt-2 w-100" placeholder = "-- Chọn giọng đọc --" allowClear v-model:value = "form.voice"></a-select>
            <a-select :options = "TTSModels" class="mt-2 w-100" placeholder = "-- Chọn dịch vụ --" allowClear v-model:value = "form.model"></a-select>
            <button class="btn btn-sm btn-primary mt-2">Gửi</button>
        </form>
        
        
    </div> -->
    {{ audioResultUrl }}
    <div class="mt-3 text-center">
        <h5>Ghi âm</h5>
        <button class="btn btn-success btn-sm" v-if="isRecording" @click="stopRecording">Dừng lại</button>
        <button class="btn btn-primary btn-sm" v-else @click="startRecording">Ghi âm</button>
    </div>
</template>

<script setup>
import axios from 'axios';
import { reactive, ref } from 'vue';
import Loading from '../../components/Loading.vue';
import { message } from 'ant-design-vue';
import RecordRTC from "recordrtc";

const isRecording = ref(false)
const recorder = ref(null);
const audioURL = ref(null);
const textResult = ref(null);
const isLoading = ref(false);
const audioPlaying = ref(false)
const apiURL = import.meta.env.VITE_APP_API;
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const audioResultUrl = ref(null)
const form = reactive({
    text: '',
    language: null,
    voice: null,
    model: null
})


const startRecording = () => {
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    isRecording.value = true;
    recorder.value = new RecordRTC(stream, { type: "audio", mimeType: isIOS ? "audio/m4a" : "audio/wav" });
    recorder.value.startRecording();
  });
};

const stopRecording = () => {
    isRecording.value = false;
    isLoading.value = true;
    recorder.value.stopRecording(async () => {

    const blob = recorder.value.getBlob();
    const formData = new FormData();

    formData.append("audio", blob, "recorded_audio.wav");
    let response = await axios.post(apiURL + 'convert-speech-to-text', formData);
    
    console.log(response);
    
    if(response.status) 
    {
      isLoading.value = false;
      audioResultUrl.value = response.data.data.url;
      playAudio(audioResultUrl.value)
    }
  });
};


const submitRequest = async() => {
    isLoading.value = true;
    await axios.post(apiURL + 'convert-text-to-speech', form).then((response) => {
        audioURL.value = response.data.data.url
        textResult.value = response.data.data.text;
        playAudio(audioURL.value)
        isLoading.value = false;
        form.text = null;
    }).catch((error) => {
        isLoading.value = false;
        message.error(error.response?.data?.message);
    });
}

const playAudio = (url) => {
  let audioPlay = new Audio(url);
  audioPlaying.value = true;
  audioPlay.currentTime = 0;
  audioPlay.play();
  audioPlay.addEventListener('ended', () => {
    audioPlaying.value = false;
  });
}
</script>

<style>

</style>