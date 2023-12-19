const namespaced = true
const state = {
    isAuthenticated: false,
    user: {}, 
    token: ''
}
const getters = {
    token(state){ 
        return state.token
    }, 
    user(state){ 
        return state.user
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
    }
}

module.exports = {
  state,
  getters,
  actions,
  mutations,
  namespaced,
}
