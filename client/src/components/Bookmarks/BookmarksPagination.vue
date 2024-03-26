<template>
    <v-container>
        <v-row>
            <v-col 
            md="6"
            cols="12">
                <v-card
                    flat
                >

                </v-card>
                <v-data-table
                    :search="search"
                    :page="page"
                    class="pa-3"
                    items-per-page-text="Mostrar"
                    :items-per-page="itemsPerPage"
                    :items="bookmarks"
                    hide-no-data
                    :loading="loading"
                >   
                    <template v-slot:headers>
                        <v-card-title class="px-0">
                            <v-icon icon="mdi-music"></v-icon> &nbsp;
                            <span class="font-weight-bold">Encontrar favoritos</span>
                            <v-spacer></v-spacer>
                            <v-text-field
                                v-model="search"
                                variant="solo-filled"
                                class="mt-3"
                                prepend-inner-icon="mdi-magnify"
                                density="compact"
                                flat
                                label="Procurar"
                                single-line
                                hide-details
                            >

                            </v-text-field>
                        </v-card-title>
                    </template>

                    
                    <template v-slot:item="{item}">
                        <tr 
                            :class="{ 
                                'dark': theme === 'dark',
                                'selected': selectedBookmark === item.id
                            }" 
                            class="bookmark-data">
                            <v-card 
                                @click="selectedBookmark = item.id"
                                flat
                                class="bookmark-card">
                                <v-card-title class="py-0">{{item.title}}</v-card-title>
                                <v-card-subtitle>{{item.artist}}</v-card-subtitle>
                            </v-card>
                        </tr>
                    </template>

                    <template v-slot:bottom>
                        <v-pagination
                            v-model="page"
                            @update:modelValue="ev => console.log(ev)"
                            :length="pageCount"
                        >
                        </v-pagination>
                    </template>
                </v-data-table>
            </v-col>
            <v-col>
                <v-card class="pa-3" v-if="displayedSong" :loading="loading">
                    <v-row>
                        <v-col
                            md="6"
                            cols="12"
                        >
                            <v-img :src="displayedSong.albumImageUrl"></v-img>
                        </v-col>
                        <v-col>
                            <v-card-title>{{displayedSong.title}}</v-card-title>
                            <v-card-subtitle><strong>Artista: </strong>{{displayedSong.artist}}</v-card-subtitle>
                            <v-card-subtitle><strong>Álbum: </strong>{{displayedSong.album}}</v-card-subtitle>
                            <v-card-subtitle><strong>Gênero: </strong>{{displayedSong.genre}}</v-card-subtitle>
                            <v-divider class="my-3"></v-divider>
                            <v-btn
                                color="primary"
                                @click="() => unsetAsBookmark(displayedSong.id)"
                                prepend-icon="mdi-star"
                            >Desfavoritar</v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import BookmarkService from '@/services/BookmarkService'
import { mapGetters } from 'vuex'
export default{
    data(){ 
        return {
            search: '', 
            page: 1,
            itemsPerPage: 5,
            selectedBookmark: null,
            bookmarks: [], 
            loading: false
        }
    },

    computed: { 
        ...mapGetters('theme', ['theme']),
        pageCount(){ 
            return Math.ceil(this.bookmarks.length / this.itemsPerPage)
        }, 

        displayedSong(){ 
            return this.bookmarks.find(bookmark => bookmark.id === this.selectedBookmark)
        }, 
        


    },

    methods: { 
        async unsetAsBookmark(id){ 
            try {
                this.loading = true
                await BookmarkService.delete({
                    songId: id
                })

                this.bookmarks = this.bookmarks.filter((bookmark) => bookmark.id !== id)
                if(this.bookmarks.length){ 
                    this.selectedBookmark = this.bookmarks[0].id
                }
            } catch (error) {
                console.log(error);
            }
            this.loading = false
        },
        async fetchBookmarks(){ 
            try {
                this.loading = true
                const res = (await BookmarkService.index()).data
                this.bookmarks = res.bookmarks
                if(res.bookmarks.length){ 
                    this.selectedBookmark = res.bookmarks[0].id
                }
            } catch (error) {
                console.log(error);
            }
            this.loading = false
        }
    },
    async mounted(){ 
        this.fetchBookmarks()
    }
}
</script>

<style lang="scss" scoped>
.bookmark-data{ 
    cursor: pointer;
    .bookmark-card{ 
        background: none;
        border-bottom: 1px solid #ccc;

    }
    &.selected{ 
        background-color: #eee;
        &.dark{ 
            background-color: #343333;
            opacity: calc(var(0.04)* var(1));;
        }
    }
}
</style>