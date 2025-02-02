import {createApp} from 'vue'
import {createI18n} from 'vue-i18n'
import './style.css'
import App from './App.vue'
import en_translations from './locales/en.json'
import it_translations from './locales/it.json'

const supportedLocales = ['en', 'it'];
let userLocales = [...new Set(navigator.languages
    .map(lang => new Intl.Locale(lang).language)
    .filter(locale => supportedLocales.includes(locale)))];
let locale = userLocales.length > 0 ? userLocales[0] : 'en';

const i18n = createI18n({
    legacy: false,
    locale: locale,
    fallbackLocale: 'en',
    messages: {
        en: {
            message: en_translations
        },
        it: {
            message: it_translations
        }
    },
    datetimeFormats: {
        en: {
            long: {
                month: 'long', day: 'numeric'
            }
        },
        it: {
            long: {
                month: 'long', day: 'numeric'
            }
        }
    }
});

createApp(App).use(i18n).mount('#app')
