<template>
  <a-modal :open = "isOpen" title="Chỉnh sửa đoạn chat" @cancel = "emits('handleCancel')">

  </a-modal>
</template>

<script setup>
const props = defineProps(['isOpen'])
const emits = defineEmits(['handleCancel'])
</script>

<style>

</style>