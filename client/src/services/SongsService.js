import Api from './Api'

export default { 
    index(search){ 
        return Api.get('songs', { 
            params: { 
                search: search
            }
        })
    }, 
    post(song){ 
        return Api.post('songs', song)
    },
    delete(songId){ 
        return Api.delete(`songs/${songId}`)
    }, 
    show(songId){ 
        return Api.get(`songs/${songId}`)
    }
}