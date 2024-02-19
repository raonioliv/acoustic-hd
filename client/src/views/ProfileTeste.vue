<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card max-width="460px" class="pa-3">
                    <div class="d-flex">
                        <v-avatar
                            size="large"
                            color="cyan"
                        >
                            {{profile.initials}}
                        </v-avatar>
                        <v-card-title class="font-weight-bold">{{profile.firstName}} {{profile.lastName}}</v-card-title>
                    </div>
                    <v-card-subtitle class="px-0 mt-3">{{profile.email}}</v-card-subtitle>
                    <v-card-actions class="justify-end">
                        <v-btn
                            variant="elevated"
                            prepend-icon="mdi-pencil"
                        >
                            Editar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
    
    data(){ 
        return { 
            profile: {}, 
            error: null
        }
    },
    async mounted(){ 
        try {
            const response = await AuthenticationService.profile()
            this.profile = response.data
        } catch (error) {
            this.error = error.response.data
            if(error.response.data.statusCode === 401){ 
                console.log('401');
                this.$router.push('/register')
            }
        }
    }
}
</script>