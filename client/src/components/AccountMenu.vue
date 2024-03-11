<template>
    <v-menu>
        <template v-slot:activator="{ props }">
            <v-btn
            icon
            aria-label="Menu"
            v-bind="props"
            class="d-none d-md-block mr-3"
            >
            <v-avatar
                :color="avatarColor"
            >
                <span class="text-h5">{{ user.initials }}</span>
            </v-avatar>
            </v-btn>
        </template>
        <nav class="bg-white text-center">
            <h3>{{ user.fullName }}</h3>
            <p class="text-caption mt-1 py-2">
            {{ user.email }}
            </p>
            <v-divider></v-divider>
            <v-btn
            @click="goToRoute({name: '/profile'}, true)"
            block
            variant="text"
            class="py-3"
            >
            Minha conta
            </v-btn>
            <v-divider></v-divider>
            <v-btn
            block
            variant="text"
            class="py-3"
            @click="logout"
            >
            Sair
            </v-btn>
        </nav>
    </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
    computed: { 
        ...mapGetters('user', ['user', 'isAuthenticated', 'avatarColor'])
    },

    methods: { 
        logout(){
            this.loading = true
            this.$store.dispatch('user/logout')
            this.loading = false
        },

        goToRoute(route, needsValidation){ 
            if(needsValidation && !this.isAuthenticated){ 
                this.$router.push('/register')
            }else{ 
                this.$router.push(route.name)
            }
        }, 

    }
}
</script>