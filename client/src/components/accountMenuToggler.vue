<template>
    <div>
	<div 

        @click="toggleMenu"
        class="profile">
		<div class="user">
			<h3 class="text-light">{{user.firstName}}</h3>
		</div>
		<div class="img-box">
			<img src="https://i.postimg.cc/BvNYhMHS/user-img.jpg" alt="some user image">
		</div>
	</div>
	<div 
        :class="{ 
            active: open
        }"
        class="menu">
		<ul>
			<li><a href="#"><i class="ph-bold ph-user"></i>&nbsp;Profile</a></li>
			<li><a href="#"><i class="ph-bold ph-envelope-simple"></i>&nbsp;Inbox</a></li>
			<li><a href="#"><i class="ph-bold ph-gear-six"></i>&nbsp;Settings</a></li>
			<li><a href="#"><i class="ph-bold ph-question"></i>&nbsp;Help</a></li>
			<li><a href="#"><i class="ph-bold ph-sign-out"></i>&nbsp;Sign Out</a></li>
		</ul>
	</div>
    </div>
</template>


<script>
import { mapGetters } from 'vuex';
export default {
   data() {
    return {
        open: false
    }
   },
    
    computed: {
        ...mapGetters('user', { 
            isAuthenticated: 'isAuthenticated', 
            user: 'user', 
        })
    },
   methods: {
    toggleMenu(){ 
        this.open = !this.open
    }
   }
}
</script>