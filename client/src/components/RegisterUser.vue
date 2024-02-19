<template>
    <form 
        @submit.prevent="register" 
    >
        <div class="form-row">
            <c-input  
                id="firstName"
                required
                :error="errors['firstName']"
                label="Nome" 
                class="outlinedInput" 
                type="text" 
                v-model="userFirstName" /> 
            <c-input  
                id="lastName"
                required
                :error="errors['lastName']"
                label="Sobrenome" 
                class="outlinedInput" 
                type="text" 
                v-model="userLastName" /> 
        </div>
        <c-input  
            id="email"
            required
            :error="errors['email']"
            placeholder="john_doe@meudominio.com" 
            label="Email" 
            class="outlinedInput" 
            type="email" 
            v-model="email" /> 
        <c-input  
            id="password"
            required
            :error="errors['password']"
            label="Senha" 
            class="outlinedInput" 
            type="password" 
            v-model="password" /> 
        <c-input  
            id="repeat_password"
            required
            :error="errors['repeat_password']"
            label="Confirme a senha" 
            class="outlinedInput" 
            type="password" 
            v-model="passwordConfirm" /> 

        <v-btn
            :loading="loading"
            color="primary"
            block
            type="submit"
        >
            Enviar
        </v-btn>         
    </form>
</template>

<script>
import AuthenticationService  from '@/services/AuthenticationService';
import CInput from './reusable/CInput.vue';
import { mapGetters } from 'vuex';

export default {
  components: { CInput }, 
    name: 'RegisterUser', 
    data(){ 
        return { 
            userFirstName: '',
            userLastName: '',
            email: '',
            password: '', 
            passwordConfirm: '',
            errors: {}, 
            loading: false
        }
    },
    computed: { 
        ...mapGetters('user', ['loading']),

        initials(){ 
            return this.userFirstName.charAt(0).toUpperCase() + this.userLastName.charAt(0).toUpperCase() 
        }
    },
    methods: { 
        async register() { 
            this.loading = true
            this.errors = {}
            try {                
                const { data } = await AuthenticationService.register({ 
                    firstName: this.userFirstName, 
                    lastName: this.userLastName,
                    email: this.email,
                    password: this.password,
                    repeat_password: this.passwordConfirm, 
                    initials: this.initials
                    
                }) 

                this.$store.dispatch('user/authenticateUser', data)
                this.$router.push('/home')
            } catch (error) {
                this.errors = error.response.data.errors       
            }
            this.loading = false
        }, 
    }, 
}
</script>