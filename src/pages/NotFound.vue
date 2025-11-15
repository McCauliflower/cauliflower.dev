<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Page not found</p>
    <router-link to="/">Go back home</router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  font-family: 'Montserrat', serif;
}

.not-found h1 {
  font-size: 120px;
  margin: 0;
  color: #999;
}

.not-found p {
  font-size: 24px;
  margin: 20px 0;
  color: #666;
}

.not-found a {
  padding: 10px 20px;
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid #999;
  border-radius: 5px;
  text-decoration: none;
  color: #000;
  transition: all 0.3s ease;
}

.not-found a:hover {
  background: rgba(0, 0, 0, 0.2);
}
</style>
