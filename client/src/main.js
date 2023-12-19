import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import '../src/scss/global.scss'
import store from './store'


createApp(App)
    .use(router)
    .use(store)
    .mount('#app')    
