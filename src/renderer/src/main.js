import App from './App.vue'
import { registerPlugins } from './plugins'
import { createApp } from 'vue'
import { i18n } from './i18n'
import ToastPlugin from 'vue-toast-notification'
import '@/assets/css/global.scss'
import '@/assets/css/fonts.scss'

const app = createApp(App)
registerPlugins(app)
app.use(i18n).use(ToastPlugin)
app.mount('#app')
