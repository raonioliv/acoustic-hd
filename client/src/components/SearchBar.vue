<template>
<div class="searchBar mr-3 flex-grow-1 justify-end">
    <v-slide-x-reverse-transition>
        <v-text-field
            autofocus
            @blur="expand = !expand"
            ref="search"
            v-if="expand"
            v-model="searchQuery"
            label="Search tabs"
            hide-details
        >
        </v-text-field>
    </v-slide-x-reverse-transition>
    <v-btn 
        @click="expandSearch"
        v-show="!expand"
        icon>
        <v-icon>mdi-magnify</v-icon>
    </v-btn>
</div>
</template>


<script>
export default {
    data(){
        return { 
            expand: false, 
            searchQuery: ''
        }
    },
    methods: { 
        expandSearch(){ 
            this.expand = !this.expand 
        }
    }
}
</script>