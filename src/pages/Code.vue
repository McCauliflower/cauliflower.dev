<template>
  <div>
    <div class="controls">
      <button class="control-btn" @click="toggleAnimation">⏸️ Pause</button>
      <button class="control-btn" @click="resetPosition">🔄 Reset</button>
      <button class="control-btn" @click="changeDirection">
        ↔️ Direction
      </button>
    </div>

    <div class="speed-indicator">
      Speed: <span>{{ speedIndicatorRef }}</span> px/s
    </div>

    <div class="container">
      <canvas id="particleCanvas" ref="particleCanvasRef"></canvas>
      <canvas id="scannerCanvas" ref="scannerCanvasRef"></canvas>

      <div class="scanner"></div>

      <div class="card-stream" ref="cardStreamRef" id="cardStream">
        <div class="card-line" ref="cardLineRef" id="cardLine"></div>
      </div>
    </div>

    <!-- <div class="wrapper">
      <div class="grid">
        <a href="./sites/robot-builder/index.html">
          <div class="grid-item">
            <img class="image" src="/assets/images/code_thumnails/robot-builder-thumb.png" alt="Robot Builder" />
            <div class="image-label">Robot Builder</div>
          </div>
        </a>
        <a href="./sites/unicode-hieroglyphs/unicodeLoop.html">
          <div class="grid-item">
            <img class="image" src="/assets/images/code_thumnails/unicode-thumb.png" alt="Unicode Hieroglyphs" />
            <div class="image-label">Unicode Hieroglyphs</div>
          </div>
        </a>
        <a href="./sites/tree-fractal/index.html">
          <div class="grid-item">
            <img class="image" src="/assets/images/code_thumnails/tree-fractal-thumb.png" alt="Tree Fractal" />
            <div class="image-label">Tree Fractal</div>
          </div>
        </a>
        <a href="./sites/snake/index.html">
          <div class="grid-item">
            <img class="image" src="/assets/images/code_thumnails/snake-thumb.png" alt="Snake" />
            <div class="image-label">Snake</div>
          </div>
        </a>
        <a href="./sites/divz/index.html">
          <div class="grid-item">
            <img class="image" src="/assets/images/code_thumnails/sun-shades-thumb.png" alt="Divz" />
            <div class="image-label">Divz</div>
          </div>
        </a>
        <a href="./sites/thesis/index.html">
          <div class="grid-item">
            <img class="image" src="/assets/images/code_thumnails/thesis-thumb.png" alt="Thesis" />
            <div class="image-label">Thesis</div>
          </div>
        </a>
        <a href="./sites/ballpit/index.html">
          <div class="grid-item">
            <img class="image" src="/assets/images/code_thumnails/ballpit-thumb.png" alt="Ballpit" />
            <div class="image-label">Ballpit</div>
          </div>
        </a>
      </div>
    </div> -->
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ParticleScanner from './CodeDependencies/ParticleScanner.js';
import ParticleSystem from './CodeDependencies/ParticleSystem.js';
import CardStreamController from './CodeDependencies/CardStreamController.js';

// Refs for template elements
const particleCanvasRef = ref(null);
const scannerCanvasRef = ref(null);
const cardStreamRef = ref(null);
const cardLineRef = ref(null);

// Reactive state
const speedIndicatorRef = ref(120);

// Instance variables
let cardStream = null;
let particleSystem = null;
let particleScanner = null;

// Constants
const codeChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/\"'`~?";

// Control functions
function toggleAnimation() {
  if (cardStream) {
    cardStream.toggleAnimation();
  }
}

function resetPosition() {
  if (cardStream) {
    cardStream.resetPosition();
  }
}

function changeDirection() {
  if (cardStream) {
    cardStream.changeDirection();
  }
}

// Load scripts in the correct order
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(window.THREE);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Lifecycle hooks
onMounted(async () => {
  // Wait for refs to be attached to DOM elements
  await new Promise(resolve => setTimeout(resolve, 0));
  
  try {
      console.log('Code.vue mounted, loading THREE.js...');
      const THREE = await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
      console.log('THREE.js loaded:', !!THREE);
      
      console.log('Creating CardStreamController...');
      cardStream = new CardStreamController(
        cardStreamRef.value,
        cardLineRef.value,
        (newSpeed) => {
          speedIndicatorRef.value = newSpeed;
        }
      );
      console.log('CardStreamController created');
    
      console.log('Creating ParticleSystem with canvas:', particleCanvasRef.value);
      particleSystem = new ParticleSystem(THREE, particleCanvasRef.value);
      console.log('ParticleSystem created');
      
      console.log('Creating ParticleScanner with canvas:', scannerCanvasRef.value);
      particleScanner = new ParticleScanner(THREE, scannerCanvasRef.value);
      console.log('ParticleScanner created');

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
    
    console.log('Code.vue initialization complete');
  } catch (error) {
    console.error('Error during Code.vue initialization:', error);  
  }
});

onUnmounted(() => {
  if (cardStream) {
    cardStream.destroy();
  }
  if (particleSystem) {
    particleSystem.destroy();
  }
  if (particleScanner) {
    particleScanner.destroy();
  }
  delete window.setScannerScanning;
  delete window.getScannerStats;
});

</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #000000;
  min-height: 100vh;
  overflow: hidden;
  font-family: "Arial", sans-serif;
}

.controls {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  gap: 10px;
  z-index: 100;
}

