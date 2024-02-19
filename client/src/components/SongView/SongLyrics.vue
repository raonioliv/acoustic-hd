<template>
    <content-panel 
        prepend-icon-header="mdi-star-box"
        title-uppercase 
        title="Letras">
        <v-textarea
            rows="10"
            max-rows="30"
            readOnly
            :model-value="songLyrics"
        >

        </v-textarea>
    </content-panel>
</template>

<script>
import ContentPanel from '../reusable/ContentPanel.vue'
export default {
    components: { 
        ContentPanel
    }, 
    props: { 
        songLyrics: { 
            required: true, 
            type: String
        }
    }
}
</script>