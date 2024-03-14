import { createApp } from 'vue'
import './style.css'
import { store } from "./store/store";
import App from './App.vue'
import GlobalComponents from './globals'


const app = createApp(App)

app.use(store)
app.use(GlobalComponents)
app.mount('#app')
