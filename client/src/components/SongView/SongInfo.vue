<template>
<section>
      <content-panel
        title="Música"
        prepend-icon-header="mdi-music"
        title-uppercase
    > 
      <v-container>
        <v-row>
            <v-col cols="12" lg="6">
              <v-img 
                :alt="`Capa do álbum ${song.album}`"
                :src="song.albumImageUrl">
              </v-img>
            </v-col>
            <v-col cols="12" lg="6">
              <h1 class="song-title font-weight-bold">{{song.title}}</h1>
              <p>{{song.artist}}</p>
              <p>Álbum: {{song.album}}</p>
              <p>Gênero: {{song.genre}}</p>

              <v-divider class="my-3"></v-divider>

              <div class="d-flex justify-space-between">
                <v-btn
                  color="primary"
                  v-if="isAuthenticated && !isBookmark"
                  prepend-icon="mdi-star-outline"
                  @click="setAsBookmark"
                >
                  Favoritar
                </v-btn>
                <v-btn
                  color="primary"
                  v-if="isAuthenticated && isBookmark"
                  prepend-icon="mdi-star"
                  @click="unsetAsBookmark"
                >
                  Desfavoritar
                </v-btn>
                <!-- <v-btn
                  v-if="isAuthenticated"
                  prepend-icon="mdi-pencil"
                >
                  Editar
                </v-btn> -->
              </div>
            </v-col>
        </v-row>
      </v-container>
    </content-panel>
</section>
</template>

<script>
import ContentPanel from "../reusable/ContentPanel.vue"
import BookmarkService from '@/services/BookmarkService'
import { mapGetters } from 'vuex'
export default {
  components: { ContentPanel },
  data(){ 
    return { 
      isBookmark: null
    }
  },
  props: { 
    song: { 
        required: true,
        type: Object
    }
  },
  computed: { 
    ...mapGetters('user', ['isAuthenticated'])
  },
  watch: {
    async song(){ 
      try {
        const res = await BookmarkService.index({songId: this.song.id})
        this.isBookmark = res.data.bookmarks[0]
      } catch (error) {
        console.log(error.response);      
      }
    }
  },
  methods: { 
    async setAsBookmark(){ 
      try {
        const res = await BookmarkService.post({songId: this.song.id})
        this.isBookmark = res.data.bookmark

      } catch (error) {
        console.log(error.response);
      }
    },
    async unsetAsBookmark(){
      try {
        const res = await BookmarkService.delete({songId: this.song.id})
        this.isBookmark = res.data.bookmarks[0]
      } catch (error) {
        console.log(error.response);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.song-title { 
    font-size: 22px;
}
p{ 
  margin: 1em 0;
}
</style>