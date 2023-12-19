<template>
        <button 
        @click="goToRoute({name: '/register'})"
        class="
            btn 
            btn-red
            btn-shine
            fw-semibold
    ">
        Entrar
    </button>
        
    
</template>


<script>
export default {
    

    methods: { 
        goToRoute(route, needValidation){ 
            var userAuthenticated = true
            if(needValidation === true && !userAuthenticated ){ 
                this.$router.push('register')
            }else{ 
                this.$router.push(route.name)
            }
        }
    }
}
</script>