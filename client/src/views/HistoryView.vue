<template>
    <content-panel 
        title-uppercase
        prepend-icon-header="mdi-history"
        title="Visto recentemente">
        <history-pagination />
    </content-panel>
</template>

<script>
import BookmarkService from '@/services/BookmarkService'
import ContentPanel from '../components/reusable/ContentPanel.vue'
import HistoryPagination from '../components/History/HistoryPagination.vue'
export default {
    components: { 
        ContentPanel,
        HistoryPagination
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