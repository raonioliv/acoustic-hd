<template v-slot:icon>
    <i
        class="fa"    
    >

    </i>
</template>


<script>


export default ({
    name: 'CIcon',
    props: { 
        url: { 
            type: String, 
            default: '../assets/images/icons/password-preview-open.svg'
        }
    }
})
</script>

<style>
/* $url: v-bind(url); */
.fa::before{ 
    content: url();
}
</style>