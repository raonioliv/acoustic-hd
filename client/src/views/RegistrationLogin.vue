<template>  
  <v-container class="fill-height">
    <v-row align="center" v-if="!isAuthenticated" justify="center">
      <div class="tabs-container">
        <v-tabs

          v-model="activeTab"
          fixed-tabs
          :bg-color="tabBg"
          class="v-tab"
          slider-color="white"
          border="1px solid red"
        >
        <v-tab
          class="font-weight-bold"
          :class="{ 
            'selected-tab': activeTab === tab
          }"
          v-for="(tab, index) in tabs"
          :key="index"
          :value="tab"
        >
          {{ tab }}
        </v-tab>
        </v-tabs>

        <v-window 
          class="pa-2 mt-3"
          v-model="activeTab">
          <v-window-item value="cadastro">
            <register-user></register-user>
          </v-window-item>
          <v-window-item value="login">
            <login-user></login-user>
          </v-window-item>
        </v-window>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import LoginUser from '../components/LoginUser.vue'
import RegisterUser from '../components/RegisterUser.vue'
export default {
  components: { RegisterUser, LoginUser },
  data(){ 
    return { 
      activeTab: '',
      tabs: ['cadastro', 'login']
    }
  },
  computed: { 
    ...mapGetters('theme', ['theme']), 
    ...mapGetters('user', ['isAuthenticated']), 
    tabBg(){ 
      return this.theme === 'dark' ? 'brand-red' : 'primary'
    },

  },
}
</script>

<style lang="scss">
  .tabs-container{ 
    width: 480px;
    min-height: 480px;

    @media (max-width: 500px){ 
      width: 100%;
      min-width: unset;
    }
  }
  .selected-tab{ 
    background-color: transparent;
  }
</style>