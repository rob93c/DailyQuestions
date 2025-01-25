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
                yesterday: 'Yesterday',
                specificDate: 'Choose a specific date: ',
                futureQuestion: 'Can\'t wait? You are peeking at the question for {date}:',
                pastQuestion: 'The question for {date} was:',
                todayQuestion: 'Buckle up! Today\'s question is:',
                noQuestions: 'There are no questions today.'
            }
        },
        it: {
            message: {
                today: 'Oggi',
                yesterday: 'Ieri',
                specificDate: 'Scegli un giorno specifico: ',
                futureQuestion: 'Impaziente? Stai sbirciando la domanda del {date}:',
                pastQuestion: 'La domanda del {date} era:',
                todayQuestion: 'Preparati a rispondere! La domanda di oggi è:',
                noQuestions: 'Non ci sono domande oggi.'
            }
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
