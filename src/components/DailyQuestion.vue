<script setup lang="ts">
import { inject, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import moment, { Moment } from 'moment';

const theme = inject('theme');
const { t, d, locale } = useI18n();

const today = moment().startOf('day');
const yesterday = today.clone().subtract(1, 'day');

const getIntro = (moment: Moment) => {
  if (moment.isAfter(today)) {
    return t('message.futureQuestion', { date: d(moment.toDate(), 'long') });
  } else if (moment.isBefore(today)) {
    return t('message.pastQuestion', { date: d(moment.toDate(), 'long') });
  } else {
    return t('message.todayQuestion');
  }
};

let intro = ref(getIntro(today));

const loadQuestion = (moment: Moment) => {
  intro.value = getIntro(moment);

  return t(`message.questions.${moment.month()}.${moment.date()}`);
};

let dailyQuestion = ref(loadQuestion(today));
let customDate = ref<string>(moment(today).format('YYYY-MM-DD'));
let selectedDate = ref(today);

const handleChange = () => {
  selectedDate.value = moment(customDate.value).startOf('day');
  dailyQuestion.value = loadQuestion(selectedDate.value);
  totalDays.value = getDaysInYear(selectedDate.value)
};

const getDaysInYear = (moment: Moment) => {
  return moment.isLeapYear() ? 366 : 365;
};

let totalDays = ref(getDaysInYear(today));

const refreshContent = (moment: Moment) => {
  dailyQuestion.value = loadQuestion(moment);
  totalDays.value = getDaysInYear(moment);
  selectedDate.value = moment;
  customDate.value = moment.format('YYYY-MM-DD');
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
