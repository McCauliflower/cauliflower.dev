<template>
  <div class="code-page-container">
    <div class="controls">
      <button class="control-btn" @click="toggleAnimation()">⏸️ Pause</button>
      <button class="control-btn" @click="resetPosition()">🔄 Reset</button>
      <button class="control-btn" @click="changeDirection()">
        ↔️ Direction
      </button>
    </div>

    <!-- <div class="speed-indicator">
      Speed: <input ref="speedValue" type="number" value="120"> px/s
    </div> -->
    <input style="display: none" ref="speedValue" type="number" value="120">
    <div class="mobile-notice" v-if="isMobile.value">
      <p>&#x26A0; Notice: These code snippets may not function properly on mobile devices. &#x26A0;</p>
    </div>
    <div class="container">
      <canvas ref="particleCanvas" id="particleCanvas"></canvas>
      <canvas ref="scannerCanvas" id="scannerCanvas"></canvas>

      <div class="scanner"></div>

      <div class="card-stream" ref="cardStream">
        <div class="card-line" ref="cardLine"></div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="css">
@import "./CodeDependencies/CodeAnimation.css";

.code-page-container {
  background: #000000 !important;
  font-family: 'Iceberg', Arial, sans-serif;
  text-transform: uppercase;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.mobile-notice{
  position: fixed;
  top: 28vh;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 50vw;
  padding: 20px;
  text-align: center;
  background: lightgrey;
  color: orange;
  font-size: 14px;
  z-index: 200;
  border: 3px solid orange;
  opacity: .6;
  box-sizing: border-box;
  pointer-events: auto;
}

</style>

<script setup lang="js">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { CardStreamController } from './CodeDependencies/CardStreamController.js';
import { ParticleSystem } from './CodeDependencies/particleSystem.js';
import { ParticleScanner } from './CodeDependencies/particleScanner.js';

// Template refs
const speedValue = ref(null);
const cardStream = ref(null);
const cardLine = ref(null);
const particleCanvas = ref(null);
const scannerCanvas = ref(null);
const isMobile = ref(false);
// Controller instances
let cardStreamController = null;
let particleSystem = null;
let particleScanner = null;

// Vue component methods
function toggleAnimation() {
  if (cardStreamController) {
    cardStreamController.toggleAnimation();
  }
}

function resetPosition() {
  if (cardStreamController) {
    cardStreamController.resetPosition();
  }
}

function changeDirection() {
  if (cardStreamController) {
    cardStreamController.changeDirection();
  }
}

const projects = [
  {
    title: "Robot Builder",
    image: './assets/images/code_thumnails/robot-builder-thumb.png',
    link: "/sites/robot-builder/index.html",
  },
  {
    title: "Unicode Hieroglyphs",
    image: './assets/images/code_thumnails/unicode-thumb.png',
    link: "/sites/unicode-hieroglyphs/unicodeLoop.html",
  },
  {
    title: "Tree Fractal",
    image: './assets/images/code_thumnails/tree-fractal-thumb.png',
    link: "/sites/tree-fractal/index.html",
  },
  {
    title: "Snake",
    image: './assets/images/code_thumnails/snake-thumb.png',
    link: "/sites/snake/index.html",
  },
  {
    title: "Divz",
    image: './assets/images/code_thumnails/sun-shades-thumb.png',
    link: "/sites/divz/index.html",
  },
  {
    title: "Thesis",
    image: './assets/images/code_thumnails/thesis-thumb.png',
    link: "/sites/thesis/index.html",
  },
  {
    title: "Ballpit",
    image: './assets/images/code_thumnails/ballpit-thumb.png',
    link: "/sites/ballpit/index.html",
  },
];
onMounted(async () => {
  isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  console.log('Mobile detected:', isMobile.value);
  console.log('User agent:', navigator.userAgent);

  cardStreamController = new CardStreamController(
    cardStream.value,
    cardLine.value,
    speedValue.value,
    projects
  );
  particleSystem = new ParticleSystem(particleCanvas.value);
  particleScanner = new ParticleScanner(scannerCanvas.value);

  window.setScannerScanning = (active) => {
    if (particleScanner) {
      particleScanner.setScanningActive(active);
    }
  };

  window.getScannerStats = () => {
    if (particleScanner) {
      return particleScanner.getStats();
    }
    return null;
  };
});

onBeforeUnmount(() => {
  if (cardStreamController) {
    cardStreamController.destroy();
  }
  if (particleSystem) {
    particleSystem.destroy();
  }
  if (particleScanner) {
    particleScanner.destroy();
  }
});
</script>

