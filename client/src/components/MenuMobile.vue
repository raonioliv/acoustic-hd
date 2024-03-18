<template>
    <v-toolbar-items>
        <v-app-bar-nav-icon
            aria-label="Abrir menu lateral"
            height="100%" 
            variant="text" 
            @click.stop="drawer = !drawer">
        </v-app-bar-nav-icon>
        <aside>
            <v-navigation-drawer
                class="d-md-none"
                v-model="drawer"
                location="right"
                :color="theme === 'light' ? 'primary' : 'background' "
            > 

                <v-list-item
                    v-if="isAuthenticated"
                    class="py-3"
                    
                >
                    <span class="ml-2">{{userName}}</span>
                    <template v-slot:append>
                        <v-avatar
                            color="cyan"
                        >
                            {{user.initials}}
                        </v-avatar>
                    </template>
                    <template v-slot:prepend>
                        <v-btn
                            aria-label="Fechar menu lateral"
                            class="py-2"
                            icon="mdi-chevron-left"
                            @click.stop="drawer = !drawer"
                        >

                        </v-btn>
                    </template>
                </v-list-item>
                <v-list-item
                    v-else
                    class="py-3 align-center"
                    
                >
                    <v-btn 
                        class="py-3"
                        @click="goToRoute({name: '/register'}, true)"
                    >
                        Entrar
                    </v-btn>
                    <template v-slot:prepend>
                        <v-btn
                            class="py-3"
                            icon="mdi-chevron-left"
                            @click.stop="drawer = !drawer"
                        >

                        </v-btn>
                    </template>
                </v-list-item>
            <v-divider></v-divider>
            <nav>
                <v-list nav>
                    <v-list-item
                        v-if="isAuthenticated"
                        to="/profile"
                        title="Minha conta"
                        prepend-icon="mdi-account"
                    >
                    </v-list-item>
                    <v-list-item
                        v-if="isAuthenticated"
                        to="/bookmarks"
                        title="Favoritos"
                        prepend-icon="mdi-star"
                    >
                    </v-list-item>
                    <v-list-item
                        to="/songs"
                        title="Explorar"
                        prepend-icon="mdi-compass"
                    >
                    </v-list-item>
                    <!-- <v-list-item
                        to="/lists"
                        title="Listas"
                        prepend-icon="mdi-playlist-music"
                    >
                    </v-list-item> -->
                </v-list>
            </nav>
            <template v-slot:append >
                <v-container >
                    <v-row justify="end">
                        <toggle-theme class="pa-2"></toggle-theme>
                    </v-row>
                    <v-row 
                        v-if="isAuthenticated"  
                        align="center" 
                        class="py-3">
                        <v-btn 
                            @click="logout"
                            :loading="loading"
                            color="brand-red" 
                            variant="flat" 
                            class="py-3"
                            block>
                            Logout
                        </v-btn>
                    </v-row>
                </v-container>
            </template>
            </v-navigation-drawer>
        </aside>
    </v-toolbar-items>
</template>

<script>
import { mapGetters } from 'vuex'
import ToggleTheme from './ToggleTheme.vue'

export default {
    data() {
        return { 
            drawer: false, 
            loading: false
        }
    },
    components: { ToggleTheme },

    computed: { 
        ...mapGetters('theme', ['theme']),
        ...mapGetters('user', ['isAuthenticated', 'user']),

        userName(){ 
            return this.user.firstName + ' ' + this.user.lastName
        }
    },
    methods: { 
        goToRoute(route, needValidation){ 
            var userAuthenticated = this.isAuthenticated
            if(needValidation === true && !userAuthenticated ){ 
                this.$router.push('register')
            }else{ 
                this.$router.push(route.name)
            }
        }, 
        logout(){
            this.loading = true
            this.$store.dispatch('user/logout')
            this.loading = false
        }
    }
}
</script>

<style scoped>

</style>