<template>
  <h5>Làm bài tập</h5>
  <h5>Chủ đề: <span class="text-primary"> {{ pronunciationData?.topic_name }}</span></h5>
  <div class="pronunciation-exam mt-3 p-4" v-if="pronunciationData?.pronunciation_details[currentSection]">
    <div class="pronunciation-exam-result text-center" v-if="examResult?.answer">
      <p>
        <span class="pronunciation-exam-result-text">{{ examResult?.answer }}</span>
      </p>
      <p>
        <a-progress type="circle" :percent="75" :size="80" />
      </p>
      <p>
        <span class="pronunciation-exam-result-reaction text-success">Great job!
          <i class="fa-solid fa-face-grin-hearts text-warning ms-2"></i></span>
      </p>
    </div>

    <div class="pronunciation-exam-question mt-4 p-3">
      <div class="pronunciation-exam-question-volumn text-start">
        <i class="fa-solid fa-backward-fast icon-circle text-primary"
          @click="playAudio(0.5, pronunciationData?.pronunciation_details[currentSection]?.audio)"></i>
        <i class="fa-solid fa-volume-low icon-circle ms-2 text-primary"
          @click="playAudio(1, pronunciationData?.pronunciation_details[currentSection]?.audio)" disabled></i>
      </div>
      <div class="mt-3 text-center">
        <h4>{{ pronunciationData?.pronunciation_details[currentSection]?.content }}</h4>
        <h5><i>{{ pronunciationData?.pronunciation_details[currentSection]?.ipa }}</i></h5>
      </div>
      <div class="text-end">
        <span>{{ currentSection + 1 }} of {{ pronunciationData?.pronunciation_details?.length }}</span>
      </div>
    </div>
    <div class="pronunciation-exam-action text-end mt-2">
      <i class="fa-solid fa-arrow-left icon-circle text-primary" @click="currentSection--"
        v-if="currentSection > 0"></i>
      <i class="fa-solid fa-arrow-right icon-circle ms-2 text-primary" @click="currentSection++"
        v-if="currentSection + 1 < pronunciationData?.pronunciation_details?.length"></i>
    </div>

    <div class="pronunciation-exam-input text-center mt-2">

      <i class="fa-solid fa-volume-low icon-circle-2 text-primary" v-if=" examResult?.url" @click="playAudio(1, examResult.url)"></i>
      <i class="fa-regular fa-circle-stop icon-circle-2 text-danger mx-3" @click="stopRecord"
        v-if="pronunciationData?.pronunciation_details[currentSection]?.isRecording"></i>
      <i class="fa-solid fa-microphone-lines icon-circle-2 text-primary mx-3" v-else @click="startRecord"></i>
      <i class="fa-regular fa-flag icon-circle-2 text-primary"></i>
      <div>
        <TimerDisplay v-if="pronunciationData?.pronunciation_details[currentSection]?.isRecording"></TimerDisplay>
      </div>
    </div>
  </div>
  <Loading2 v-if="isLoading"></Loading2>
</template>

<script setup>
import Loading2 from '../../components/Loading2.vue';
import { useRoute } from 'vue-router';
import { pronunciationStore, pronunciationResultStore } from '../../../store';
import { onMounted, ref } from 'vue';
import TimerDisplay from './TimerDisplay.vue';
import RecordRTC from "recordrtc";
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isLoading = ref(false)
const route = useRoute();
const recorder = ref(null)
const currentSection = ref(0);
const pronunciationData = ref(null);
const examResult = ref(null)
const fetchData = async () => {
  await pronunciationStore().getByIdExam(route.params.id).then((response) => {
    pronunciationData.value = response.data
  }).catch((error) => {
    console.log(error);

  })
}

const playAudio = (speed = 1, audioUrl = null) => {

  let audioPlay = new Audio(audioUrl);
  audioPlay.playbackRate = speed
  audioPlay.currentTime = 0;
  audioPlay.play();
  audioPlay.addEventListener('ended', () => {
  });
}

const startRecord = () => {
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    pronunciationData.value.pronunciation_details[currentSection.value].isRecording = true;
    recorder.value = new RecordRTC(stream, { type: "audio", mimeType: isIOS ? "audio/m4a" : "audio/wav" });
    recorder.value.startRecording();
  });
}

const stopRecord = () => {
  isLoading.value = true;
  recorder.value.stopRecording(async () => {

    const blob = recorder.value.getBlob();
    const formData = new FormData();
    pronunciationData.value.pronunciation_details[currentSection.value].isRecording = false;
    formData.append("audio", blob, "recorded_audio.wav");
    formData.append("pronunciation_detail_id", pronunciationData.value.pronunciation_details[currentSection.value].id);
    await pronunciationResultStore().storePronoun(formData).then((response) => {
      if (response.status) {
        isLoading.value = false;
        examResult.value = response.data;
        playAudio(1, examResult.value.url)
      }
    }).catch((error) => {
      console.log(error);
      isLoading.value = false;
    });
  });
}


onMounted(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
.pronunciation-exam-result-text {
  font-size: 25px;
  font-weight: 500;
}

.pronunciation-exam-result-reaction {
  font-size: 20px;
  font-weight: 500;
}

.pronunciation-exam-question {
  border: 1px solid #f5f5f5;
  width: 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;
}

.icon-circle {
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  cursor: pointer;
}

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
