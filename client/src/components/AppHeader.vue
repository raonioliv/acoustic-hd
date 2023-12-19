<template>
    <div 
        :class="{ 
            'bg-dark': theme == 'dark'
        }"
        class="appHeader p-3">
        <div @click="goToRoute({name: '/home'}, true)" class="logo">
            <img src="../assets/faceMelter.png" alt="">
        </div>
        <div class="d-flex align-items-center gap-3">
            <toggle-theme 
                :theme="theme"
                sliderWidth="90px"
                @toggleTheme="$emit('toggleTheme')"
            />


            <div v-if="!isAuthenticated">
                <sign-in-button />
            </div>
            <div v-else>
                <account-menu-toggler />
            </div>
        </div>
    </div>
</template>

<script>
import ToggleTheme from './ToggleTheme.vue'
import { mapGetters } from 'vuex'
import accountMenuToggler from './accountMenuToggler'
import SignInButton from './SignInButton.vue'
export default {
  components: { 
        ToggleTheme,
        accountMenuToggler, 
        SignInButton 
    }, 
    name: 'HeaderMenu',
    props: { 
        theme: { 
            type: String, 
        }
    },
    computed: { 
        ...mapGetters('user', { 
            isAuthenticated: 'isAuthenticated', 
            user: 'user', 
        })
    },
}


</script>

<style lang="scss">

    .appHeader{ 
        display: flex;
        justify-content: space-between;
        border-bottom: .5px solid #f8f9fa;
        background: #850e1c;
    }
    .logo{ 
        width: 100px;
        cursor: pointer;
        img{ 
            width: 100%;
            transform: rotate(-10deg);
        }
    }
</style>