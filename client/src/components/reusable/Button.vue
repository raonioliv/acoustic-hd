<template>
    <button
        @click="$emit('onClick')"
        :disabled="disabled"
        :class="classObj"
    >
        {{ text }}
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'CButton',
    props: { 
        text: { 
            type: String, 
            default: 'Click'
        },
        disabled: { 
            type: Boolean,
            required: false, 
            default: false
        }, 
        icon: { 
            type: Object,
            default: () => {}
        }
    },
    computed: { 
        classObj(){ 
            var classObj = {}
            classObj.btn = true

            return classObj
        }
    },
    methods: { 

    }, 
}
</script>