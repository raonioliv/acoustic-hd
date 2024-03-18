import {createRouter, createWebHashHistory} from 'vue-router'
import RegistrationLogin from '@/views/RegistrationLogin'

import HomeView from '@/views/HomeView'

import SongsPage from '@/views/SongsPage'
import CreateSong from '@/views/CreateSong'
import SongView from '@/views/SongView'

import ProfileView from '@/views/ProfileView'

import BookmarksView from '@/views/BookmarksView'
import HistoryView from '@/views/HistoryView'

import PasswordResetView from '@/views/PasswordResetView'

const routes = [
    { 
        path: '/', 
        component: HomeView, 
        alias: '/home',
        meta: {title: 'Home - AcousticHD'} 
    },
    { 
        path: '/register',
        component: RegistrationLogin,
        meta: {title: 'Entrar - AcousticHD'} 
    },

    { 
        path: '/songs', 
        component: SongsPage,
        meta: {title: 'Músicas - AcousticHD'} 
    },
    { 
        path: '/songs/create', 
        component: CreateSong,
        meta: {title: 'Criar música'} 
    },
    { 
        path: '/songs/:songId', 
        component: SongView
    },

    { 
        path: '/profile', 
        component: ProfileView, 
        meta: {title: 'Minha conta - AcousticHD'} 
    },
    { 
        path: '/bookmarks', 
        component: BookmarksView, 
        meta: {title: 'Favoritos - AcousticHD'} 
    },

    { 
        path: '/history', 
        component: HistoryView, 
        meta: {title: 'Recentes - AcousticHD'} 
    },
    { 
        path: '/password-reset', 
        component: PasswordResetView, 
        meta: {title: 'Recuperação de conta'}  
    }
]



export default createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})