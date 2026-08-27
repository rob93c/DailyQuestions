import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { useStorage } from '@vueuse/core'
import './style.css'
import App from './App.vue'
import en_translations from './locales/en.json'
import it_translations from './locales/it.json'

const supportedLocales = ['en', 'it'];
const detectBrowserLocale = () =>
  navigator.languages
    .map(lang => new Intl.Locale(lang).language)
    .find(locale => supportedLocales.includes(locale)) || 'en';

const storedLocale = useStorage('preferred-locale', detectBrowserLocale());

const locale = supportedLocales.includes(storedLocale.value)
  ? storedLocale.value
  : detectBrowserLocale();

const i18n = createI18n({
  legacy: false,
  locale: locale,
  fallbackLocale: 'en',
  messages: {
    en: en_translations,
    it: it_translations
  },
  datetimeFormats: {
    en: {
      long: {
        month: 'long', day: 'numeric', weekday: 'long'
      }
    },
    it: {
      long: {
        month: 'long', day: 'numeric', weekday: 'long'
      }
    }
  }
});

createApp(App).use(i18n).mount('#app')
