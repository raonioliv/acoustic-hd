<template>
    <v-container>
        <v-row>
          <v-col class="pa-0" cols="12" md="6">
            <h1 class="font-weight-bold text-h4">Redefina sua senha</h1>
            <p class="font-weight-bold text-h5">Olá, {{firstName}}!</p>
            <p>Bem-vindo de volta.</p>
            <p class="my-5 ">Insira a nova senha nos campos abaixo. Certifique-se de utilizar uma senha forte para sua segurança.</p>
            <reset-password-form class="my-5"></reset-password-form>
          </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ResetPasswordForm from '../components/Account/ResetPasswordForm.vue'
export default {
    components: { ResetPasswordForm },
    data(){ 
      return { 
        user: {}, 
        firstName: ''
      }
    },
    async mounted(){ 
      this.firstName = this.$route.query.username
    }, 

}
</script>