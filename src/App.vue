<script setup lang="ts">
import DailyQuestion from "./components/DailyQuestion.vue";
</script>

<template>
  <div>
    <a href="https://github.com/rob93c" target="_blank">
      <img src="/src/assets/github.svg" class="logo github" alt="GitHub logo"/>
    </a>
  </div>
  <DailyQuestion />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo.github:hover {
  filter: drop-shadow(0 0 2em #aeb1b1);
}
</style>
