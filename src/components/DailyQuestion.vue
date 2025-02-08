<script setup lang="ts">
import { inject, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { DateTime } from 'luxon';

const theme = inject('theme');
const { t, d, locale } = useI18n();

const today = DateTime.now().startOf('day');
const yesterday = today.minus({ days: 1 });

const getIntro = (dateTime: DateTime) => {
  if (dateTime > today) {
    return t('message.futureQuestion', { date: d(dateTime.toJSDate(), 'long') });
  } else if (dateTime < today) {
    return t('message.pastQuestion', { date: d(dateTime.toJSDate(), 'long') });
  } else {
    return t('message.todayQuestion');
  }
};

let intro = ref(getIntro(today));

const loadQuestion = (dateTime: DateTime) => {
  intro.value = getIntro(dateTime);

  return t(`message.questions.${dateTime.month}.${dateTime.day}`);
};

let dailyQuestion = ref(loadQuestion(today));
let customDate = ref<string>(today.toFormat('yyyy-MM-dd'));
let selectedDate = ref<DateTime>(today);

const handleChange = () => {
  selectedDate.value = DateTime.fromISO(customDate.value).startOf('day');
  dailyQuestion.value = loadQuestion(selectedDate.value);
  totalDays.value = getDaysInYear(selectedDate.value)
};

const getDaysInYear = (dateTime: DateTime) => {
  return dateTime.isInLeapYear ? 366 : 365;
};

let totalDays = ref(getDaysInYear(today));

const refreshContent = (dateTime: DateTime) => {
  dailyQuestion.value = loadQuestion(dateTime);
  totalDays.value = getDaysInYear(dateTime);
  selectedDate.value = dateTime;
  customDate.value = dateTime.toFormat('yyyy-MM-dd');
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
