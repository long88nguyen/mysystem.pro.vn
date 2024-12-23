<template>
  <h5>Làm bài tập</h5>
  <h5 >Chủ đề: <span class="text-primary"> {{ pronunciationData?.topic_name }}</span></h5>
  <div class="pronunciation-exam mt-3 p-4" v-if = "pronunciationData?.pronunciation_details[currentSection]">
    <div class="pronunciation-exam-result text-center">
      <p>
        <span class="pronunciation-exam-result-text">Can you see the sea?</span>
      </p>
      <p>
        <a-progress type="circle" :percent="75" :size="80" />
      </p>
      <p>
        <span class="pronunciation-exam-result-reaction text-success"
          >Great job!
          <i class="fa-solid fa-face-grin-hearts text-warning ms-2"></i
        ></span>
      </p>
    </div>

    <div class="pronunciation-exam-question mt-4 p-3">
      <div class="pronunciation-exam-question-volumn text-start">
        <i class="fa-solid fa-backward-fast icon-circle text-primary" @click="playAudio(0.5)"></i>
        <i class="fa-solid fa-volume-low icon-circle ms-2 text-primary" @click="playAudio()" disabled></i>
      </div>
      <div class="mt-3 text-center">
        <h4>{{ pronunciationData?.pronunciation_details[currentSection]?.content }}</h4>
        <h5><i>{{ pronunciationData?.pronunciation_details[currentSection]?.ipa }}</i></h5>
      </div>
      <div class="text-end">
        <span>{{ currentSection+1 }} of {{ pronunciationData?.pronunciation_details?.length }}</span>
      </div>
    </div>
    <div class="pronunciation-exam-action text-end mt-2">
      <i class="fa-solid fa-arrow-left icon-circle text-primary" @click = "currentSection--" v-if="currentSection > 0"></i>
      <i class="fa-solid fa-arrow-right icon-circle ms-2 text-primary" @click = "currentSection++" v-if="currentSection + 1 < pronunciationData?.pronunciation_details?.length"></i>
    </div>

    <div class="pronunciation-exam-input text-center mt-2">
       
      <i class="fa-solid fa-volume-low icon-circle-2 text-primary"></i>
      <i class="fa-regular fa-circle-stop icon-circle-2 text-danger mx-3"  @click="stopRecord" v-if = "pronunciationData?.pronunciation_details[currentSection]?.isRecording"></i>
      <i class="fa-solid fa-microphone-lines icon-circle-2 text-primary mx-3" v-else @click="startRecord"></i>
      <i class="fa-regular fa-flag icon-circle-2 text-primary"></i>
      <div>
        <TimerDisplay v-if="pronunciationData?.pronunciation_details[currentSection]?.isRecording"></TimerDisplay>
       </div> 
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { pronunciationStore } from '../../../store';
import { onMounted, ref } from 'vue';
import TimerDisplay from './TimerDisplay.vue';

const route = useRoute();
const currentSection = ref(0);
const pronunciationData = ref(null);
const fetchData = async () => {
    await pronunciationStore().getByIdExam(route.params.id).then((response) => {
        pronunciationData.value =  response.data
    }).catch((error) => {
        console.log(error);
        
    })
}

const playAudio = (speed = 1) => {
    let audioPlay = new Audio(pronunciationData?.value?.pronunciation_details[currentSection.value]?.audio);
    audioPlay.playbackRate = speed
    audioPlay.currentTime = 0;
    audioPlay.play();
    audioPlay.addEventListener('ended', () => {
    });
}

const startRecord = () => {
    pronunciationData.value.pronunciation_details[currentSection.value].isRecording = true;
}

const stopRecord = () => {
    pronunciationData.value.pronunciation_details[currentSection.value].isRecording = false;
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
