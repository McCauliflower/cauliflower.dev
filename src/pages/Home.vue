<template>
  <div id="home-container">
    <div id="three-container"></div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

onMounted(async () => {
  try {
    // Scripts are already loaded in index.html
    // Just reinitialize the scene if it was previously disposed
    if (window.waitForContainer) {
      window.waitForContainer();
    }
  } catch (error) {
    console.error('Error initializing scene:', error);
  }
});

onBeforeUnmount(() => {
  // Pause animation loop but keep scene intact
  if (window.renderer) {
    window.renderer.dispose();
    window.renderer = null;
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
