import { createApp } from 'vue'
import './assets/scss/index.scss'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/ru'
import router from './router/router'

const app = createApp(App)

app
    .use(ElementPlus, { locale })
    .use(router)

app.mount('#app')
