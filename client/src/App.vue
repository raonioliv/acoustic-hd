<template>
    <v-app>
      <app-header />
      <v-container class="fill-height">
        <v-main class="pa-0 fill-height">
          <router-view></router-view>
        </v-main>
      </v-container>
  </v-app>
</template>

<script>
import '@/scss/global.scss'
import AppHeader from '@/components/AppHeader'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: { 
    AppHeader
  },
  computed: { 
    ...mapGetters('user', ['token'])
  }, 
  mounted(){ 
    this.$store.dispatch('tracker/begin')
  }
}
</script>
