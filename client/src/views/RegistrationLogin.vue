<template>
    <div class="login d-flex justify-content-center mt-5">
        <tab-panel 
            width="460px"
            :tabList="tabList" 
            :theme="theme">
            <template v-slot:tabContent-1>
                <register-user :theme="theme"></register-user>
            </template>
            <template v-slot:tabContent-2>
                <login-user :theme="theme"></login-user>
            </template>
        </tab-panel>
    </div>
</template>


<script>
import LoginUser from '../components/LoginUser.vue'
import RegisterUser from '../components/RegisterUser.vue'
import TabPanel from '../components/TabPanel.vue'
export default {
  components: { RegisterUser, LoginUser, TabPanel },
    data(){ 
        return { 
            tabList: ['Cadastro', 'Login']
        }
    }, 

    props: { 
        theme: { 
            type: String
        }
    }
}
</script>


<style>
.tab-control__item{
  flex: 1 ;
}
</style>