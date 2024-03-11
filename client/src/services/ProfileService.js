import Api from "./Api";

export default { 
    profile(){ 
        return Api.get('profile')
    }, 

    editProfile(profile){ 
        return Api.put('profile', profile)
    }
}