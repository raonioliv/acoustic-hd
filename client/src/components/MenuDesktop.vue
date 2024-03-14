<template>
    <v-toolbar-items>
        <nav class="d-none d-md-flex mr-6">
            <v-btn
                density="compact"
                variant="text"
                height="100%"
                @click="$router.push('/songs')"
            >
                Explorar
            </v-btn>
            <v-btn
                density="compact"
                variant="text"
                height="100%"
                @click="$router.push('/bookmarks')"
            >
                Favoritos
            </v-btn>
            <v-btn
                density="compact"
                variant="text"
                height="100%"
                @click="$router.push('/history')"
            >
                Recentes
            </v-btn>
            <!-- <v-btn
                density="compact"
                variant="text"
                height="100%"
                @click="$router.push('/songs')"
            >
                Listas
            </v-btn> -->
        </nav>      

        <toggle-theme class="d-none d-md-flex align-center mr-3" />
        <sign-in-button class="mr-3" v-if="!isAuthenticated"></sign-in-button>
        <account-menu v-else class="mr-3"></account-menu>
    </v-toolbar-items>
</template>

<script>
import { mapGetters } from 'vuex'
import AccountMenu from './AccountMenu.vue'
import SignInButton from './SignInButton.vue'
import ToggleTheme from './ToggleTheme.vue'
export default {
  components: {ToggleTheme, SignInButton, AccountMenu  },

  computed: { 
        ...mapGetters('user', { 
            isAuthenticated: 'isAuthenticated', 
            user: 'user', 
        }),
    }
    
}
</script>

