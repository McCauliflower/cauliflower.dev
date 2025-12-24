<template>
  <div id="home-container">
    <div id="three-container"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // Call waitForContainer when Home page mounts to reinitialize renderer
  // This handles the case where we navigate away and back
  if (window.waitForContainer) {
    window.waitForContainer();
  }
});
</script>

<style scoped>
#home-container {
  width: 100%;
  height: 100vh;
}

#three-container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
