import RegistrationLogin from '@/views/RegistrationLogin.vue'
import TesteComponent from '@/views/TesteComponent.vue'
import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    { path: '/register', component: RegistrationLogin },
    { path: '/', component: TesteComponent }
]



export default createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
  })