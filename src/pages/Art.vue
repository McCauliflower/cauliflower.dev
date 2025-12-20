<template>
<<<<<<< HEAD
  <div id="app">
    <canvas id="canvas"></canvas>
    <div class="container">
      <div class="wrapper">
          <div class="carousel">
=======
  <div class="container">
    <div class="wrapper">
      <div class="carousel">
>>>>>>> 3e6edbf6e7b28d5948aadc96c227392b0e5cb488
            <button class="nav prev" @click="prev" aria-label="Previous">◀</button>
            <div class="viewport">
              <img :src="current.src" :alt="current.alt" class="slide" draggable="false" />
            </div>
            <button class="nav next" @click="next" aria-label="Next">▶</button>
          </div>
<<<<<<< HEAD
          <div class="dots">
            <button
              v-for="(img, i) in images"
              :key="i"
              :class="['dot', { active: i === index }]
              "
              @click="go(i)"
              :aria-label="`Go to slide ${i + 1}`"
            ></button>
          </div>
=======

      <div class="dots">
        <button
          v-for="(img, i) in images"
          :key="i"
          :class="['dot', { active: i === index }]
          "
          @click="go(i)"
          :aria-label="`Go to slide ${i + 1}`"
        ></button>
>>>>>>> 3e6edbf6e7b28d5948aadc96c227392b0e5cb488
      </div>
    </div>
  </div>
</template>

<<<<<<< HEAD
<script>
import AttractionCursor from "https://cdn.jsdelivr.net/npm/threejs-components@0.0.26/build/cursors/attraction1.min.js"
import { ref, computed, onMounted, onUnmounted } from 'vue';
// import '/pages/art/art.css';
=======
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import '/pages/art/art.css';
>>>>>>> 3e6edbf6e7b28d5948aadc96c227392b0e5cb488

// Images list copied from original page
const images = [
  { src: '/assets/images/art_resized_white/Abraxas.jpg', alt: 'Abraxas' },
  { src: '/assets/images/art_resized_white/Ajna Clairvoyance.jpg', alt: 'Ajna Clairvoyance' },
  { src: '/assets/images/art_resized_white/Archetype of the Alien.jpg', alt: 'Archetype of the Alien' },
  { src: '/assets/images/art_resized_white/benchwood.jpg', alt: 'benchwood' },
  { src: '/assets/images/art_resized_white/Bio-Mechanical_Binary_Forest.jpg', alt: 'Bio-Mechanical Binary Forest' },
  { src: '/assets/images/art_resized_white/blunted.jpg', alt: 'blunted' },
  { src: '/assets/images/art_resized_white/Faced.jpg', alt: 'Faced' },
  { src: '/assets/images/art_resized_white/hand.jpg', alt: 'hand' },
  { src: '/assets/images/art_resized_white/Intergalactic Demi-God_.jpg', alt: 'Intergalactic Demi-God' },
  { src: '/assets/images/art_resized_white/Jerry.jpg', alt: 'Jerry' },
  { src: '/assets/images/art_resized_white/lucious.jpg', alt: 'lucious' },
  { src: '/assets/images/art_resized_white/Lysergic_Illumination.jpg', alt: 'Lysergic Illumination' },
  { src: '/assets/images/art_resized_white/Manifest_My_Destiny.jpg', alt: 'Manifest My Destiny' },
  { src: '/assets/images/art_resized_white/Meditation Manifestation.jpg', alt: 'Meditation Manifestation' },
  { src: '/assets/images/art_resized_white/Mystique_Moon.jpg', alt: 'Mystique Moon' },
  { src: '/assets/images/art_resized_white/PeaceMealPainting.jpg', alt: 'PeaceMealPainting' },
  { src: '/assets/images/art_resized_white/Planting the Seeds of Life.jpg', alt: 'Planting the Seeds of Life' },
  { src: '/assets/images/art_resized_white/Popadoseyo.jpg', alt: 'Popadoseyo' },
  { src: '/assets/images/art_resized_white/Psycho_Active_Astral_Graff.jpg', alt: 'Psycho Active Astral Graff' },
  { src: '/assets/images/art_resized_white/Self_Portrait.jpg', alt: 'Self Portrait' },
  { src: '/assets/images/art_resized_white/Sight_of_the Shaman.jpg', alt: 'Sight of the Shaman' },
  { src: '/assets/images/art_resized_white/Sunshine_Daydream.jpg', alt: 'Sunshine Daydream' },
  { src: '/assets/images/art_resized_white/Terence_McKenna.jpg', alt: 'Terence McKenna' },
  { src: '/assets/images/art_resized_white/The_Eye_of_Horus.jpg', alt: 'The Eye of Horus' },
  { src: '/assets/images/art_resized_white/The_Mad_Scientist.jpg', alt: 'The Mad Scientist' },
  { src: '/assets/images/art_resized_white/Wyldstyle.jpg', alt: 'Wyldstyle' },
  { src: '/assets/images/art_resized_white/z13_.jpg', alt: '13' }
];

