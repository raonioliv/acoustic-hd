import RegistrationLogin from '@/views/RegistrationLogin.vue'
import HomeView from '@/views/HomeView.vue'
import SongsPage from '@/views/SongsPage.vue'
import CreateSong from '@/views/CreateSong.vue'
import SongView from '@/views/SongView.vue'
import ProfileTeste from '@/views/ProfileTeste'
import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    { path: '/register', component: RegistrationLogin },
    { path: '/', component: HomeView, alias: '/home' },
    { path: '/songs', component: SongsPage},
    { path: '/songs/create', component: CreateSong},
    { path: '/songs/:songId', component: SongView},
    { path: '/profile', component: ProfileTeste},
]



export default createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})