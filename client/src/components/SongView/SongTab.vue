<template>
    <content-panel 
        prepend-icon-header="mdi-guitar-acoustic"
        title-uppercase 
        title="Cifra">
        <v-textarea
            rows="10"
            max-rows="30"
            readOnly
            :model-value="songTab"
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
        songTab: { 
            required: true, 
            type: String
        }
    }
}
</script>