const index = ref(0);
const autoplayMs = 4000;
let timer = null;

const current = computed(() => images[index.value]);

function next() {
  index.value = (index.value + 1) % images.length;
}

function prev() {
  index.value = (index.value - 1 + images.length) % images.length;
}

function go(i) {
  index.value = i;
}

<<<<<<< HEAD
export default {
  setup() {
    onMounted(() => {
      const app = AttractionCursor(document.getElementById('canvas'), {
        particles: {
          attractionIntensity: 0.75,
          size: 1.5,  
        },
      })
      timer = setInterval(() => next(), autoplayMs);
    })

    onUnmounted(() => {
      if (timer) clearInterval(timer);
    });

    return {
      images,
      index,
      current,
      next,
      prev,
      go
    }
  }
}
</script>
<style scoped>
#app {
  margin: 0;
  width: 100%;
  height: 100vh;
  touch-action: none;
  display: block;
}

#canvas {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

/* simple slider styles */
.container { 
  padding-top: 20vh; 
}
.carousel { 
  display:flex; 
  align-items:center; 
  justify-content:center; gap:12px; 
}
.viewport { 
  height: min(600px, 70vh); 
  display:flex; 
  align-items:center; 
  justify-content:center; 
  overflow:hidden; 
  background:#000; 
}
.viewport .slide { 
  max-width:100%; 
  max-height:100%; 
  object-fit:contain; display:block; 
}
.nav { 
  background:transparent; 
  border:none; 
  font-size:24px; 
  cursor:pointer; 
  padding:8px 12px; 
  color:white; 
}
.dots { 
  display:flex; 
  justify-content:center; 
  gap:6px; 
  margin-top:12px; 
}
.dot { 
  width:12px; 
  height:12px; 
  border-radius:50%; 
  background:#ccc; 
  border:none; 
  cursor:pointer; 
}
.dot.active { 
  background:#666; 
}
=======
onMounted(() => {
  timer = setInterval(() => next(), autoplayMs);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>
<style scoped>
/* simple slider styles */
.container { padding-top: 60px; }
.carousel { display:flex; align-items:center; justify-content:center; gap:12px; }
.viewport { width: min(900px, 90vw); height: min(600px, 70vh); display:flex; align-items:center; justify-content:center; overflow:hidden; background:#000; }
.viewport .slide { max-width:100%; max-height:100%; object-fit:contain; display:block; }
.nav { background:transparent; border:none; font-size:24px; cursor:pointer; padding:8px 12px; color:white; }
.dots { display:flex; justify-content:center; gap:6px; margin-top:12px; }
.dot { width:12px; height:12px; border-radius:50%; background:#ccc; border:none; cursor:pointer; }
.dot.active { background:#666; }
>>>>>>> 3e6edbf6e7b28d5948aadc96c227392b0e5cb488
</style>
