import {createApp} from 'vue'
import {createI18n} from 'vue-i18n'
import './style.css'
import App from './App.vue'

const i18n = createI18n({
    legacy: false,
    locale: 'it',
    fallbackLocale: 'en',
    messages: {
        en: {
            message: {
                today: 'Today',
                futureQuestion: 'Can\'t wait? You are taking a peek at {day} {month}\'s question',
                pastQuestion: 'The question on {day} {month} was:',
                todayQuestion: 'Buckle up! Today\'s question is:',
                noQuestions: 'No question for today.'
            }
        },
        it: {
            message: {
                today: 'Oggi',
                futureQuestion: 'Impaziente? Stai sbirciando la domanda del {day} {month}:',
                pastQuestion: 'La domanda del {day} {month} era:',
                todayQuestion: 'Preparati a rispondere! La domanda di oggi è:',
                noQuestions: 'Non ci sono domande oggi.'
            }
        }
    }
});

createApp(App).use(i18n).mount('#app')
