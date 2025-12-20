<template>
  <div id="app-root">
    <NavMenu />
    <router-view />
  </div>
</template>

<script setup>
import NavMenu from '/src/components/NavMenu.vue';
</script>

<style>
/* Minimal app-level styles */
#app-root { min-height: 100vh; }
</style>
