import {createApp} from 'vue'
import {createI18n} from 'vue-i18n'
import './style.css'
import App from './App.vue'
import en_translations from './locales/en.json'
import it_translations from './locales/it.json'

const browsingLanguage = navigator.language.substring(0, 2);
let locale = ['en', 'it'].includes(browsingLanguage) ? browsingLanguage : 'en';

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
