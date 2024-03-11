import router from '@/router'
import Api from '@/services/Api'
// import SecureLS from 'secure-ls'

// const ls = new SecureLS({isCompression: false})
const namespaced = true
const state = {
    isAuthenticated: false,
    user: {}, 
    token: null,
    avatarColor: ''
}
const getters = {
    token(state){ 
        return state.token
    }, 
    user(state){ 
        return state.user
    }, 
    loading(state){
        return state.loading
    },
    isAuthenticated(state){ 
        return state.isAuthenticated
    }, 
    avatarColor(state){ 
        return state.avatarColor
    }
}
const actions = {
    setToken({commit}, data){ 
        if(data){ 
            commit('setToken', data)
        }
    },
    setUser({commit}, data){ 
        if(data){ 
            commit('setUser', data)
        }
    },
    setIsAuthenticated({commit}, data){ 
        if(data){ 
            commit('setIsAuthenticated', data)
        }
    },
    authenticateUser({commit ,dispatch}, data){ 
        if(data.token && data.user){ 
            commit('setUser', data.user)
            commit('setToken', data.token)
            commit('setIsAuthenticated', true)
            Api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
            dispatch('setAvatarColor')
        }
    }, 
    logout({commit}){ 
        sessionStorage.removeItem('token')
        commit('setUser', {})
        commit('setToken', null)
        commit('setIsAuthenticated', false)
        router.push('/home')
        Api.defaults.headers.common['Authorization'] = null
    }, 

    setAvatarColor({commit}){ 
        const colors = [
            'cyan', 
            'yellow', 
            'brown', 
            'green',
            'pink-lighten-2',
            'purple-lighten-3'
        ]
        const randomIndex = Math.floor(Math.random() * colors.length)
        commit('setAvatarColor', colors[randomIndex])
    }

}
const mutations = {
    setToken(state, data){ 
        state.token = data
    }, 
    setIsAuthenticated(state, data){ 
        state.isAuthenticated = data
    },
    setUser(state, data){ 
        state.user = data
    }, 
    setLoading(state, data){ 
        state.loading = data
    }, 
    setAvatarColor(state, data){ 
        state.avatarColor = data
    }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced,
}
