import Api from '@/services/Api'

export default { 
    register(credentials){ 
        return Api.post('register', credentials)
    }, 
    login(credentials){ 
        return Api.post('login', credentials)
    },
    getUser(credentials){ 
        //get user data every reload (or use persisted state to keep it)
        return Api.get('getUser', credentials)
    }
}


