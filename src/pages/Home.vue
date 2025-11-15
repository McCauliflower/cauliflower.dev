<template>
  <div id="home-container">
    <div id="three-container"></div>
  </div>
</template>

<script setup>
// The three.js scene is initialized globally by /scene.js
// This component just provides the #three-container element for it to render into
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
