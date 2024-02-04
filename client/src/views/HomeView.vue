<template>
  <hello-world />
</template>

<script>
import { defineComponent } from 'vue';
import HelloWorld from '../components/HelloWorld.vue';

export default defineComponent({
  components: { HelloWorld },
  name: 'HomeView',
  data(){ 
    return { 
      images: [
          'https://via.placeholder.com/600/92c952', 
          'https://via.placeholder.com/600/771796',
          'https://via.placeholder.com/600/24f355',
          'https://via.placeholder.com/600/d32776',
          'https://via.placeholder.com/600/f66b97'
      ]
    }
  },
});
</script>
