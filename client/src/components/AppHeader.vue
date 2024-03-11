<template>
    <v-toolbar :color="theme === 'dark' ? 'background' : 'primary'">
        <v-toolbar-items class="cursor-pointer">
            <router-link class="pa-2" to="/">
                <v-img 
                    aria-label="Clique para ir para a home."
                    alt="Logo AcousticHD"
                    role="button"
                    width="170px" 
                    src="@/assets/faceMelter.png">
                </v-img>
            </router-link>

        </v-toolbar-items>
        <v-spacer></v-spacer>
        <menu-desktop></menu-desktop>
        <menu-mobile class="d-flex align-center py-0 d-md-none"></menu-mobile>
    </v-toolbar>
</template>

<script>
import MenuMobile from './MenuMobile.vue'
import MenuDesktop from './MenuDesktop.vue'
import { mapGetters } from 'vuex'
export default {
    components: { 
        MenuMobile,
        MenuDesktop,
    },
    computed: { 
        ...mapGetters('theme', ['theme']),
    },
}


</script>

<style lang="scss">
    .v-navigation-drawer__scrim{ 
        background: none;
    }

</style>