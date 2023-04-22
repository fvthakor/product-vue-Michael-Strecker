<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <ProductList />
</template>

<script setup lang="ts">
  import HelloWorld from "./components/HelloWorld.vue";
  import ProductList from './components/ProductList.vue'
</script>

<style>
  #app {
    @apply antialiased flex flex-col items-center mt-4;
  }
</style>