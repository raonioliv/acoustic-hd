<template>
        <div>
            <v-toolbar class="px-4 py-2" :color="theme === 'dark' ? 'background' : 'primary'">
                <v-toolbar-items class="cursor-pointer">
                    <router-link to="/">
                        <v-img 
                            width="180px" 
                            src="@/assets/faceMelter.png">
                        </v-img>
                    </router-link>
                </v-toolbar-items>
                <v-spacer></v-spacer>
                <v-toolbar-items class="w-50 justify-end">
                    <search-bar class="d-none d-md-flex"></search-bar>
                    <toggle-theme class="d-none d-md-flex align-center mr-3" />
                    <sign-in-button v-if="!isAuthenticated"></sign-in-button>
                    <account-menu v-else></account-menu>
                    <menu-mobile class="d-flex align-center py-3 d-md-none"></menu-mobile>
                </v-toolbar-items>


            </v-toolbar>
        </div>
</template>

<script>
import ToggleTheme from './ToggleTheme.vue'
import SearchBar from './SearchBar.vue'
import SignInButton from './SignInButton.vue'
import MenuMobile from './MenuMobile.vue'

import { mapGetters } from 'vuex'
import AccountMenu from './AccountMenu.vue'
export default {
    components: { 
        ToggleTheme,
        SignInButton,
        SearchBar,
        MenuMobile,
        AccountMenu
    },
    computed: { 
        ...mapGetters('user', { 
            isAuthenticated: 'isAuthenticated', 
            user: 'user', 
        }),
        ...mapGetters('theme', ['theme']),
    },
}


</script>

<style lang="scss">
    .v-navigation-drawer__scrim{ 
        background: none;
    }

</style>