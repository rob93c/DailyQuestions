<script setup lang="ts">
import {inject, ref} from 'vue';
import {useI18n} from 'vue-i18n';
import questionsJson from './../assets/questions.json';

type Questions = {
  [month: string]: {
    [day: number]: string;
  };
};

const theme = inject('theme');
const {t, d} = useI18n();

const getMonth = (date: Date) => {
  return new Intl.DateTimeFormat('it-IT', {month: 'long'}).format(date);
};

let today = new Date();
today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
let day = ref(today.getDate());
let month = ref(getMonth(today));
const yesterday = new Date(new Date().setDate(day.value - 1));

const getIntro = (date: Date) => {
  if (date > today) {
    return t('message.futureQuestion', {date: d(date, 'long')});
  } else if (date < today) {
    return t('message.pastQuestion', {date: d(date, 'long')});
  } else {
    return t('message.todayQuestion');
  }
};

let intro = ref(getIntro(today));

const loadQuestion = (date: Date) => {
  day.value = date.getDate();
  month.value = getMonth(date);
  intro.value = getIntro(date);

  return questions[month.value]?.[day.value] || t('message.noQuestions');
};

const questions: Questions = questionsJson;
let dailyQuestion = ref(loadQuestion(today));

const customDate = ref<string | null>(null);
const handleChange = () => {
  if (customDate.value) {
    let selectedDate = new Date(customDate.value);
    selectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
    dailyQuestion.value = loadQuestion(selectedDate);
    totalDays.value = getDaysInYear(selectedDate)
  }
};

const getDaysInYear = (date: Date) => {
  return isLeapYear(date) ? 366 : 365;
};

const isLeapYear = (date: Date) => {
  return new Date(date.getFullYear(), 1, 29).getMonth() === 1;
};

let totalDays = ref(getDaysInYear(today));

const refreshContent = (date: Date) => {
  dailyQuestion.value = loadQuestion(date);
  totalDays.value = getDaysInYear(date);
  customDate.value = null
};
</script>

<template>
  <h1>{{ totalDays }} questions</h1>
  <p>{{ intro }}</p>
  <h2><i><q>{{ dailyQuestion }}</q></i></h2>
  <br>

  <div class="form-container">
    <form @change="handleChange">
      <div>
        <label for="date">{{ $t('message.specificDate') }}</label>
        <input type="date" id="date" v-model="customDate" required>
      </div>
      <div class="button-row">
        <button :class="['btn', theme]" type="button"
                @click="refreshContent(yesterday)">{{ $t('message.yesterday') }}
        </button>
        <button :class="['btn', theme]" type="button"
                @click="refreshContent(today)">{{ $t('message.today') }}
        </button>
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
  color: #ffffff;
}

/*noinspection CssUnusedSymbol*/
.btn.light {
  background-color: #c9c9c9;
  color: #000000;
}
</style>
