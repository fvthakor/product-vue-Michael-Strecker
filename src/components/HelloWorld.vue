<template>
  <h1 class="text-2xl font-medium font-serif">{{ msg }}</h1>
  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>
  <button class="
      my-4
      px-4
      py-2
      rounded
      ring-black ring-1
      bg-white
      hover:bg-gray-100
      transition-colors
    " @click="state.count++">
    count is: {{ state.count }}
  </button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup lang="ts">
  import { reactive } from "vue";

  defineProps < {
    msg: string,
  } > ()

  const state = reactive({ count: 0 });

</script>

<style scoped>
  a {
    color: #42b983;
  }
</style>