<template>
  <h5>Làm bài tập</h5>
  <h5>Chủ đề: <span class="text-primary"> {{ pronunciationData?.topic_name }}</span></h5>
  {{ logBob?.size }},
  {{ logBob?.type }}
  <div class="pronunciation-exam mt-3 p-4" v-if="currentSectionQuestion">
    <div class="pronunciation-exam-result text-center" v-if="currentSectionQuestion?.pronunciation_result">
      <p>
        <a-progress type="circle" :percent="currentSectionQuestion?.pronunciation_result.point" :size="80" />
      </p>
      <p>
        <span class="pronunciation-exam-result-reaction" :class="reactionResult(currentSectionQuestion?.pronunciation_result?.point)?.className">
          {{ reactionResult(currentSectionQuestion?.pronunciation_result?.point)?.text }}
          <i class="text-primary ms-2" :class="reactionResult(currentSectionQuestion?.pronunciation_result?.point)?.icon"></i>
        </span>
      </p>
    </div>

    <div class="pronunciation-exam-question mt-4 p-3">
      <div class="pronunciation-exam-question-volumn text-start">
        <i class="fa-solid fa-backward-fast icon-circle text-primary"
          @click="playAudioQuestion(0.5, currentSectionQuestion?.audio)"></i>
        <i class="fa-solid fa-volume-low icon-circle ms-2 text-primary"
          @click="playAudioQuestion(1, currentSectionQuestion?.audio)" disabled></i>
      </div>
      <div class="mt-3 text-center">
        <h4 v-if="currentSectionQuestion?.pronunciation_result?.result">
          <template v-for="(item,key) in JSON.parse(currentSectionQuestion?.pronunciation_result?.result)" :key="key">
            <span class="pronunciation-exam-result-text" :class="item.isCorrect ? 'text-success' : 'text-danger'">{{ item.text }}{{ item?.text?.split('')?.length > 1 ? '&nbsp;' : null }}</span>
          </template>
        </h4>
        
        <h4 v-else>
          {{ currentSectionQuestion?.content }}
        </h4>
        <h5><i>{{ currentSectionQuestion?.ipa }}</i></h5>
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
      <i class="fa-solid fa-volume-high icon-circle-2 text-primary"
      v-if = "currentSectionQuestion?.pronunciation_result?.audio && currentSectionQuestion?.pronunciation_result?.audioPlaying"
      ></i>
      <i class="fa-solid fa-volume-low icon-circle-2 text-primary" 
      v-if="currentSectionQuestion?.pronunciation_result?.audio
      && !currentSectionQuestion?.pronunciation_result?.audioPlaying
      " 
      @click="playAudio(1, currentSectionQuestion?.pronunciation_result?.audio)">
     </i>

      <i class="fa-regular fa-circle-stop icon-circle-2 text-danger mx-3" @click="stopRecord"
        v-if="currentSectionQuestion?.isRecording"></i>

      <i class="fa-solid fa-microphone-lines icon-circle-2 text-primary mx-3" v-else @click="startRecord"></i>

      <i class="fa-regular fa-flag icon-circle-2 text-primary"></i>

      <div>
        <TimerDisplay v-if="currentSectionQuestion?.isRecording"></TimerDisplay>
      </div>

      <input type="file" class="mt-3 form-control" @change="uploadAudio($event)">
    
      <pre>{{ audioURLNew }}</pre>
      <!-- <pre>{{ examResult?.text }}</pre> -->
    
      <audio :src="audioURLNew" controls></audio>
    </div>
  </div>
  <Loading2 v-if="isLoading"></Loading2>
</template>

<script setup>
import Loading2 from '../../components/Loading2.vue';
import { useRoute } from 'vue-router';
import { pronunciationStore, pronunciationResultStore } from '../../../store';
import { onMounted, ref, watch } from 'vue';
import TimerDisplay from './TimerDisplay.vue';
import RecordRTC from "recordrtc";
import { message } from 'ant-design-vue';

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isLoading = ref(false)
const route = useRoute();
const recorder = ref(null)
const currentSection = ref(0);
const currentSectionQuestion = ref(null)
const pronunciationData = ref(null);
const examResult = ref(null);
const audioURLNew = ref(null);
const logBob = ref(null)

const fetchData = async () => {
  isLoading.value = true;
  await pronunciationStore().getByIdExam(route.params.id).then((response) => {
    pronunciationData.value = response.data
    pronunciationData.value.pronunciation_details?.forEach((value) => {
      if(!value.pronunciation_result)
      {
        value.pronunciation_result = {}
      }
      value.pronunciation_result.audioPlaying = false
    })
    
    currentSectionQuestion.value = pronunciationData.value.pronunciation_details[currentSection.value];
    isLoading.value = false;
  }).catch((error) => {
    console.log(error);
    isLoading.value = false;
  })
}

