<template>
    <v-form @submit.prevent="submit"> 
        <v-row>
            <v-col cols="12" sm="6">
                <v-text-field
                    hide-details="auto"
                    class="mt-3"
                    type="password"
                    v-model="new_password.value.value"
                    :error-messages="new_password.errorMessage.value"
                    variant="outlined"
                    label="Nova senha"
                >

                </v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
                <v-text-field
                    class="mt-3"
                    type="password"
                    v-model="new_password_repeat.value.value"
                    :error-messages="new_password_repeat.errorMessage.value"
                    variant="outlined"
                    label="Confirme a nova senha"
                >
                </v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <p>{{state.error}}</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn
                    type="submit"
                    :loading="state.loading"
                    width="200px"
                    variant="elevated"
                    color="primary"
                >
                    Enviar
                </v-btn>
            </v-col>
        </v-row>
    
    </v-form>

</template>

<script setup>
import ProfileService from '@/services/ProfileService'
import { useField, useForm } from 'vee-validate'
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const state = reactive({ 
        error: '', 
        loading: false

    })
    const schema = { 
        new_password: value => { 
            if(!value) return 'Insira uma senha'
            return true
        },
        new_password_repeat: value => { 
            if(!value) return 'Confirme a nova senha'
            return true
        },
    }
    const { handleSubmit, setErrors } = useForm({ 
    validationSchema: schema
    })
    const new_password = useField('new_password')
    const new_password_repeat = useField('new_password_repeat')

    const comparePassword = (pass, pass_repeat) => pass === pass_repeat
    const submit  = handleSubmit(values => { 
        state.loading = true
        const isPasswordsEqual = comparePassword(values.new_password, values.new_password_repeat)
        if(!isPasswordsEqual){ 
            setErrors({new_password_repeat:'As senhas não coincidem'})
            return 
        }
        submitNewPassword({
            new_password: values.new_password,
            new_password_repeat: values.new_password_repeat
        })
        state.loading = false
    })

    const submitNewPassword = async (values) => { 
        try {
            const data = (await ProfileService.submitNewPassword({ 
                new_password: values.new_password,
                new_password_repeat: values.new_password_repeat,
                temporaryToken: route.query.token,
            })).data
            store.dispatch('user/authenticateUser', { 
                user: data.user, 
                token: data.token
            })
            router.push('/profile')
        } catch (err) {
            state.error = err.response.data.msg
        }
    }
</script>
