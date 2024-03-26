<template>
    <v-dialog
        max-width="500px"
        :model-value="state.dialog"
        @update:modelValue="state.dialog = false"
    >
        <template v-slot:activator>
            <v-btn
                @click="state.dialog = true"
                variant="elevated"
                prepend-icon="mdi-pencil"
            >
                Editar
            </v-btn>
        </template>
        <template v-slot:default>
            <v-card class="pa-3">
                <v-card-title class="py-5">
                    <v-btn 
                        @click="state.dialog = false"
                        aria-label="Fechar edição de perfil" 
                        class="close-dialog" 
                        variant="plain" 
                        icon="mdi-close"></v-btn>
                    <v-icon icon="mdi-pencil"></v-icon>    
                    &nbsp; Editar perfil

                    <v-spacer></v-spacer>


                </v-card-title>
                <v-form @submit.prevent="submit" >
                    <v-row>
                        <v-col class="py-0 mb-1" cols="12" md="6">
                            <v-text-field
                                v-model="firstName.value.value"
                                :error-messages="firstName.errorMessage.value"
                                density="compact"
                                variant="solo-filled"
                                single-line
                                label="Nome"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col class="py-0 mb-1">
                            <v-text-field
                                v-model="lastName.value.value"
                                :error-messages="lastName.errorMessage.value"
                                variant="solo-filled"
                                density="compact"
                                label="Sobrenome"
                                single-line
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col class="py-0 mb-1">
                            <v-text-field
                                v-model="email.value.value"
                                :error-messages="email.errorMessage.value"
                                variant="solo-filled"
                                density="compact"
                                label="Email"
                                single-line
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="py-0 mb-1">
                            <v-text-field
                                v-model="new_password.value.value"
                                :type="state.passwordState"
                                variant="solo-filled"
                                density="compact"
                                label="Nova senha"
                                single-line
                            >
                                <template v-slot:append-inner>
                                    <v-btn
                                        class="pe-0"
                                        rounded
                                        :icon="state.passwordState == 'password' ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                                        @click.prevent="state.passwordState == 'password'? state.passwordState = 'text' : state.passwordState = 'password'"
                                        variant="plain"
                                        :ripple="false"
                                        size="small"
                                    >
                                        
                                    </v-btn>
                                </template>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="py-0 mb-1">
                            <v-expand-transition>
                                <v-text-field
                                    class="pt-0"
                                    v-show="editingPassword"
                                    v-model="new_password_repeat.value.value"
                                    :type="state.passwordStateConfirm"
                                    :error-messages="new_password_repeat.errorMessage.value"
                                    variant="solo-filled"
                                    density="compact"
                                    label="Confirme a nova senha"
                                    single-line
                                >
                                    <template v-slot:append-inner>
                                        <v-btn
                                            class="pe-0"
                                            rounded
                                            :icon="state.passwordStateConfirm == 'password' ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                                            @click.prevent="state.passwordStateConfirm == 'password'? state.passwordStateConfirm = 'text' : state.passwordStateConfirm = 'password'"
                                            variant="plain"
                                            :ripple="false"
                                            size="small"
                                        >
                                            
                                        </v-btn>
                                    </template>
                                </v-text-field>
                            </v-expand-transition>
                        </v-col>
                    </v-row>
                    <v-divider class="my-3"></v-divider>
                    <v-card-actions class="pa-0">
                        <v-row>
                            <v-col cols="12" md="8">
                                <p class="mb-3">Insira sua senha para continuar</p>
                                <v-text-field
                                    type="password"
                                    v-model="password.value.value"
                                    variant="solo-filled"
                                    density="compact"
                                    single-line
                                    hide-details="auto"
                                >
                                </v-text-field>
                            </v-col>

                            <v-col class="d-flex align-end">
                                <v-btn
                                    :loading="state.loading"
                                    type="submit"
                                    block
                                    variant="elevated"
                                    color="primary"
                                >
                                    Enviar
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                    <p class="error-password" v-text="password.errorMessage.value"></p>
                </v-form>
            </v-card>
        </template>
    </v-dialog>
</template>


<script setup>
/*eslint-disable */
import { useForm, useField } from 'vee-validate' 
import { computed, onMounted, reactive, ref, useSlots, watch } from 'vue'
import ProfileService from '@/services/ProfileService'
import { useStore } from 'vuex'
const store = useStore()
const validationSchema = { 
    firstName: value => { 
        if(!value) return 'Nome obrigatório'
        if(!value.match(/^[a-zA-Z\s-']+$/)) return 'Insira um nome válido'
        return true
    },
    lastName: value => { 
        if(!value) return 'Sobrenome obrigatório'
        if(!value.match(/^[a-zA-Z\s-']+$/)) return 'Insira um sobrenome válido'
        return true
    }, 
    email: value => { 
        if(!value) return 'Email obrigatório'
        if(!value.match(/^[\w\.\-\+]+@[a-zA-Z\d\.\-]+\.[a-zA-Z]{2,}$/)) return 'Insira um email válido'
        return true
    }, 
    password: value => { 
        if(!value) return 'Insira sua senha para alterar os dados!'
        return true
    }
        
}
const state = reactive({ 
    loading: false, 
    dialog: false, 
    passwordState: 'password', 
    passwordStateConfirm: 'password'
})
const { handleSubmit, handleReset, setErrors } = useForm({ 
    validationSchema: validationSchema
})

const user = computed(() => store.getters['user/user'])
const firstName = useField('firstName')
const lastName = useField('lastName')
const email = useField('email')
const new_password = useField('new_password')
const new_password_repeat = useField('new_password_repeat')
const password = useField('password')
const editingPassword = ref(false)
watch(
    [
        () => new_password.value.value, 
        () => new_password_repeat.value.value
    ],
    (newVal, oldVal) => { 
        if(!newVal[0]){ 
            editingPassword.value = false
            delete validationSchema.new_password
            delete validationSchema.new_password_repeat
        }else{ 
            editingPassword.value = true
            validationSchema.new_password_repeat = value => { 
                if(!value) return 'Confirme a nova senha'
                return true
            }
            validationSchema.new_password = value => { 
                if(!value) return 'Insira a nova senha'
                return true
            }
        }
    }, 
)
const comparePassword = (pass, pass_repeat) => pass === pass_repeat

const submit = handleSubmit(values => {

    const isPassowrdsEqual = comparePassword(new_password.value.value, new_password_repeat.value.value)
    if(!isPassowrdsEqual) { 
        new_password_repeat.setErrors('As senhas não coincidem')
        return 
    }
    submitProfile({ 
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email,
        new_password: values.new_password,
        new_password_repeat: values.new_password_repeat,
        password: values.password
    })
    
})

const submitProfile = async (profile) => { 
    state.loading = true
    try {
        const res = (await ProfileService.editProfile(profile)).data
        store.commit('user/setUser', res.user)
        state.dialog = false
    } catch (error) {
        const errors = error.response.data.errors
        setErrors(errors)
    }
    state.loading = false
}

onMounted(() => { 
    firstName.setValue(user.value.firstName)
    lastName.setValue(user.value.lastName)
    email.setValue(user.value.email)
})
</script>

<style lang="scss" scoped>
.close-dialog{ 
    position: absolute;
    right: 0%;
    top: 0%;
}
.error-password{ 
    color: red;
    margin-top: 5px;
    font-size: 14px;
}
</style>