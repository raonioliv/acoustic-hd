<template>
    <content-panel 
        title-uppercase
        prepend-icon-header="mdi-star"
        title="Meus favoritos">
        <bookmarks-pagination />
    </content-panel>
</template>

<script>
import BookmarkService from '@/services/BookmarkService'
import ContentPanel from '../components/reusable/ContentPanel.vue'
import BookmarksPagination from '../components/Bookmarks/BookmarksPagination.vue'
export default {
    components: { 
        ContentPanel,
        BookmarksPagination
    },
    data(){ 
        return { 
            bookmarks: []
        }
    },

    methods: { 
        async fetchBookmarks() { 
            try {
                const res = (await BookmarkService.index()).data
                console.log(res);
                this.bookmarks = res.bookmarks
            } catch (error) {
                console.log(error.response);
            }
        }
    }, 

    mounted(){ 
        this.fetchBookmarks()
    }
}
</script>