<template>
    <content-panel
        title="Música"
        prepend-icon-header="mdi-music"
        title-uppercase
    > 
      <v-container>
        <v-row>
            <v-col cols="12" sm="6">
              <v-img :src="song.albumImageUrl"></v-img>
            </v-col>
            <v-col cols="12" sm="6">
              <h1 class="song-title font-weight-bold">{{song.title}}</h1>
              <p>{{song.artist}}</p>
              <p>Álbum: {{song.album}}</p>
              <p>Gênero: {{song.genre}}</p>

              <v-divider class="my-3"></v-divider>

              <div class="d-flex justify-space-between">
                <v-btn
                  prepend-icon="mdi-star"
                >
                  Favoritar
                </v-btn>
                <v-btn
                  prepend-icon="mdi-pencil"
                >
                  Editar
                </v-btn>
              </div>
            </v-col>
        </v-row>
      </v-container>
    </content-panel>
</template>

<script>
import ContentPanel from "../reusable/ContentPanel.vue"

export default {
  components: { ContentPanel },

  props: { 
    song: { 
        required: true,
        type: Object
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