.control-btn {
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  font-size: 14px;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.speed-indicator {
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  font-size: 16px;
  background: rgba(0, 0, 0, 0.3);
  padding: 8px 16px;
  border-radius: 20px;
  backdrop-filter: blur(5px);
  z-index: 100;
}

.info {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.3);
  padding: 15px 25px;
  border-radius: 20px;
  backdrop-filter: blur(5px);
  z-index: 100;
  line-height: 1.4;
}

.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.main-container {
  padding-top: 60px;
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-stream {
  position: absolute;
  width: 100vw;
  height: 250px;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  overflow: visible;
  z-index: 5;
}

.card-line {
  display: flex;
  align-items: center;
  gap: 60px;
  white-space: nowrap;
  cursor: grab;
  user-select: none;
  will-change: transform;
}

.card-line:active {
  cursor: grabbing;
}

.card-line.dragging {
  cursor: grabbing;
}

.card-line.css-animated {
  animation: scrollCards 40s linear infinite;
}

@keyframes scrollCards {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100vw);
  }
}

.card-wrapper {
  position: relative;
  width: 400px;
  height: 250px;
  flex-shrink: 0;
}

.card {
  position: absolute;
  top: 0;
  left: 0;
  width: 400px;
  height: 250px;
  border-radius: 15px;
  overflow: hidden;
}

.card-normal {
  background: transparent;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
  color: white;
  z-index: 2;
  position: relative;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  transition: all 0.3s ease;
  filter: brightness(1.1) contrast(1.1);
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
}

.card-image:hover {
  filter: brightness(1.2) contrast(1.2);
}

.card-ascii {
  background: transparent;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 400px;
  height: 250px;
  border-radius: 15px;
  overflow: hidden;
}

.card-chip {
  width: 40px;
  height: 30px;
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  border-radius: 5px;
  position: relative;
  margin-bottom: 20px;
}

.card-chip::before {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  right: 3px;
  bottom: 3px;
  background: linear-gradient(45deg, #e6c200, #f4d03f);
  border-radius: 2px;
}

.contactless {
  position: absolute;
  top: 60px;
  left: 20px;
  width: 25px;
  height: 25px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent);
}

.contactless::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 15px;
  height: 15px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
}

.card-number {
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 3px;
  margin-bottom: 15px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.card-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.card-holder {
  color: white;
  font-size: 14px;
  text-transform: uppercase;
}

.card-expiry {
  color: white;
  font-size: 14px;
}

.card-logo {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.ascii-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: rgba(220, 210, 255, 0.6);
  font-family: "Courier New", monospace;
  font-size: 11px;
  line-height: 13px;
  overflow: hidden;
  white-space: pre;
  clip-path: inset(0 calc(100% - var(--clip-left, 0%)) 0 0);
  animation: glitch 0.1s infinite linear alternate-reverse;
  margin: 0;
  padding: 0;
  text-align: left;
  vertical-align: top;
  box-sizing: border-box;
  -webkit-mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.8) 30%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0.4) 80%,
    rgba(0, 0, 0, 0.2) 100%
  );
  mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.8) 30%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0.4) 80%,
    rgba(0, 0, 0, 0.2) 100%
  );
}

@keyframes glitch {
  0% {
    opacity: 1;
  }
  15% {
    opacity: 0.9;
  }
  16% {
    opacity: 1;
  }
  49% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
  99% {
    opacity: 0.9;
  }
  100% {
    opacity: 1;
  }
}

.scanner {
  display: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 4px;
  height: 300px;
  border-radius: 30px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(0, 255, 255, 0.8),
    rgba(0, 255, 255, 1),
    rgba(0, 255, 255, 0.8),
    transparent
  );
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.4);
  animation: scanPulse 2s ease-in-out infinite alternate;
  z-index: 10;
}

@keyframes scanPulse {
  0% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scaleY(1);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scaleY(1.1);
  }
}

.scanner-label {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(0, 255, 255, 0.9);
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.card-normal {
  clip-path: inset(0 0 0 var(--clip-right, 0%));
}

.card-ascii {
  clip-path: inset(0 calc(100% - var(--clip-left, 0%)) 0 0);
}

.scan-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 255, 255, 0.4),
    transparent
  );
  animation: scanEffect 0.6s ease-out;
  pointer-events: none;
  z-index: 5;
}

@keyframes scanEffect {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

.instructions {
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  max-width: 200px;
  text-align: right;
  z-index: 5;
}

#particleCanvas {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100vw;
  height: 250px;
  z-index: 0;
  pointer-events: none;
}

#scannerCanvas {
  position: absolute;
  top: 50%;
  left: -3px;
  transform: translateY(-50%);
  width: 100vw;
  height: 300px;
  z-index: 15;
  pointer-events: none;
}

/* .wrapper {
    padding: 0;
    margin: 0;
}

.grid {
    padding-top: 100px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    row-gap: 40px;
    box-sizing: border-box;
    max-width: 80%;
    margin: 0 auto;
}
.grid a, .grid a:hover {
    text-decoration: none;
    color: inherit;
}
.grid-item {
    box-shadow: 0px 0px 5px 0px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    height: 200px;
}

.grid-item:hover {
    box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.2);
    transition: all 2s ease;
    transform: scale(1.05);
}

.grid-item img {
    width: 100%;
    height: auto;
    max-width: 200px; 
}

.grid-item h1 {
    margin: 10px 0 0 0;
    font-size: 1.2em;
} */
</style>
