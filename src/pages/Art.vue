<template>
  <div id="app">
    <canvas id="canvas"></canvas>
    <div class="container">
      <div class="wrapper">
          <div class="carousel">
            <button class="nav prev" @click="prev" aria-label="Previous">◀</button>
              <Electric-Border>
                <div class="viewport">
                  <img :src="current.src" :alt="current.alt" class="slide" draggable="false" />
                </div>
              </Electric-Border>
            <button class="nav next" @click="next" aria-label="Next">▶</button>
          </div>
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
      </div>
    </div>
  </div>
</template>

<script setup>
import AttractionCursor from "https://cdn.jsdelivr.net/npm/threejs-components@0.0.26/build/cursors/attraction1.min.js"
import { ref, computed, onMounted, onUnmounted } from 'vue';
import ElectricBorder from '@/components/ElectricBorder.vue';

// Use Vite's glob import to load all art images
const artImages = import.meta.glob('../../assets/images/art_resized/*.png', { eager: true });

// Convert glob results to image array
const images = [
  { src: artImages['../../assets/images/art_resized/Abraxas.png']?.default, alt: 'Abraxas' },
  { src: artImages['../../assets/images/art_resized/Ajna Clairvoyance.png']?.default, alt: 'Ajna Clairvoyance' },
  { src: artImages['../../assets/images/art_resized/Archetype of the Alien.png']?.default, alt: 'Archetype of the Alien' },
  { src: artImages['../../assets/images/art_resized/benchwood.png']?.default, alt: 'benchwood' },
  { src: artImages['../../assets/images/art_resized/Bio-Mechanical_Binary_Forest.png']?.default, alt: 'Bio-Mechanical Binary Forest' },
  { src: artImages['../../assets/images/art_resized/blunted.png']?.default, alt: 'blunted' },
  { src: artImages['../../assets/images/art_resized/Faced.png']?.default, alt: 'Faced' },
  { src: artImages['../../assets/images/art_resized/hand.png']?.default, alt: 'hand' },
  { src: artImages['../../assets/images/art_resized/Intergalactic Demi-God_.png']?.default, alt: 'Intergalactic Demi-God' },
  { src: artImages['../../assets/images/art_resized/Jerry.png']?.default, alt: 'Jerry' },
  { src: artImages['../../assets/images/art_resized/lucious.png']?.default, alt: 'lucious' },
  { src: artImages['../../assets/images/art_resized/Lysergic_Illumination.png']?.default, alt: 'Lysergic Illumination' },
  { src: artImages['../../assets/images/art_resized/Manifest_My_Destiny.png']?.default, alt: 'Manifest My Destiny' },
  { src: artImages['../../assets/images/art_resized/Meditation Manifestation.png']?.default, alt: 'Meditation Manifestation' },
  { src: artImages['../../assets/images/art_resized/Mystique_Moon.png']?.default, alt: 'Mystique Moon' },
  { src: artImages['../../assets/images/art_resized/PeaceMealPainting.png']?.default, alt: 'PeaceMealPainting' },
  { src: artImages['../../assets/images/art_resized/Planting the Seeds of Life.png']?.default, alt: 'Planting the Seeds of Life' },
  { src: artImages['../../assets/images/art_resized/Popadoseyo.png']?.default, alt: 'Popadoseyo' },
  { src: artImages['../../assets/images/art_resized/Psycho_Active_Astral_Graff.png']?.default, alt: 'Psycho Active Astral Graff' },
  { src: artImages['../../assets/images/art_resized/Self_Portrait.png']?.default, alt: 'Self Portrait' },
  { src: artImages['../../assets/images/art_resized/Sight_of_the Shaman.png']?.default, alt: 'Sight of the Shaman' },
  { src: artImages['../../assets/images/art_resized/Sunshine_Daydream.png']?.default, alt: 'Sunshine Daydream' },
  { src: artImages['../../assets/images/art_resized/Terence_McKenna.png']?.default, alt: 'Terence McKenna' },
  { src: artImages['../../assets/images/art_resized/The_Eye_of_Horus.png']?.default, alt: 'The Eye of Horus' },
  { src: artImages['../../assets/images/art_resized/The_Mad_Scientist.png']?.default, alt: 'The Mad Scientist' },
  { src: artImages['../../assets/images/art_resized/Wyldstyle.png']?.default, alt: 'Wyldstyle' },
  { src: artImages['../../assets/images/art_resized/z13_.png']?.default, alt: '13' }
].filter(img => img.src); // Filter out any undefined images

const index = ref(0);
const autoplayMs = 4000;
let timer = null;

const current = computed(() => images[index.value]);

const next = () => {
  index.value = (index.value + 1) % images.length;
};

const prev = () => {
  index.value = (index.value - 1 + images.length) % images.length;
};

const go = (i) => {
  index.value = i;
};

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
  padding: 30px 20px;
  height: min(600px, 70vh); 
  display:flex; 
  align-items:center; 
  justify-content:center; 
  overflow:hidden; 
  background:transparent; 
}
.viewport .slide { 
  max-width:auto; 
  max-height:100%;
  object-fit:contain; 
  padding: 20px;
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
</style>
