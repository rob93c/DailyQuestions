<script setup lang="ts">
import {inject, ref} from 'vue';
import questionsJson from './../assets/questions.json';

type Questions = {
  [month: string]: {
    [day: number]: string;
  };
};

const theme = inject('theme');


let getMonth = (date: Date) => {
  return date.toLocaleString('it', {month: 'long'});
}

const today = new Date();
let month = ref(getMonth(today));
let day = ref(today.getDate());

let getIntros = () => [
  'Preparati a rispondere! La domanda di oggi è:',
  `Impaziente? Stai sbirciando la domanda del ${day.value} ${month.value}:`,
  `La domanda del ${day.value} ${month.value} era:`,
];

let intro = ref(getIntros()[0]);

let loadQuestion = (date: Date) => {
  month.value = getMonth(date);
  day.value = date.getDate();
  const intros = getIntros();
  intro.value = date > today ? intros[1] : date < today ? intros[2] : intros[0];

  return questions[month.value]?.[day.value] || 'No question for today.';
}

const questions: Questions = questionsJson;
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
  <p> {{ intro }}</p>
  <h2><i><q>{{ dailyQuestion }} </q></i></h2>
  <br>

  <div class="form-container">
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
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 20vh;
}

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
