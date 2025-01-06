<script setup lang="ts">
import {inject, ref} from 'vue';
import questionsJson from './../assets/questions.json';

type Questions = {
  [month: string]: {
    [day: number]: string;
  };
};

const theme = inject('theme');

let loadQuestion = (date: Date) => {
  const month = date.toLocaleString('en', {month: 'long'});
  const day = date.getDate();

  return questions[month]?.[day] || 'No question for today.';
}

const questions: Questions = questionsJson;
const today = new Date();
let dailyQuestion = ref(loadQuestion(today));

const customDate = ref<string | null>(null);
const handleSubmit = () => {
  if (customDate.value) {
    const selectedDate = new Date(customDate.value);
    dailyQuestion.value = loadQuestion(selectedDate);
  }
};
</script>

<template>
  <h1>365 questions</h1>
  <h2><i> {{ dailyQuestion }} </i></h2>
  <br>

  <form @submit.prevent="handleSubmit">
    <div>
      <label for="date">Scegli un giorno specifico: </label>
      <input type="date" id="date" v-model="customDate" required>
    </div>
    <div class="button-row">
      <button :class="['btn', theme]">Carica la domanda</button>
      <button :class="['btn', theme]" type="button" @click="dailyQuestion = loadQuestion(today)">Oggi</button>
    </div>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 2em;
}

.button-row {
  display: flex;
  justify-content: center;
  gap: 1em;
}

button {
  align-self: auto;
}

/*noinspection CssUnusedSymbol*/
.btn.dark {
  background-color: #333;
  color: #fff;
}

/*noinspection CssUnusedSymbol*/
.btn.light {
  background-color: #c9c9c9;
  color: #333;
}
</style>
