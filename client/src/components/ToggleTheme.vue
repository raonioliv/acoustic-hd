<template>
  <div>
    <div class="switcher">
      <input :checked="isChecked" @change="$emit('toggleTheme')" type="checkbox" id="switch" />
      <label for="switch" class="switch"></label>
    </div>
  </div>
</template>


<script setup>
import { useStorage } from "@vueuse/core";
import { computed } from "vue";
  const theme = useStorage('vueuse-color-scheme')

  const isChecked = computed(() => { 
	return theme.value == 'dark' ? true : false
  })
</script>

<style lang="scss">
$in-size: 30px;
input[type=checkbox]{
	height: 0;
	width: 0;
	visibility: hidden;
	display: flex;
}

.switch {
	cursor: pointer;
	text-indent: -9999px;
	width: $in-size * 2;
	height: $in-size + 10px;
	background: grey;
	display: block;
	border-radius: 100px;
	position: relative;
}

.switch:after {
	content: '';
	position: absolute;
	top: 5px;
	left: 5px;
	width: $in-size;
	height: $in-size;
	background-image: url('../assets/sun.svg');
	background-color: #fff;
	background-position: center;
	background-repeat: no-repeat;
	border-radius: $in-size;
	transition: 0.3s;
}

input:checked + label {
	background: #858586;
}

input:checked + label:after {
	left: calc(100% - 5px);
	transform: translateX(-100%);
	background-image: url('../assets/moon.svg');
	background-position: center;
	background-color: #000;
	background-repeat: no-repeat;
}

.switch:active:after {
	width: $in-size + 20px;
}
</style>