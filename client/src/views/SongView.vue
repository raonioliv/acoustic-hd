<template>
    <v-container>
        <v-row>
            <v-col
                cols="12"
                md="6"
            >
                <song-info :song="song" />
            </v-col>
            <v-col
                cols="12"
                md="6"
            >
                <song-player :song="song"></song-player>
            </v-col>
        </v-row>

        <v-row>
            <v-col
                cols="12"
                md="6"
            >
                <song-tab :song="song"></song-tab>
            </v-col>
            <v-col
                cols="12"
                md="6"
            >
                <song-lyrics :song="song"></song-lyrics>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import SongInfo from '../components/SongView/SongInfo.vue'
import SongLyrics from '../components/SongView/SongLyrics.vue'
import SongPlayer from '../components/SongView/SongPlayer.vue'
import SongTab from '../components/SongView/SongTab.vue'
import SongsService from '../services/SongsService'
import HistoryService from '../services/HistoryService'
export default {
  components: { SongInfo, SongPlayer, SongTab, SongLyrics },
    data(){
        return { 
            song: {}
        }
    },
    methods: { 
        async fetchSong(){ 
            try {
                const songId = this.$route.params.songId
                const response = await SongsService.show(songId) 
                this.song = response.data.song
            } catch (error) {
                this.error = error.response
            } 
            
        }, 
        async postHistory(){ 
            try {
                await HistoryService.post(this.$route.params.songId)
            } catch (error) {
                console.log(error)
            }
        }
    },
    mounted(){ 
        this.fetchSong()
        this.postHistory()
    }
}
</script>