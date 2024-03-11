import Api from "./Api";

export default { 
    index(bookmark){
        return Api.get('bookmark', { 
            params: bookmark
        })
    },
    post(bookmark){ 
        return Api.post('bookmark', bookmark)
    }, 
    delete(bookmark){ 
        return Api.delete('bookmark', { 
            params: bookmark
        })
    }, 
}