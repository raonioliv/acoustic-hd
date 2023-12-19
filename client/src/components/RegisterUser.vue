<template>
    <div class="registerUser">
        <div class="raoni">

        </div>
        <form 
            :class="{
                dark: theme === 'dark'
            }"
            @submit.prevent="register" 
            class="registration-form home-page">
            <h4 class="text-center"></h4>
            <div class="form-row">
                <div class="form-group outlinedInput" >
                    <input  
                        id="userFirstName" 
                        v-model="userFirstName" 
                        type="text" 
                        name="firstName"
                        class="form-control"
                        :class="{'is-invalid' : errors['firstName']}"
                    >
                    <label 
                        class="form-label" 
                        for="userFirstName">
                            Nome
                    </label>
                    <div v-text="errors['firstName']?.msg" class="invalid-feedback">
                        
                    </div>
                </div>
                <div class="form-group outlinedInput">
                    <input  
                        id="userLastName" 
                        v-model="userLastName" 
                        type="text" 
                        class="form-control"
                        name="lastName"
                        :class="{'is-invalid' : errors['lastName']}"
                        >
                    <label 
                        class="form-label" 
                        for="userLastName">
                        Sobrenome
                    </label>
                    <div v-text="errors['lastName']?.msg"  class="invalid-feedback"></div>
                </div>
            </div>
            <div class="form-group outlinedInput">
                <input 
                    type="text" 
                    id="emailInput" 
                    v-model="email" 
                    name="email" 
                    class="form-control"
                    :class="{'is-invalid' : errors['email']}"
                    >
                    
                <label 
                    class="form-label" 
                    for="emailInput">
                    Email
                </label>
                <div v-text="errors['email']?.msg"  class="invalid-feedback"></div>
            </div>
            <div class="form-group outlinedInput">
                
                <input 
                v-model="password" 
                :type="passwordState" 
                id="userPassword" 
                name="password"
                class="form-control"  
                :class="{'is-invalid' : errors['password']}"
                >
                <i :class="classObj" class="passPreview" @click="togglePasswordPreview"></i>
                <label 
                    class="form-label" 
                    for="userPassword">
                    Senha
                </label>
                <div v-text="errors['password']?.msg"  class="invalid-feedback"></div>
                
            </div>
            <div class="form-group outlinedInput">
                <input 
                    class="form-control"  
                    :type="passwordState" 
                    id="userPasswordConfirm" 
                    v-model="passwordConfirm" 
                    name="passwordConfirm"
                    :class="{'is-invalid' : errors['repeat_password']}"
                >
                <i :class="classObj" class="passPreview" @click="togglePasswordPreview"></i>
                <label 
                    class="form-label" 
                    for="userPasswordConfirm">
                    Confirme a senha 
                </label>
                <div v-text="errors['repeat_password']?.msg"  class="invalid-feedback"></div>
            </div>


            <div class="form-group">
                <button
                    class="btn btn-shine btn-primary w-100" 
                    type="submit">
                    Enviar
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import AuthenticationService  from '@/services/AuthenticationService';

export default { 
    name: 'RegisterUser', 
    data(){ 
        return { 
            userFirstName: '',
            userLastName: '',
            email: '',
            password: '', 
            passwordConfirm: '',
            errors: {},
            passwordState: 'password'
        }
    },
    props: { 
        theme: { 
            type: String
        }
    },

    computed: { 
        classObj(){ 
            return { 
                open: this.passwordState === 'text',
                closed: this.passwordState === 'password', 
                dark: this.theme === 'dark'
            }
        }
    },
    methods: { 
        async register() { 
            try {                
                await AuthenticationService.register({ 
                    firstName: this.userFirstName, 
                    lastName: this.userLastName,
                    email: this.email,
                    password: this.password,
                    repeat_password: this.passwordConfirm
                }) 
            } catch (error) {
                this.errors = error.response.data.errors       
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