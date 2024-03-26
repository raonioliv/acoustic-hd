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
        path: '/register', 
        component: 
        RegistrationLogin ,
        meta: { 
            title: 'AcousticHD - Cadastro'
        }
    },
    { 
        path: '/', 
        component: 
        HomeView, 
        alias: '/home',
        meta: { 
            title: 'AcousticHD - Home'
        } 
    },

    { 
        path: '/songs', 
        component: 
        SongsPage,
        meta: { 
            title: 'AcousticHD - Músicas'
        }
    },
    { 
        path: '/songs/create', 
        component: CreateSong,
        meta:{ 
            authRequired: true,
            title: 'Criar música'
        },
    },
    { 
        path: '/songs/:songId', 
        component: SongView, 
        meta: { 
            title: 'AcousticHD'
        }
    },

    { 
        path: 
        '/profile', 
        component: ProfileView,
        meta:{ 
            authRequired: true,
            title: 'Minha conta'
        }, 
    },
    { path: 
        '/bookmarks', 
        component: BookmarksView,
        meta:{ 
            authRequired: true, 
            title: 'Favoritos'
        }
        
    },


    { path: 
        '/history', 
        component: HistoryView,
        meta:{ 
            authRequired: true,
            title: 'Histórico'
        }
    },
    { path: 
        '/password-reset', 
        component: PasswordResetView 
    }
]



export default createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})