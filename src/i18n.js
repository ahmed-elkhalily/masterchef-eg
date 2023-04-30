import { createI18n } from 'vue-i18n'
import English from './locales/en.json'
import Arabic from './locales/ar.json'


export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: English,
    ar: Arabic
  },
  rtl: {ar: true, en: false},
})
