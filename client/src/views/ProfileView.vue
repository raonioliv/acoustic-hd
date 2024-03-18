<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card max-width="460px" class="pa-3">
                    <div class="d-flex">
                        <v-avatar
                            size="large"
                            :color="avatarColor"
                        >
                            {{user.initials}}
                        </v-avatar>
                        <v-card-title class="font-weight-bold">{{user.firstName}} {{user.lastName}}</v-card-title>
                    </div>
                    <v-card-subtitle class="px-0 mt-3">{{user.email}}</v-card-subtitle>
                    <v-card-subtitle class="px-0 mt-3">{{memberSince}}</v-card-subtitle>
                    <v-card-actions class="justify-end">
                        <edit-profile />
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
// import ProfileService from '@/services/ProfileService'
import { mapGetters } from 'vuex'
import EditProfile from '../components/Account/EditProfile.vue'
export default {
  components: { EditProfile },
    
    data(){ 
        return { 
            profile: {}, 
            error: null
        }
    },
    computed:{ 
        ...mapGetters('user', ['avatarColor', 'user']), 

        memberSince(){ 
            return `Membro desde ${this.user.createdAt?.split('-')[0]}`
        }
    }
}
</script>