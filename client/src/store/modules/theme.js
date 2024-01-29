const namespaced = true
const state = {
  theme: 'light'
}
const getters = {
  theme(state) { 
    return state.theme
  }
}
const actions = {
  setTheme({commit}, data){ 
    commit('setTheme', data)
  }
}
const mutations = {
  setTheme(state, data){ 
    state.theme = data
  }
}

module.exports = {
  state,
  getters,
  actions,
  mutations,
  namespaced,
}
