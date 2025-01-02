<template>
  <div class="message-list w-100 mt-2" ref="messageContainer">
    <template v-for="(message, messsageKey) in messages" :key="messsageKey">
      <MessageItem
        :message="message"
        :messageKey="messsageKey"
        :isResponseLoading="isResponseLoading"
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
import { onMounted, ref, toRefs, watch, defineExpose  } from "vue";
import MessageItem from "./MessageItem.vue";
import Loading from "../../components/Loading.vue";

const messageContainer = ref(null);
const props = defineProps([
  "messages",
  "isResponseLoading",
  "isResponseUserLoading",
]);
const { messages, isResponseLoading, isResponseUserLoading } = toRefs(props);
const scrollToBottom = () => {
  const container = messageContainer.value;
  console.log(12);
  
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
};

watch(
  () => messages.value,
  () => {
    scrollToBottom();
  },
  { deep: true }
);

onMounted(() => {
    scrollToBottom();
});

defineExpose({
  scrollToBottom,
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
</style>
