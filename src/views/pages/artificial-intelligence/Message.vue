<template>
    <div class="message-list w-100 mt-2">
        <template v-for="(message, messsageKey) in messages" :key="messsageKey">
            <MessageItem :message = "message"/>
        </template>
    </div>
</template>

<script setup>
import { toRefs } from 'vue';
import MessageItem from './MessageItem.vue';

const props = defineProps(["messages"])
const { messages } = toRefs(props)
</script>

<style scoped lang="scss">
.message-list{
    min-height: 500px;
    overflow-y: auto;
}
</style>