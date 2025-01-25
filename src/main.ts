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
                futureQuestion: 'Can\'t wait? You are peeking at the question for {day} {month}:',
                pastQuestion: 'The question for {day} {month} was:',
                todayQuestion: 'Buckle up! Today\'s question is:',
                noQuestions: 'There are no questions today.'
            }
        },
        it: {
            message: {
                today: 'Oggi',
                yesterday: 'Ieri',
                specificDate: 'Scegli un giorno specifico: ',
                futureQuestion: 'Impaziente? Stai sbirciando la domanda del {day} {month}:',
                pastQuestion: 'La domanda del {day} {month} era:',
                todayQuestion: 'Preparati a rispondere! La domanda di oggi è:',
                noQuestions: 'Non ci sono domande oggi.'
            }
        }
    }
});

createApp(App).use(i18n).mount('#app')
