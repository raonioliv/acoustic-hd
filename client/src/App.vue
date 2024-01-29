<template>
    <v-app>
      <app-header />
      <v-container class="fill-height">
        <v-main class="pa-0">
          <router-view/>
        </v-main>
      </v-container>
  </v-app>
</template>

<script>

import '@/scss/global.scss'
import AppHeader from '@/components/AppHeader'
export default {
  name: 'App',
  components: { 
    AppHeader
  },

  mounted(){ 
    this.$store.dispatch('tracker/begin')
  }
}
</script>
