<template>
    <div class="bg-{{background}} elevation">
        <v-toolbar class="px-3" :color="toolbarColor">
            <template v-if="prependIconHeader" v-slot:prepend>
                <v-icon :icon="prependIconHeader"></v-icon>
            </template>
            <v-toolbar-title 
                :class="{ 
                    'text-uppercase': titleUppercase, 
                    'font-weight-bold': titleBold
                }"
            >
                {{title}}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <slot name="action"/>
        </v-toolbar>

        <slot>Sem conteúdo.</slot>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: { 
        ...mapGetters('theme', ['theme']),
        background: () => { 
            return this.theme === 'dark' ? 'black' : 'white' 
        }
    },
    props: { 
        title: { 
            type: String, 
        },

        toolbarColor: { 
            type: String, 
            default: 'primary'
        }, 
        titleUppercase: { 
            type: Boolean, 
            default: false
        },
        titleBold: { 
            type: Boolean, 
            default: false
        }, 
        prependIconHeader: { 
            type: String
        }
    }
}
</script>