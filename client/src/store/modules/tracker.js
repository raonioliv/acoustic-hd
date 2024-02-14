import Api from '@/services/Api'

const namespaced = true
const state = {

}
const getters = {

}
const actions = {
    async begin(){ 
        const token = sessionStorage.getItem('token')
        if(token){
            Api.defaults.headers.common['Authorization'] = `bearer ${token}`
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
