<template>
    <form
        @submit.prevent="login">
        <c-input
            v-model="email"
            id="userLogin"
            label="Email"
            type="email"
            placeholder="john_doe@meudominio.com"
            :error="error"

        />
        <c-input
            v-model="password"
            label="Senha"
            id="userPassword"
            type="password"
            :error="error"

        />

        <account-recovery-form></account-recovery-form>
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
import CInput from '../reusable/CInput.vue';
import AccountRecoveryForm from './AccountRecoveryForm.vue';
export default {
  components: { CInput, AccountRecoveryForm }, 

    data(){
        return { 
            email: '',
            password: '', 
            error: '', 
            loading: false, 
        }
    },
    computed: {
        ...mapGetters('user', { 
            token: 'token', 
        }),
        ...mapGetters('theme', ['theme']),
    },
    methods: { 
        async login() { 
            this.loading = true
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
            this.loading = false
        }, 
    }
}
</script>
<style lang="scss" scoped>
.reset-password{ 
    color: #000080;
    text-decoration: none;
    &:hover{ 
        text-decoration: underline;
    }
    &.dark{ 
        color: white;
    }
}
</style>