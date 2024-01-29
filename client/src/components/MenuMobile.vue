<template>
    <div>
        <v-app-bar-nav-icon
            height="100%" 
            variant="text" 
            @click.stop="drawer = !drawer">
        </v-app-bar-nav-icon>
        <v-navigation-drawer
            class="d-md-none"
            v-model="drawer"
            location="right"
            :color="theme === 'light' ? 'primary' : 'background' "
        > 
        <v-list-item
            v-if="isAuthenticated"
            class="py-3"
            :title="userName"
        >
            <template v-slot:append>
                <v-avatar
                    color="cyan"
                >
                    {{user.initials}}
                </v-avatar>
            </template>
            <template v-slot:prepend>
                <v-btn
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

        <v-divider></v-divider>

        </v-navigation-drawer>
    </div>
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