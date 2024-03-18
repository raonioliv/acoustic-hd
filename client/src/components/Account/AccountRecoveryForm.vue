<template>

    <v-dialog max-width="600px" v-model="resetPassword">
        <template v-slot:activator>
            <a 
                :class="{ 
                    dark: theme === 'dark'
                }"
                @click="resetPassword = !resetPassword"
                class="reset-password d-block mb-3 text-center" 
                href="#">Esqueci minha senha
            </a>
        </template>
        <v-card class="pa-3">
            <v-card-title>Recuperar senha</v-card-title>
            <v-card-subtitle class="sub-title">Insira seu email para receber o link de recuperação de senha.</v-card-subtitle>
            <v-form @submit.prevent="sendResetPasswordEmail" class="px-3 mt-5">
                <v-text-field
                    v-if="!success"
                    v-model="email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    :error-messages="error"
                >

                </v-text-field>
                <div
                    :class="{ 
                        dark: theme === 'dark'
                    }" 
                    class="successMsg d-flex align-center" v-if="success">
                    <v-icon icon="mdi-check-bold"></v-icon>
                    <span >{{success}}</span>
                </div>
                <v-card-actions 
                    class="d-flex justify-end">
                    <v-btn
                        v-if="!success"
                        color="primary"
                        elevated
                        height="40px"
                        width="100px"
                        variant="elevated"
                        type="submit"
                        :loading="loading"
                    >
                        Enviar
                    </v-btn>
                    <v-btn
                        v-else
                        color="primary"
                        elevated
                        height="40px"
                        width="100px"
                        variant="elevated"
                        @click="resetPassword = false"
                    >
                        Ok
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>
<script>
import ProfileService from '@/services/ProfileService'
export default {

    data(){ 
        return { 
            email: '', 
            error: '',
            loading: false, 
            success: '', 
            resetPassword: false
        }
        
    }, 
    methods: { 
        async sendResetPasswordEmail(){ 
            this.loading = true
            try {
                await ProfileService.resetPassword(this.email)
                this.success = 'Email enviado! Confira sua caixa de mensagens.'
            } catch (error) {
                console.log(error);
                this.error = error.response.data.msg
            }
            this.loading = false
        }
    }
}
</script>
<style lang="scss" >
    .sub-title{ 
        text-overflow: unset;
        white-space: wrap;
    }

    .successMsg { 
        span,  i{ 
            color: rgb(49, 183, 49);
        }
    }

</style>