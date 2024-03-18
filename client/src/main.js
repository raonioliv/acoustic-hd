import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import SecureLS from 'secure-ls'

const ls = new SecureLS({isCompression: false})
const DEFAULT_TITLE = 'AcousticHD'
router.beforeEach((to, from, next) => { 
  const publicPage = ['/login', '/register', '/songs', '/password-reset']
  const authRequired = !publicPage.includes(to.path)
  const user = JSON.parse(ls.get('ahd-user'))?.user
  const isAuthenticated = user.token ? true : false
  
  if(!isAuthenticated && authRequired){ 
    next('/register')
  }else{ 
    next()
  }
})

router.afterEach((to) => { 
  document.title = to.meta.title || DEFAULT_TITLE
})

loadFonts()
createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
