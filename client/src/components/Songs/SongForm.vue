<template>
    <v-form @submit.prevent="createSong">
        <v-row>
            <v-col cols="12" md="4">
                <content-panel
                    title="Dados da música"
                >
                        <v-text-field
                            :rules="[
                                value => !!value
                            ]" 
                            v-model="song.title"
                            label="Nome"
                        />
                        <v-text-field 
                            :rules="[
                                value => !!value
                            ]"
                            v-model="song.artist"
                            label="Artista"
                        />
                        <v-text-field 
                            :rules="[
                                value => !!value
                            ]"
                            v-model="song.genre"
                            label="Gênero"
                        />
                        <v-text-field 
                            :rules="[
                                value => !!value
                            ]"
                            v-model="song.album"
                            label="Álbum"
                        />
                        <v-text-field 
                            :rules="[
                                value => !!value
                            ]"
                            v-model="song.albumImageUrl"
                            label="Imagem do álbum (URL)"
                        />
                        <v-text-field 
                            :rules="[
                                value => !!value
                            ]"
                            v-model="song.youtubeId"
                            label="ID youtube"
                        />
                </content-panel>
            </v-col>
            <v-col cols="12" md="8">
                <content-panel
                    title="Estrutura musical"
                >
                    <v-textarea 
                        :rules="[
                                value => !!value
                        ]"
                        rows="7"
                        v-model="song.lyrics"
                        label="Letra"
                    />
                    <v-textarea 
                        :rules="[
                            value => !!value
                        ]"
                        rows="7"
                        v-model="song.tab"
                        label="Cifra"
                    />
                </content-panel>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="d-flex justify-center justify-md-end mx-5">
                <v-btn
                    :loading="loading"
                    type="submit"
                    class="font-weight-bold"
                    color="primary"
                    height="60px"
                    min-width="300px"
                    max-width="400px"
                >
                    Enviar
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>

<script>
import ContentPanel from '@/components/reusable/ContentPanel.vue'
import SongsService from '@/services/SongsService'
export default {
    data(){ 
        return { 
            song: { 
                title: '',
                artist: '',
                genre: '',
                album: '',
                albumImageUrl: '',
                youtubeId: '',
                lyrics: '',
                tab: ''
            }, 
            error: null,
            loading: false
        }
    },
    components: { 
        ContentPanel
    }, 
    methods: { 
        async createSong(){ 
            this.error = null
            this.loading = true
            const allFieldsFilled = Object
                .keys(this.song)
                .every(key => !!this.song[key])

                if(!allFieldsFilled){ 
                    this.error = "Preencha todos os campos."
                    this.loading = false
                    return
                }
            try {
                await SongsService.post(this.song)
                this.$router.push('/songs')
            } catch (error) {
                this.error = error.response
            }
            this.loading = false
        }
    }
}
</script>