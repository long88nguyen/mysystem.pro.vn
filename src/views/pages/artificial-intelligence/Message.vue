<template>
  <div class="message-list w-100 mt-2" ref="messageContainer">
    <template v-for="(message, messsageKey) in messages" :key="messsageKey">
      <MessageItem
        :message="message"
        :messageKey="messsageKey"
        :isResponseLoading="isResponseLoading"
        @playAudioMessage="playAudioMessage"
      />
    </template>
    <slot></slot>
    <div class="message-system text-start" v-if="isResponseLoading">
      <div class="message-content mt-1 d-flex">
        <img
          src="../../../assets/uploads/model_1.png"
          alt=""
          class="img-thumbnail avatar-circle"
        />
        <div class="ms-2 message-text message-text-system">
          <Loading :color="'black'"></Loading>
        </div>
      </div>
    </div>

    <div class="message-user" v-if="isResponseUserLoading">
      <div class="message-content mt-1 d-flex justify-content-end">
        <div class="ms-2 message-text message-text-user">
          <Loading :color="'white'"></Loading>
        </div>
        <img
          src="../../../assets/uploads/model_3.png"
          alt=""
          class="img-thumbnail avatar-circle"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, toRefs, watch, defineExpose, onUnmounted } from "vue";
import MessageItem from "./MessageItem.vue";
import Loading from "../../components/Loading.vue";

const messageContainer = ref(null);
const props = defineProps([
  "messages",
  "isResponseLoading",
  "isResponseUserLoading",
]);

const isAudioPlaying = ref(false);
const audioPlay = ref(null);

const { messages, isResponseLoading, isResponseUserLoading } = toRefs(props);
const scrollToBottom = () => {
  const container = messageContainer.value;
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
};

const playAudioMessage = (message) => {
  if (audioPlay.value) {
    audioPlay.value.pause();
    audioPlay.value = null;
    messages.value.forEach((message) => {
      message.isAudioPlaying = false;
    });
  }

  message.isAudioPlaying = true;
  audioPlay.value = new Audio(message.audio);
  audioPlay.value.playbackRate = 1;
  audioPlay.value.currentTime = 0;
  audioPlay.value.play();
  audioPlay.value.addEventListener("ended", () => {
    message.isAudioPlaying = false;
  });
};

// watch(
//   () => messages.value,
//   () => {
//     scrollToBottom();
//   },
//   { deep: true }
// );

onMounted(() => {
  scrollToBottom();
});

defineExpose({
  scrollToBottom,
});

onUnmounted(() => {
  if (audioPlay.value) {
    audioPlay.value.pause();
    audioPlay.value = null;
  }
});
</script>

<style scoped lang="scss">
.message-list {
  height: 700px;
  overflow-y: auto;
}

.avatar-circle {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}

.message-text {
  max-width: 50%;
  min-width: 80px;
  height: auto;
  padding: 10px;
  border-radius: 10px;
  font-size: 15px;
}

.message-text-system {
  background: #f0f0f0;
}

.message-text-user {
  background: #009990;
  color: white;
}

@media (max-width: 768px) {
  .message-list {
    height: 400px;
  }
  .message-text {
    max-width: 100%;
    font-size: 13px;
  }
  .avatar-circle {
    width: 30px;
    height: 30px;
    border-radius: 15px;
  }
  .message-user,
  .message-system {
    margin-top: 10px;
  }
}
</style>
