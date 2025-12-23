<template>
  <div id="home-container">
    <div id="three-container"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { loadScript } from '/utils/generalUtils.js';

onMounted(async () => {
  try {
    // Load Three.js from CDN first
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
    // Then load the local libraries and scene
    await loadScript('/lib/perlin.js');
    await loadScript('/lib/three.js');
    await loadScript('/lib/OrbitControls.js');
    await loadScript('/scene.js');
  } catch (error) {
    console.error('Error loading scripts:', error);
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
