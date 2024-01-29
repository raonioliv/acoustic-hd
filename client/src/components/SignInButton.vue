<template>
    <div class="d-flex align-center">
        <v-btn 
            color="secondary"
            height="40px"
            :variant="variant"
            class="d-none d-md-block font-weight-bold"
            v-if="!isAuthenticated"
            @click="goToRoute({name: '/register'}, true)">

            Entrar
        </v-btn>
    </div>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
    computed: { 
        ...mapGetters('user', ['isAuthenticated']),
        ...mapGetters('theme', ['theme']),

        variant() { 
            return this.theme === 'dark'  ? 'text' : 'flat'
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
        }
    }
}
</script>