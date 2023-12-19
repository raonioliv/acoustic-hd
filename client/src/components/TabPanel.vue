<template>
    <div
      class="tab-panel"
      :class="{
          horizontal: variant === 'horizontal',
          flex: variant === 'horizontal', 
      }"
    >

      <ul
        class="tab-control"
        :class="{
          flex: variant === 'vertical',
        }"
      >
        <li 
          @click="setActiveTab((index + 1))"
          :class="{
            active: activeTab === (index + 1), 
            dark: theme == 'dark'
          }" 
          class="cursor-pointer tab-control__item" 
          v-for="(tab, index) in tabList" :key="index">
          <label 
            :class="theme"
            class="cursor-pointer " 
            :for="`tab-control-${index}`" 
            v-text="tab" />
          <input
            :id="`tab-control-${index}`"
            type="radio"
            :name="`tab-control${index}`"
            :value="index + 1"
            v-model="activeTab"
          />
        </li>
      </ul>
      <template v-for="(tab, index) in tabList" :key="index">
        <transition name="slide-fade">
          <div class="tab-content" :key="index" v-if="index + 1 === activeTab">
          
              <slot :name="`tabContent-${index + 1}`" />
              
          </div>
        </transition>
      </template>
    </div>
  </template>
  
<script>
  export default {
    props: {
      tabList: {
        type: Array,
        required: true,
      },
      variant: {
        type: String,
        required: false,
        default: () => "vertical",
        validator: (value) => ["horizontal", "vertical"].includes(value),
      },

      theme: {
        type: String
      },
      width: { 
        type: String, 

      }
    },
    data() {
      return {
        activeTab: 1,
      };
    },

    methods: { 
      setActiveTab(index){ 
        this.activeTab = index
      }
    }
  };
</script>
  

<style lang="scss" scoped>
  $min-width: #{width};
  .tab-panel{ 
    min-width: $min-width;
  }
</style>