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
        RegistrationLogin 
    },
    { 
        path: '/', 
        component: 
        HomeView, 
        alias: '/home' 
    },

    { 
        path: '/songs', 
        component: 
        SongsPage
    },
    { 
        path: '/songs/create', 
        component: CreateSong,
        meta:{ 
            authRequired: true
        }
    },
    { 
        path: '/songs/:songId', 
        component: SongView
    },

    { path: 
        '/profile', 
        component: ProfileView,
        meta:{ 
            authRequired: true
        }
    },
    { path: 
        '/bookmarks', 
        component: BookmarksView,
        meta:{ 
            authRequired: true
        }
        
    },


    { path: 
        '/history', 
        component: HistoryView,
        meta:{ 
            authRequired: true
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