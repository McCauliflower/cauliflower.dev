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

</style>

<script setup lang="js">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { CardStreamController } from './CodeDependencies/CardStreamController.js';
import { ParticleSystem } from './CodeDependencies/particleSystem.js';
import { ParticleScanner } from './CodeDependencies/particleScanner.js';

// Import images so Vite can resolve them correctly
import robotBuilderThumb from '../../assets/images/code_thumnails/robot-builder-thumb.png';
import unicodeThumb from '../../assets/images/code_thumnails/unicode-thumb.png';
import treeFractalThumb from '../../assets/images/code_thumnails/tree-fractal-thumb.png';
import snakeThumb from '../../assets/images/code_thumnails/snake-thumb.png';
import sunShadesThumb from '../../assets/images/code_thumnails/sun-shades-thumb.png';
import thesisThumb from '../../assets/images/code_thumnails/thesis-thumb.png';
import ballpitThumb from '../../assets/images/code_thumnails/ballpit-thumb.png';

// Template refs
const speedValue = ref(null);
const cardStream = ref(null);
const cardLine = ref(null);
const particleCanvas = ref(null);
const scannerCanvas = ref(null);

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
    image: robotBuilderThumb,
    link: "/src/pages/sites/robot-builder/index.html",
  },
  {
    title: "Unicode Hieroglyphs",
    image: unicodeThumb,
    link: "/src/pages/sites/unicode-hieroglyphs/unicodeLoop.html",
  },
  {
    title: "Tree Fractal",
    image: treeFractalThumb,
    link: "/src/pages/sites/tree-fractal/index.html",
  },
  {
    title: "Snake",
    image: snakeThumb,
    link: "/src/pages/sites/snake/index.html",
  },
  {
    title: "Divz",
    image: sunShadesThumb,
    link: "/src/pages/sites/divz/index.html",
  },
  {
    title: "Thesis",
    image: thesisThumb,
    link: "/src/pages/sites/thesis/index.html",
  },
  {
    title: "Ballpit",
    image: ballpitThumb,
    link: "/src/pages/sites/ballpit/index.html",
  },
];
onMounted(async () => {
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

