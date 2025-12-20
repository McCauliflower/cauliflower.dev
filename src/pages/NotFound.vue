<template>
  <div class="not-found">
    <div class="noise"></div>
    <div class="overlay"></div>
    <div class="terminal">
      <h1>Error <span class="errorcode">404</span></h1>
      <div class="output-wrapper">
        <p class="output">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
        <p class="output">Please try to <a class="link" @click="goBack">go back</a> or <router-link class="link" to="/">return to the homepage</router-link>.</p>
        <p class="output">Good luck.</p>
      </div>
    </div>
    <router-link to="/">Go back home</router-link>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Inconsolata');

h1{
  font-size: 2em;
  margin-left: 1em;
  margin-top: 10vh;
}
.not-found {
  box-sizing: border-box;
  margin-top:50px;
  height: 100%;
  background-color: #000000;
  background-image: url("https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif");
  background-repeat: no-repeat;
  background-size: cover;
  font-family: 'Inconsolata','Iceberg', sans-serif;
  font-size: 1.5rem;
  color: rgba(128, 255, 128, 0.8);
  text-shadow:
      0 0 1ex rgba(51, 255, 51, 1),
      0 0 2px rgba(255, 255, 255, 0.8);
}

.noise {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  opacity: .02;
}

.overlay {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background:
      radial-gradient(#11581E, #041607),
      repeating-linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0) 100%);
  background-size: auto 4px;
  z-index: 1;
}

.overlay::before {
  content: "";
  pointer-events: none;
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      0deg,
      transparent 0%,
      rgba(32, 128, 32, 0.2) 2%,
      rgba(32, 128, 32, 0.8) 3%,
      rgba(32, 128, 32, 0.2) 3%,
      transparent 100%);
  background-repeat: no-repeat;
  animation: scan 7.5s linear 0s infinite;
}

@keyframes scan {
  0%        { background-position: 0 -100vh; }
  35%, 100% { background-position: 0 100vh; }
}

.terminal {
  box-sizing: inherit;
  position: absolute;
  height: 100%;
  width: 1000px;
  max-width: 100%;
  padding: 4rem;
  text-transform: uppercase;
  z-index: 2;
}

.output-wrapper {
  margin-top: 20vh;
}
.output {
  color: rgba(128, 255, 128, 0.8);
  text-shadow:
      0 0 1px rgba(51, 255, 51, 0.4),
      0 0 2px rgba(255, 255, 255, 0.8);
}

.output::before {
  content: "> ";
}

.link:hover{
  transition: all 0.3s ease;
  transform: scale(1.2);
  color: green;
}

:deep(a:hover) {
  transform: scale(1.1);
  color: green;
  transition: all 0.3s ease;
}
a {
  padding-left: 15px;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
  cursor: pointer;
}

a::before {
  content: "[";
}

a::after {
  content: "]";
}

.errorcode {
  color: white;
}
</style>
