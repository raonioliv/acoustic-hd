import RegistrationLogin from '@/views/RegistrationLogin.vue'
import HomeView from '@/views/HomeView.vue'
import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    { path: '/register', component: RegistrationLogin },
    { path: '/', component: HomeView, alias: '/home' },
    { path: '/carousel', component: HomeView,},
]



export default createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
  })