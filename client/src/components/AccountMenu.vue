<template>
    <div class="d-none d-md-flex align-center">
        <v-avatar
            color="cyan"
        >
            {{user.initials}}
        </v-avatar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: { 
        ...mapGetters('user', ['user'])
    }
}
</script>
