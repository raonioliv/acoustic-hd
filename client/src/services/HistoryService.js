import Api from "./Api";


export default { 
    post(songId){ 
        return Api.post('history', { songId: songId })
    },
    index(songId){ 
        return Api.get('history', { 
            params: { 
                songId: songId
            }
        })
    },
}