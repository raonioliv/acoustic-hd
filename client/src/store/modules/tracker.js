import Api from '@/services/Api'
import SecureLS from 'secure-ls'
const ls = new SecureLS({isCompression: false})
const namespaced = true
const state = {
    loading: false, 
}
const getters = {

}
const actions = {
    async begin(){ 
        const {token} = ls.get('ahd-user') ? JSON.parse(ls.get('ahd-user')).user : false
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
