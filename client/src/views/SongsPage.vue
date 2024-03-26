<template>
    <v-container>
        <v-row class="fill-height" align="start">
            <v-col>
                <content-panel
                    title-uppercase
                    title-bold
                    title="Músicas"
                >
                    <template v-if="isAuthenticated" v-slot:action>
                        <v-btn 
                            aria-label="Adicionar música nova"
                            variant="elevated" 
                            class="font-weight-bold"
                            :color="theme === 'dark' ? 'transparent' : 'white'" 
                            icon="mdi-plus"
                            to="/songs/create"
                            >
                        </v-btn>
                    </template>

                    <v-container>
                        <v-row align="start" justify="start">
                            <search-bar @update:modelValue="searchQuery => fetchSongs(searchQuery)" :search="searchQuery" class="w-100"/>
                        </v-row>
                        <v-row

                        >
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                                xl="2"
                                v-for="(song, index) in songs" 
                                :key="index"
                            >
                            <song-card 
                                @songDeleted="refreshSongs"
                                :song="song"  
                            />
                            </v-col>
                        </v-row>
                        <v-row >
                            <v-col class="d-flex justify-center">
                                <v-progress-circular
                                    v-if="loading"
                                    color="primary"
                                    size="100"
                                    indeterminate
                                    >
                                </v-progress-circular>
                            </v-col>
                        </v-row>
                        <v-row v-if="!songs.length && !loading">
                            <v-col>
                                <h1 class="text-no-songs text-center font-weight-bold pa-5">Nenhuma música encontrada :(</h1>
                            </v-col>
                        </v-row>
                    </v-container>
                </content-panel>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ContentPanel from '../components/reusable/ContentPanel.vue'
import SearchBar from '../components/SearchBar.vue'
import SongCard from '../components/Songs/SongCard.vue'
import SongsService from '../services/SongsService'
export default {
    components: { 
        ContentPanel,
        SongCard,
        SearchBar
    },
    data(){ 
        return { 
            songs: [], 
            searchQuery: '', 
            loading: false
        }
    },
    computed: {
        ...mapGetters('theme', ['theme']),
        ...mapGetters('user', ['isAuthenticated'])
    },
    emits: [
        'songDeleted'
    ],
    methods: { 
      async refreshSongs(){ 
        this.fetchSongs()
      },
      
      async fetchSongs(search){ 
        try {
            this.loading = true
            if(search){ 
                const response  = await SongsService.index(search)
                this.songs = response.data
            }else{ 
                const response  = await SongsService.index()
                this.songs = response.data
            }
        } catch (error) {
            this.error = error.response.data
        }
        this.loading = false
      }, 
    },
    async mounted(){ 
        this.fetchSongs()
    }, 
}
</script>

<style lang="scss">
.text-no-songs{ 
    font-size: 24px;
}
</style>