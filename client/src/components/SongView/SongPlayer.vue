<template>
<section>
    <content-panel
        class="h-100"
        title="Player"
        title-uppercase
        prepend-icon-header="mdi-youtube"
    >
        <iframe 
            width="100%" 
            height="400px" 
            class="pa-3" 
            :src="url" 
            frameborder="0">
        </iframe>
    </content-panel>
</section>
</template>

<script>
import ContentPanel from "../reusable/ContentPanel.vue"

export default {
  components: { ContentPanel },

    computed: {
        url(){ 
            return `https://www.youtube.com/embed/` + this.song.youtubeId
        }, 
    },
    props: { 
        song: { 
            required: true, 
        }
    }
}
</script>