<template>
    <div class="timer-display">{{ formattedTime }}</div>
  </template>
    
    <script setup>
  import { ref, computed, onUnmounted } from "vue";
  
  const currentTime = ref(0);
  
  // Hàm tính toán thời gian hiển thị dưới dạng chuỗi "giờ:phút:giây"
  const formattedTime = computed(() => {
    const hours = Math.floor(currentTime.value / 3600);
    const minutes = Math.floor((currentTime.value % 3600) / 60);
    const seconds = currentTime.value % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  });
  
  // Hàm bổ sung số 0 đằng trước nếu số chỉ có một chữ số
  function pad(val) {
    return val < 10 ? `0${val}` : val;
  }
  
  // Hàm update thời gian sau mỗi giây
  const timerInterval = setInterval(() => {
    currentTime.value++;
  }, 1000);
  
  // Xử lý khi component bị destroy
  onUnmounted(() => {
    clearInterval(timerInterval);
  });
  </script>
    
    <style scoped>
  .timer-display {
    font-size: 1.5em;
  }
  </style>
    