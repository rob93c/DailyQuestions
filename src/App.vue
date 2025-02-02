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

type Locales = {
  [locale: string]: string
};

const localeNames: Locales = {
  "en": "English",
  "it": "Italiano"
};
</script>

<template>
  <div class="app-container">
    <DailyQuestion/>
  </div>

  <div class="logos">
    <a href="https://github.com/rob93c/DailyQuestions" target="_blank">
      <img :src="`/assets/${theme}-github.svg`" :class="['logo', 'github', theme]" alt="GitHub logo"/>
    </a>
  </div>

  <div class="locale-changer">
    <label for="locale-selector">{{ $t('message.language') }}: </label>
    <select v-model="$i18n.locale" id="locale-selector" name="locale-selector">
      <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">
        {{ localeNames[locale] }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.logo {
  height: 2em;
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
