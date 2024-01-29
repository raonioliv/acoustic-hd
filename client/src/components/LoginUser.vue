<template>
    <form
        @submit.prevent="login">
        <c-input
            v-model="email"
            label="Email"
            type="email"
            placeholder="john_doe@meudominio.com"
            :error="error"

        />
        <c-input
            v-model="password"
            label="Senha"
            type="password"
            :error="error"

        />

        <v-btn 
            type="submit"
            block
            :loading="loading"
            class="font-weight-bold"
            color="primary"
        >
            Entrar
        </v-btn>

        <div class="invalid-feedback">{{ error }}</div>
    </form>
</template>


<script>
import AuthenticationService from '@/services/AuthenticationService'
import { mapGetters } from 'vuex';
import CInput from './reusable/CInput.vue';
export default {
  components: { CInput }, 

    data(){
        return { 
            email: '',
            password: '', 
            error: ''
        }
    },
    props: { 
        theme: { 
            type: String
        }
    },
    computed: {
        ...mapGetters('user', { 
            token: 'token', 
            loading: 'loading'
        }),
    },
    methods: { 
        async login() { 
            this.$store.commit('user/setLoading', true)
            this.error = ''
            try {                
                const res = await AuthenticationService.login({ 
                    email: this.email,
                    password: this.password
                }) 
                this.$store.dispatch('user/authenticateUser', res.data)
                this.$router.push('/home')
            } catch (error) {
                this.error = error.response.data.msg          
            }
            this.$store.commit('user/setLoading', false)
        }, 
    }
}
</script>
