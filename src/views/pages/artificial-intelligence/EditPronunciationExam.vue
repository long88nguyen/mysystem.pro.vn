<template>
  <a-modal :open = "isOpen" @cancel = "emits('handleCancel')" title="Cập nhật bài tập" style="width: 70%;" @ok = "updateExam" :ok-text = "'Cập nhật'">
    <div v-if="pronunciation">
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
                                <!-- <label :for="`uploadAudio${questionKey}`" class="btn btn-sm btn-primary"><i class="fa-solid fa-cloud-arrow-up"></i></label> -->
                                <input type="file" class="form-control" :id="`uploadAudio${questionKey}`"  @change="audioUpload($event, questionKey)">
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
import { onMounted, ref, toRefs } from 'vue';
import { pronunciationStore } from '../../../store';
const props = defineProps(['isOpen', 'examId'])
const { isOpen, examId } = toRefs(props)
const emits = defineEmits(['handleCancel', 'handleOk'])
const pronunciation = ref(null);

const fetchData = async () => {
  await pronunciationStore().getByIdExam(examId.value).then((response) => {
    pronunciation.value =  response.data
  }).catch((error) => {
    console.log(error);
  })
}

onMounted(() => {
  fetchData();
})

const addQuestion = () => {
    pronunciation.value.pronunciation_details.push({
        content: null,
        ipa:null,
        audio: null,
    })
}

const audioUpload = (e, questionKey) => {
    pronunciation.value.pronunciation_details[questionKey].audio = e.target.files[0]
}

const deleteQuestion = (questionKey) => {
    pronunciation.value.pronunciation_details.splice(questionKey, 1);
}

const updateExam = async() => {
    const formData = new FormData();
    formData.append('topic_name', pronunciation.value.topic_name || '');
    pronunciation.value.pronunciation_details.forEach((detail, index) => {
        formData.append(`pronunciation_details[${index}][content]`, detail.content || '');
        formData.append(`pronunciation_details[${index}][ipa]`, detail.ipa || '');
        if (detail.audio) {
            formData.append(`pronunciation_details[${index}][audio]`, detail.audio);
        }
    });

    await pronunciationStore().updateExam(examId.value, formData).then((response) => {
        emits('handleOk');
        message.success('Cập nhật bài tập thành công');
    }).catch((error) => {
        console.log(error);
        message.error('Cập nhật bài tập thất bại');
    })
}
</script>

<style>

</style>