<template>
    <a-modal :open = "isOpen" title = "Tạo mới bài tập" @cancel = "emits('closeModal')" class="custom-modal" @ok = "saveQuestion" :ok-text="'Lưu bài tập'">
        <div class="pronunciation-form">
            <a-input v-model:value="pronunciation.topic_name" placeholder = "Nhập chủ đề ..."></a-input>
            <a-button class="mt-2" type = "primary" @click="addQuestion">Thêm câu hỏi</a-button>
            
            <table class="table table-bordered mt-2">
                <thead>
                    <tr>
                        <th>Nhập câu hỏi</th>
                        <th>IPA</th>
                        <!-- <th>Link audio</th> -->
                        <th>Tải audio</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(question, questionKey) in pronunciation.pronunciation_details" :key="questionKey">
                        <tr>
                            <td><a-input v-model:value="pronunciation.pronunciation_details[questionKey].content" placeholder = "Nhập câu hỏi"></a-input></td>
                            <td><a-input v-model:value="pronunciation.pronunciation_details[questionKey].ipa" placeholder = "Nhập IPA"></a-input></td>
                            <!-- <td><a-input v-model:value="pronunciation.pronunciation_details[questionKey].audio_link" placeholder = "Nhập đường dẫn audio"></a-input></td> -->
                            <td>
                                <label :for="`uploadAudio${questionKey}`" class="btn btn-sm btn-primary"><i class="fa-solid fa-cloud-arrow-up"></i></label>
                                <input type="file" class="form-control" :id="`uploadAudio${questionKey}`" hidden @change="audioUpload($event, questionKey)">
                            </td>
                            <td><button class="btn btn-sm btn-danger"  @click="deleteQuestion(questionKey)"><i class="fa-solid fa-trash-can"></i></button></td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </a-modal>
</template>

<script setup>
import { reactive, toRefs } from 'vue';
import { pronunciationStore } from '../../../store';
import { message } from 'ant-design-vue';

const props = defineProps(["isOpen"])
const emits = defineEmits(["closeModal", "handleOk"])
const isOpen = toRefs(props);
const pronunciation = reactive({
    topic_name : null,
    pronunciation_details : [],
})

const addQuestion = () => {
    pronunciation.pronunciation_details.push({
        content: null,
        ipa:null,
        audio: null,
    })
}

const audioUpload = (e, questionKey) => {
    pronunciation.pronunciation_details[questionKey].audio = e.target.files[0]
}

const saveQuestion = async() => {
    const formData = new FormData();
    formData.append('topic_name', pronunciation.topic_name || '');
    pronunciation.pronunciation_details.forEach((detail, index) => {
        formData.append(`pronunciation_details[${index}][content]`, detail.content || '');
        formData.append(`pronunciation_details[${index}][ipa]`, detail.ipa || '');
        if (detail.audio) {
            formData.append(`pronunciation_details[${index}][audio]`, detail.audio);
        }
    });

    await pronunciationStore().storeExam(formData).then((response) => {
        if(response.status)
        {
            message.success('Thêm mới bản ghi thành công');
            emits('handleOk');   
        }
    }).catch((error) => {
        console.log(error);
    })
    console.log(formData);   
}

const deleteQuestion = (questionKey) => {
    console.log(questionKey);
    pronunciation.pronunciation_details.splice(questionKey, 1);
}
</script>

<style lang="scss" style>
.custom-modal{
    width: 70% !important;
}
</style>