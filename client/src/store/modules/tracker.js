const namespaced = true
const state = {

}
const getters = {

}
const actions = {
    begin({ dispatch }){ 
        var user = JSON.parse(
            sessionStorage.getItem('user')
        )
        var token = sessionStorage.getItem('token')
        if(user && token){ 
            var userData = { 
                user: user, 
                token: token
            }
            dispatch('user/authenticateUser', userData, {root: true})
        }
        
    }
}
const mutations = {

}

module.exports = {
  state,
  getters,
  actions,
  mutations,
  namespaced,
}
