<template>
  <main class="main-container">
    <svg class="svg-container">
      <defs>
        <filter id="turbulent-displace" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
          <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
            <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
          </feOffset>

          <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
          <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
            <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
          </feOffset>

          <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
          <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
            <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
          </feOffset>

          <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
          <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
            <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
          </feOffset>

          <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
          <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
          <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />

          <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R" yChannelSelector="B" />
        </filter>
      </defs>
    </svg>

    <div class="card-container" ref="cardContainer">
      <div class="inner-container">
          <div class="main-card"></div>
      </div>

      <div class="content-container" ref="contentContainer">
        <slot />
      </div>
    </div>
  </main>
</template>

<script setup>
// Vue 3 component setup
</script>

<style scoped>
/* CSS Variables */
.main-container {
  --electric-border-color: #dd8448;
  --electric-light-color: oklch(from var(--electric-border-color) l c h);
  --gradient-color: oklch(
    from var(--electric-border-color) 0.3 calc(c / 2) h / 0.4
  );
  --color-neutral-900: transparent(0.185 0 0);
}

/* Main container */
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* SVG positioning */
.svg-container {
  position: absolute;
}

.main-card, .main-container, .svg-container, .card-container {
  height: min(600px, 70vh) !important;
}
 .main-container{
  width: 55vw !important;
 }

@media (max-width: 768px) {
  .main-card, .main-container, .svg-container, .card-container {
    width: 80vw !important;
  }
}

/* Card container */
.card-container {
  padding: 2px;
  border-radius: 24px;
  position: relative;
  background: linear-gradient(
      -30deg,
      var(--gradient-color),
      transparent,
      var(--gradient-color)
    ),
    linear-gradient(
      to bottom,
      var(--color-neutral-900),
      var(--color-neutral-900)
    );
}

/* Inner container */
.inner-container {
  position: relative;
  z-index: 2;
}

.main-card {
  width: 55vw;
  border-radius: 24px;
  border: 4px solid var(--electric-border-color);
  margin-top: -4px;
  margin-left: -4px;
  filter: url(#turbulent-displace);
}

/* Content container */
.content-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Content sections */
.content-top {
  display: flex;
  flex-direction: column;
  padding: 48px;
  padding-bottom: 16px;
  height: 100%;
}

.content-bottom {
  display: flex;
  flex-direction: column;
  padding: 48px;
  padding-top: 16px;
}

/* Scrollbar glass component */
.scrollbar-glass {
  background: radial-gradient(
      47.2% 50% at 50.39% 88.37%,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    rgba(255, 255, 255, 0.04);
  position: relative;
  transition: background 0.3s ease;
  border-radius: 14px;
  width: fit-content;
  height: fit-content;
  padding: 8px 16px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.scrollbar-glass:hover {
  background: radial-gradient(
      47.2% 50% at 50.39% 88.37%,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    rgba(255, 255, 255, 0.08);
}

.scrollbar-glass::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1px;
  background: linear-gradient(
    150deg,
    rgba(255, 255, 255, 0.48) 16.73%,
    rgba(255, 255, 255, 0.08) 30.2%,
    rgba(255, 255, 255, 0.08) 68.2%,
    rgba(255, 255, 255, 0.6) 81.89%
  );
  border-radius: inherit;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: xor;
  -webkit-mask-composite: xor;
  pointer-events: none;
}

/* .title {
  font-size: 36px;
  font-weight: 500;
  margin-top: auto;
}

.description {
  opacity: 0.5;
}
.divider {
  margin-top: auto;
  border: none;
  height: 1px;
  background-color: currentColor;
  opacity: 0.1;
  mask-image: linear-gradient(to right, transparent, black, transparent);
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black,
    transparent
  ); 
} */
</style>
