import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import i18n from './i18n'
loadFonts()
const pinia = createPinia()
/*
async () => {
  const config = await import('/config.js')
}
*/
createApp(App)
	.use(i18n)
	.use(pinia)
	.use(MotionPlugin)
	.use(router)
	.use(vuetify)
	.mount('#app')
