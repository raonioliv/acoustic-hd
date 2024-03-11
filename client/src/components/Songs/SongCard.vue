<template >
    <v-hover  v-slot="{isHovering, props}" >
        <v-card
            @click="goToSong"
            :class="{ 
                'on-hover': isHovering
            }"
            v-bind="props"
            
        >
            <v-img
                :src="song.albumImageUrl"
            >
            </v-img>
            <v-card-title 
                :title="song.title"
                class="font-weight-bold">{{ song.title }}</v-card-title>
            <v-card-subtitle class="font-weight-bold mb-3">{{ song.artist }}</v-card-subtitle>

            <v-card-actions>
                <!-- <v-spacer></v-spacer>
                <v-btn icon="mdi-heart-outline"></v-btn>
                <v-menu >
                    <template v-slot:activator="{ props }">
                        <v-btn
                            icon
                            v-bind="props"
                        >
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                        <v-menu>

                        </v-menu>
                    </template>
                    <v-list>
                        <v-list-item class="pa-0">
                            <v-btn block variant="text">
                                Editar
                            </v-btn>
                        </v-list-item>
                        <v-list-item class="pa-0" >
                            <v-btn 
                                @click="deleteSong"
                                block 
                                variant="text">
                                Deletar
                            </v-btn>
                            
                        </v-list-item>
                    </v-list>
                </v-menu> -->
            </v-card-actions>
        </v-card>
    </v-hover>
</template>

<script>
import SongsService from '@/services/SongsService'
import { mapGetters } from 'vuex'
export default {
    props: { 
        song: { 
            type: Object, 
            required: true, 
        }
    }, 
    computed: {
        ...mapGetters('user', ['user'])
    }, 
    emits: [
        'songDeleted'
    ],
    methods: { 
        goToSong(){ 
            this.$router.push(`/songs/${this.song.id}`)
        }, 
        async deleteSong(){ 
            try {
              await SongsService.delete(this.song.id)
              this.$emit('songDeleted')
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .v-card{ 
        transition: .2 ease-in-out;
    }
    .v-card.on-hover{ 
        transform: scale(1.01);
    }
</style>