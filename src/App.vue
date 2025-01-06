<script setup lang="ts">
import {provide, onMounted, ref} from 'vue';
import DailyQuestion from "./components/DailyQuestion.vue";

const theme = ref('dark');

onMounted(() => {
  const isDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  theme.value = isDarkTheme ? 'dark' : 'light';

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    theme.value = e.matches ? 'dark' : 'light';
  });
});

provide('theme', theme);
</script>

<template>
  <div>
    <a href="https://github.com/rob93c" target="_blank">
      <img :src="`/assets/${theme}-github.svg`" :class="['logo', 'github', theme]" alt="GitHub logo"/>
    </a>
  </div>
  <DailyQuestion/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

/*noinspection CssUnusedSymbol*/
.logo.github.dark:hover {
  filter: drop-shadow(0 0 2em #aeb1b1);
}

/*noinspection CssUnusedSymbol*/
.logo.github.light:hover {
  filter: drop-shadow(0 0 2em #000000);
}
</style>
