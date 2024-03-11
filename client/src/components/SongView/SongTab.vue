<template>
<section>
    <content-panel 
        prepend-icon-header="mdi-guitar-acoustic"
        title-uppercase 
        title="Cifra">
        <v-textarea
            rows="10"
            max-rows="30"
            readOnly
            :model-value="song.tab"
        >

        </v-textarea>
    </content-panel>
</section>
</template>

<script>
import ContentPanel from '../reusable/ContentPanel.vue'
export default {
    components: { 
        ContentPanel
    }, 
    props: { 
        song: { 
            required: true, 
        }
    }
}
</script>