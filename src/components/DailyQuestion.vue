<script setup lang="ts">
import {ref} from 'vue';

let dailyQuestion = 'Qual è stato il più grande obiettivo che hai raggiunto di recente?';
const customDate = ref('');

const handleSubmit = () => {

};
</script>

<template>
  <h1>365 questions</h1>
  <h2> {{ dailyQuestion }}</h2>

  <form @submit.prevent="handleSubmit">
    <div>
      <label for="date">Choose a specific day: </label>
      <input type="date" id="date" v-model="customDate" required>
    </div>
    <button type="submit">Load question</button>
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
