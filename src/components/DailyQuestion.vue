<script setup lang="ts">
import {ref} from 'vue';
import questionsJson from './../assets/questions.json';

type Questions = {
  [month: string]: {
    [day: number]: string;
  };
};

const questions: Questions = questionsJson;
const today = new Date();
const month = today.toLocaleString('en', {month: 'long'});
const day = today.getDate();
const dailyQuestion = questions[month]?.[day] || 'No question for today.';

const customDate = ref('');
const handleSubmit = () => {
};
</script>

<template>
  <h1>365 questions</h1>
  <h2> {{ dailyQuestion }}</h2>

  <form @submit.prevent="handleSubmit">
    <div>
      <label for="date">Scegli un giorno specifico: </label>
      <input type="date" id="date" v-model="customDate" required>
    </div>
    <button type="submit">Carica la domanda</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 2em;
}

button {
  align-self: auto;
}
</style>
