// import { createStore } from 'vue'
import { createStore } from 'vuex'
import user from './modules/user'
import theme from './modules/theme'
import tracker from './modules/tracker'

export default createStore({
  modules: {
    user,
    theme, 
    tracker
  },
})
