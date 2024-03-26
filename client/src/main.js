import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import SecureLS from 'secure-ls'


const ls = new SecureLS({isCompression: false})
router.beforeEach((to, from, next) => { 
  const authRequired = to.matched.some(record => record.meta.authRequired === true)
  const userStore = ls.get('ahd-user') ? JSON.parse(ls.get('ahd-user')) : false
  const user = userStore ? userStore.user : false
  const isAuthenticated = user.token ? true : false
  
  if(!isAuthenticated && authRequired){ 
    next('/register')
  }else{ 
    if(to.meta.title) document.title = to.meta.title
    next()
  }
})

loadFonts()
createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
