<template>
     <div class="assistant-model text-center">
        <h6>{{ textResult }}</h6>
        <div>
          <Loading v-if="isLoading"></Loading>
        </div>
        <img src="../../../assets/uploads/ai_assistant2.gif" alt="" width="300px" v-if="audioPlaying">
        <img src="../../../assets/uploads/ai_assistant2-0000.jpg" alt="" width="300px" v-else>
    </div>
    <div class="col-3">
        <form action="" method="post" @submit.prevent="submitRequest()">
            <a-input placeholder = "Nhập ..." allowClear v-model:value = "form.text"></a-input>
            <a-select :options = "languages" class="mt-2 w-100" placeholder = "-- Chọn ngôn ngữ --" allowClear v-model:value = "form.language"></a-select>
            <a-select :options = "voices" class="mt-2 w-100" placeholder = "-- Chọn giọng đọc --" allowClear v-model:value = "form.voice"></a-select>
            <a-select :options = "TTSModels" class="mt-2 w-100" placeholder = "-- Chọn dịch vụ --" allowClear v-model:value = "form.model"></a-select>
            <button class="btn btn-sm btn-primary mt-2">Gửi</button>
        </form>
        
        <!-- <audio :src="audioURL" v-if = "audioURL" class="mt-3" controls></audio> -->
        <!-- <pre>{{ audioURL }}</pre> -->
    </div>
</template>

<script setup>
import axios from 'axios';
import { reactive, ref } from 'vue';
import Loading from '../../components/Loading.vue';
import { message } from 'ant-design-vue';

const audioURL = ref(null);
const textResult = ref(null);
const isLoading = ref(false);
const audioPlaying = ref(false)
const apiURL = import.meta.env.VITE_APP_API;
const form = reactive({
    text: '',
    language: null,
    voice: null,
    model: null
})
const languages = [
    {
        value: 'vi',
        label: 'Tiếng Việt'
    },
    {
        value: 'en',
        label: 'Tiếng Anh'
    }
];

const voices = [
    {
        value : 'alloy',
        label : 'Alloy'
    },

    {
        value : 'echo',
        label : 'Echo'
    },

    {
        value : 'fable',
        label : 'Fable'
    },

    {
        value : 'onyx',
        label : 'Onyx'
    },

    {
        value : 'nova',
        label : 'Nova'
    },

    {
        value : 'shimmer',
        label : 'Shimmer'
    },
];


const TTSModels = [
    {
        value: 'tts-1',
        label: 'Text to speech (15$/1M characters)'
    },

    {
        value: 'tts-1-hd',
        label: 'Text to speech HD (30$/1M characters)'
    }
];

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