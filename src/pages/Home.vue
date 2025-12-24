<template>
  <div id="home-container">
    <div id="three-container"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
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
