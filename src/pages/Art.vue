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

// Art images array with paths to public/assets
const images = [
  { src: './assets/images/art_resized/Abraxas.png', alt: 'Abraxas' },
  { src: './assets/images/art_resized/Ajna Clairvoyance.png', alt: 'Ajna Clairvoyance' },
  { src: './assets/images/art_resized/Archetype of the Alien.png', alt: 'Archetype of the Alien' },
  { src: './assets/images/art_resized/benchwood.png', alt: 'benchwood' },
  { src: './assets/images/art_resized/Bio-Mechanical_Binary_Forest.png', alt: 'Bio-Mechanical Binary Forest' },
  { src: './assets/images/art_resized/blunted.png', alt: 'blunted' },
  { src: './assets/images/art_resized/Faced.png', alt: 'Faced' },
  { src: './assets/images/art_resized/hand.png', alt: 'hand' },
  { src: './assets/images/art_resized/Intergalactic Demi-God_.png', alt: 'Intergalactic Demi-God' },
  { src: './assets/images/art_resized/Jerry.png', alt: 'Jerry' },
  { src: './assets/images/art_resized/lucious.png', alt: 'lucious' },
  { src: './assets/images/art_resized/Lysergic_Illumination.png', alt: 'Lysergic Illumination' },
  { src: './assets/images/art_resized/Manifest_my_Destiny.png', alt: 'Manifest My Destiny' },
  { src: './assets/images/art_resized/Meditation Manifestation.png', alt: 'Meditation Manifestation' },
  { src: './assets/images/art_resized/Mystique_Moon.png', alt: 'Mystique Moon' },
  { src: './assets/images/art_resized/PeaceMealPainting.png', alt: 'PeaceMealPainting' },
  { src: './assets/images/art_resized/Planting the Seeds of Life.png', alt: 'Planting the Seeds of Life' },
  { src: './assets/images/art_resized/Popadoseyo.png', alt: 'Popadoseyo' },
  { src: './assets/images/art_resized/Psycho_Active_Astral_Graff.png', alt: 'Psycho Active Astral Graff' },
  { src: './assets/images/art_resized/Self_Portrait.png', alt: 'Self Portrait' },
  { src: './assets/images/art_resized/Sight_of_the Shaman.png', alt: 'Sight of the Shaman' },
  { src: './assets/images/art_resized/Sunshine_Daydream.png', alt: 'Sunshine Daydream' },
  { src: './assets/images/art_resized/Terence_McKenna.png', alt: 'Terence McKenna' },
  { src: './assets/images/art_resized/The_Eye_of_Horus.png', alt: 'The Eye of Horus' },
  { src: './assets/images/art_resized/The_Mad_Scientist.png', alt: 'The Mad Scientist' },
  { src: './assets/images/art_resized/Wyldstyle.png', alt: 'Wyldstyle' },
  { src: './assets/images/art_resized/z13_.png', alt: '13' }
];

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
