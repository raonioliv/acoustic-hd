import Api from '@/services/Api'
import AuthenticationService from '@/services/AuthenticationService'
const namespaced = true
const state = {

}
const getters = {

}
const actions = {
    async begin(){ 
        const token = sessionStorage.getItem('token')
        if(token){
            console.log('caiu');
            Api.defaults.headers.common['Authentication'] = `Bearer ${token}`
            AuthenticationService.getUser()
        }
    }
}
const mutations = {

}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced,
}
