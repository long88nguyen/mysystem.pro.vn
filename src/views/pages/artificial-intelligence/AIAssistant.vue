<template>
  <div class="assistant">

    <pre>{{ audioPlaying }}</pre>
    <h5 class="text-center">{{ dataSTT?.text }}</h5>

    <div class="assistant-model text-center">
        <div>
          <Loading v-if="isLoading"></Loading>
        </div>
        <img src="../../../assets/uploads/ai_assistant2.gif" alt="" width="300px" v-if="audioPlaying">
        <img src="../../../assets/uploads/ai_assistant2-0000.jpg" alt="" width="300px" v-else>
    </div>

    <!-- <div class="assistant-action mt-2 text-center">
        <button class="btn btn-success btn-sm" v-if="isModelAction" @click = "isModelAction = false">Dừng lại</button>
        <button class="btn btn-primary btn-sm" v-else @click = "isModelAction = true">Giao tiếp</button>
    </div> -->

    <div class="text-center mt-3">
      <label role="button" for="uploadAudio" class="btn btn-sm border"><i class="fa-solid fa-cloud-arrow-up text-primary me-2"></i> Upload file</label>
      <input type="file" class="form-control mt-2" id="uploadAudio" hidden @change="uploadAudio($event)">
    </div>

  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import Loading from "../../components/Loading.vue"
const audioFile = ref(null)
const apiURL = import.meta.env.VITE_APP_API
const laravelURL = import.meta.env.VITE_APP_LARAVEL_URL
const dataSTT = ref(null)
const audioPlaying = ref(false);
const isLoading = ref(false);

const uploadAudio = async(event) => {
  isLoading.value = true;
  audioFile.value = event.target.files[0];
  let formData = new FormData()
  formData.append('audio', audioFile.value)
  let response = await axios.post(apiURL + 'convert-speech-to-text', formData);
  if(response.status)
  {
    isLoading.value = false;
    dataSTT.value = response.data.data
    playAudio(`${laravelURL + dataSTT.value?.url}`)
  }
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