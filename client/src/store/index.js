// import { createStore } from 'vue'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import user from './modules/user'
import theme from './modules/theme'
import tracker from './modules/tracker'
import SecureLS from 'secure-ls'

const ls = new SecureLS({isCompression: false})
export default createStore({
  modules: {
    user,
    theme, 
    tracker, 
  }, 
  plugins: [ 
    createPersistedState({ 
      key: ['ahd-user'],
      paths: ['user'], 

      storage: { 
        getItem: (key) => ls.get(key), 
        setItem: (key, value) => ls.set(key, value), 
        removeItem: (key) => ls.remove(key)
      }
    })
  ]
})
