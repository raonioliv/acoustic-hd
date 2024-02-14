import router from '@/router'
import Api from '@/services/Api'
const namespaced = true
const state = {
    isAuthenticated: false,
    user: {}, 
    token: null,
    loading: false, 
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
    authenticateUser({commit}, data){ 
        if(data.token && data.user){ 
            sessionStorage.removeItem('token')
            commit('setUser', data.user)
            commit('setToken', data.token)
            commit('setIsAuthenticated', true)
            sessionStorage.setItem('token', data.token)
            Api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
        }
    }, 
    logout({commit}){ 
        sessionStorage.removeItem('token')
        commit('setUser', {})
        commit('setToken', null)
        commit('setIsAuthenticated', false)
        router.push('/home')
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
    }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced,
}
