<template>
    <div class="loginUser">
        <form
            @submit.prevent="login"
            :class="theme">
            <div class="form-group outlinedInput mb-3">
                <input 
                    v-model="userLogin"
                    :class="{ 
                        'is-invalid': error
                    }"
                    class="form-control" 
                    id="userLogin" />
                <label for="userLogin" class="form-label">Email</label>
                <!-- <div v-text="errors['email']?.msg" class="invalid-feedback"></div> -->
            </div>
            <div class="form-group outlinedInput password">
                <input 
                    v-model="userPassword"
                    :class="{ 
                        'is-invalid': error
                    }"
                    :type="passwordState" 
                    id="userPassword" 
                    class="form-control" />
                <i :class="passPreview" class="passPreview" @click="togglePasswordPreview"></i>
                <label for="userPassword" class="form-label">Senha</label>
                <div class="invalid-feedback invisible" v-text="error"></div>
            </div>
            <div :class="theme" class="login-errors error">
                <p v-text="error" class="mb-3"></p>
            </div>
            <div class="btn-group">
                <button 
                    type="submit"
                    class="btn btn-primary btn-shine w-100">
                    Entrar
                </button>
            </div>
        </form>
    </div>
</template>


<script>
import AuthenticationService from '@/services/AuthenticationService'
import { mapGetters } from 'vuex';
export default { 
    name: 'LoginUser', 

    props: { 
        theme: { 
            type: String
        }
    },
    computed: {
        ...mapGetters('user', { 
            token: 'token'
        }),
        passPreview(){ 
            return { 
                open: this.passwordState === 'text',
                closed: this.passwordState === 'password',
                dark: this.theme === 'dark'
            }        
        }
    },
    methods: { 
        async login() { 
            try {                
                const res = await AuthenticationService.login({ 
                    email: this.userLogin,
                    password: this.userPassword
                }) 

                this.$store.dispatch('user/setToken', res.data.token )
                this.$store.dispatch('user/setUser', res.data.user )
                this.$store.dispatch('user/setIsAuthenticated', true )
            } catch (error) {
                this.error = error.response.data.msg          
            }
        }, 
        togglePasswordPreview() { 
            if(this.passwordState == 'password') {
                this.passwordState = 'text'
            }else{ 
                this.passwordState = 'password'
            }
        }
    }
}
</script>

<style lang="scss">

</style>