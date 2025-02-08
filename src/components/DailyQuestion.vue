<script setup lang="ts">
import { inject, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const theme = inject('theme');
const { t, d, locale } = useI18n();

let today = new Date();
today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const yesterday = new Date(new Date().setDate(today.getDate() - 1));

const getIntro = (date: Date) => {
  if (date > today) {
    return t('message.futureQuestion', { date: d(date, 'long') });
  } else if (date < today) {
    return t('message.pastQuestion', { date: d(date, 'long') });
  } else {
    return t('message.todayQuestion');
  }
};

let intro = ref(getIntro(today));

const loadQuestion = (date: Date) => {
  intro.value = getIntro(date);

  return t(`message.questions.${date.getMonth()}.${date.getDate()}`);
};

const timezoneOffset = today.getTimezoneOffset() * 60 * 1000;
const formatDate = (date: Date) => {
  return new Date(date.getTime() - timezoneOffset).toISOString().split('T')[0];
}

let dailyQuestion = ref(loadQuestion(today));
let customDate = ref<string | null>(formatDate(today));
let selectedDate = ref(today);

const handleChange = () => {
  if (customDate.value) {
    const tempDate = new Date(customDate.value);
    selectedDate.value = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());
    dailyQuestion.value = loadQuestion(tempDate);
    totalDays.value = getDaysInYear(tempDate)
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
  selectedDate.value = date;
  customDate.value = formatDate(date);
};

watch(locale, () => {
  dailyQuestion.value = loadQuestion(selectedDate.value);
});
</script>

<template>
  <h1>{{ totalDays }} questions</h1>

  <div class="question">
    <p>{{ intro }}</p>
    <h2><i><q>{{ dailyQuestion }}</q></i></h2>
    <br>
  </div>

  <div class="form-container">
    <form @change="handleChange">
      <div class="date-selector">
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
