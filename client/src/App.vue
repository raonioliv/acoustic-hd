<template>
  <div :class="themeValue">
    <app-header
      :theme="themeValue"
      @toggleTheme="toggleDark()"
    />
			<router-view :theme="themeValue" v-slot="{Component}">
        <transition name="fade" >
          <component :is="Component"/>
        </transition>
      </router-view >
    
  </div>
</template>


<script setup>
  import { useToggle, useDark, useStorage } from '@vueuse/core'
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  const store = useStore()
  const isDark = useDark({
    selector: 'body',
    attribute: 'data-bs-theme',
    valueDark: 'dark',
    valueLight: 'light'
  })
  const toggleDark = useToggle(isDark)
  const theme = useStorage('vueuse-color-scheme')
  const themeValue = computed(() => { 
    return theme.value === 'auto' ? 'light' : 'dark'
  })

</script>
<script>
import AppHeader from './components/AppHeader.vue';


export default {
  components: { 
    AppHeader
  },
}
</script>