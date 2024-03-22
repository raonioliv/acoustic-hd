import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import SecureLS from 'secure-ls'


const ls = new SecureLS({isCompression: false})
router.beforeEach((to, from, next) => { 
  const authRequired = to.matched.some(record => record.meta.requiresAuth)
  const userStore = ls.get('ahd-user') ? JSON.parse(ls.get('ahd-user')) :  false
  const isAuthenticated =  userStore ? !!userStore.user.token : false
  if(!isAuthenticated && authRequired){ 
    next('/register')
  }else{ 
    next()
  }
})

loadFonts()
createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
