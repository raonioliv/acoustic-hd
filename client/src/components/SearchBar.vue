<template>
    <v-text-field
        autofocus
        ref="search"
        :model-value="search"
        label="Search tabs"
        hide-details
        append-inner-icon="mdi-search"
        @input="$emit('update:modelValue', $event.target.value)"
    >
    </v-text-field>
</template>
 

<script>
export default {

    props: { 
        search: { 
            type: String,
        }
    }, 
    emits: ['update:modelValue']
}
</script>