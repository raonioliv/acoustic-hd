const namespaced = true
const state = {
  isDark: false
}
const getters = {
  isDark(state) { 
    return state.isDark
  }
}
const actions = {
  isDark({commit}, data){ 
    commit('setIsDark', data)
  }
}
const mutations = {
  isDark(state, data){ 
    state.isDark = data
  }
}

module.exports = {
  state,
  getters,
  actions,
  mutations,
  namespaced,
}