const playAudio = (speed = 1, audioUrl = null) => {
  currentSectionQuestion.value.pronunciation_result.audioPlaying = true;
  let audioPlay = new Audio(audioUrl);
  audioPlay.playbackRate = speed
  audioPlay.currentTime = 0;
  audioPlay.play();
  audioPlay.addEventListener('ended', () => {
    currentSectionQuestion.value.pronunciation_result.audioPlaying = false;
  });
}

const playAudioQuestion = (speed = 1, audioUrl = null) => {
  let audioPlay = new Audio(audioUrl);
  audioPlay.playbackRate = speed
  audioPlay.currentTime = 0;
  audioPlay.play();
  audioPlay.addEventListener('ended', () => {
  });
}

const startRecord = () => {
  navigator.mediaDevices.getUserMedia({ audio: {
        // sampleRate: 16000, // Chuẩn âm thanh chất lượng cao (44.1kHz)
        channelCount: 1, // Ghi âm mono
        echoCancellation: true, // Loại bỏ tiếng vang
        noiseSuppression: true, // Giảm nhiễu
        autoGainControl: true // Tự động điều chỉnh âm lượng
      }  
    }).then((stream) => {
      currentSectionQuestion.value.isRecording = true;
    recorder.value = new RecordRTC(stream, { 
      type: "audio", 
      mimeType: "audio/wav", // tương thích Safari
      desiredSampRate: 16000,
      recorderType: RecordRTC.StereoAudioRecorder, // đảm bảo định dạng đúng
      numberOfAudioChannels: 1,
  });
    recorder.value.startRecording();
  }).catch((err) => {
      if(err == 'NotFoundError: Requested device not found')
      {
        message.error('Không tìm thấy thiết bị ghi âm trên máy của bạn')
      }
      
      else if(err == 'NotAllowedError: Permission denied')
      {
        message.error('Bạn đã từ chối quyền truy cập micro. Hãy cấp quyền và thử lại.')
      }

      else{
        message.error('Đã có lỗi xảy ra. Vui lòng thử lại sau.')
      }
  });
}

const stopRecord = () => {
  isLoading.value = true;
  recorder.value.stopRecording(async () => {
    try {
      setTimeout(async() => {
        const blob = recorder.value.getBlob();
        logBob.value = blob;
        if (!blob || blob.size === 0) {
          message.error("Không có dữ liệu ghi âm. Vui lòng thử lại.");
          isLoading.value = false;
          return;
        }
        const formData = new FormData();
        pronunciationData.value.pronunciation_details[currentSection.value].isRecording = false;
        formData.append("audio", blob, "recorded_audio.wav");
        formData.append("pronunciation_detail_id", pronunciationData.value.pronunciation_details[currentSection.value].id);
        await pronunciationResultStore().storePronoun(formData).then((response) => {
          if (response.status) {
            isLoading.value = false;
            examResult.value = response.data;
            examResult.value.url = response.data?.url ? `${response.data?.url}?t=${Date.now()}` : null;
            playAudio(1, examResult.value.url)
            audioURLNew.value = examResult.value.url;
            // fetchData();
          }
        }).catch((error) => {
          console.log(error);
          isLoading.value = false;
        });
      }, 500)
    }
    catch(error) {
      console.error('Lỗi khi lấy blob:', error);
    }
    
  });
}

const uploadAudio = async(e) => {
  isLoading.value = true;
  let formData = new FormData();
  formData.append("audio", e.target.files[0], "uploaded_audio.wav");
  formData.append("pronunciation_detail_id", pronunciationData.value.pronunciation_details[currentSection.value].id);
  await pronunciationResultStore().storePronoun(formData).then((response) => {
      if (response.status) {
        isLoading.value = false;
        examResult.value = response.data;
        examResult.value.url = response.data?.url ? `${response.data?.url}?t=${Date.now()}` : null;
        playAudio(1, examResult.value.url)
        audioURLNew.value = examResult.value.url;
        fetchData();
      }
    }).catch((error) => {
      console.log(error);
      isLoading.value = false;
  });
}
onMounted(() => {
  fetchData()
})

const reactionResult = (score) => {
  let className = '';
  let text = '';
  let icon = '';
  
    if(score < 70)
    {
      className = 'text-danger';
      text = 'Try again';
      icon = 'fa-solid fa-face-sad-cry'
    }

    if(score >= 70 && score <= 89)
    {
      className = 'text-warning';
      text = 'Almost correct';
      icon = 'fa-solid fa-face-laugh'
    }

    if(score >= 90)
    {
      className = 'text-success';
      text = 'Great job';
      icon = 'fa-solid fa-face-grin-hearts'
    }
    return {
      className,
      text,
      icon
    }
}

watch(currentSection, (newValue, oldValue) => {
  currentSectionQuestion.value = pronunciationData.value.pronunciation_details[newValue];
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

























