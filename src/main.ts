import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/ru'

const app = createApp(App)

app
.use(ElementPlus, { locale })

app.mount('#app')
