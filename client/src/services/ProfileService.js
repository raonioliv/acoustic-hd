import Api from "./Api";

export default { 
    profile(){ 
        return Api.get('profile')
    }, 

    editProfile(profile){ 
        return Api.put('profile', profile)
    }, 
    resetPassword(email){ 
        return Api.post('send-reset-password-email', { 
            email: email
        })
    }, 
    submitNewPassword(credentials){ 
        return Api.post('change-password', credentials)
    }
}