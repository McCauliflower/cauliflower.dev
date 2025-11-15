<template>
  <div class="slice-box" :style="{ perspective: perspective + 'px' }">
    <div class="slices" :class="phaseClass" :style="{ height: height }">
        <div
          v-for="(s, i) in slicesArr"
          :key="i"
          class="slice"
          :style="sliceStyles[i]"
        >
          <img :src="encodedSrc" :alt="alt" :style="imgStyle(i)" draggable="false" />
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  slices: { type: Number, default: 12 },
  duration: { type: Number, default: 700 },
  perspective: { type: Number, default: 1000 },
  height: { type: String, default: '60vh' },
  disperse: { type: Number, default: 120 },
  orientation: { type: String, default: 'x' } // 'x' or 'y'
});

const emit = defineEmits(['transitionend']);

const phase = ref('idle'); // idle | out | in

const slicesArr = computed(() => Array.from({ length: props.slices }));

// Precompute inline styles per slice for background positioning and delays
import { toRefs } from 'vue';

const { height } = toRefs(props);

const encodedSrc = computed(() => encodeURI(props.src || ''));

const sliceStyles = computed(() => {
  const total = props.slices;
  const styles = [];
  for (let i = 0; i < total; i++) {
    const delayOut = `${i * 60}ms`;
    const delayIn = `${(total - 1 - i) * 60}ms`;
    styles.push({
      width: (100 / total) + '%',
      transition: `transform ${props.duration}ms cubic-bezier(.2,.8,.2,1), opacity ${props.duration}ms ease`,
      transitionDelay: '0ms',
      ['--delay-out']: delayOut,
      ['--delay-in']: delayIn
    });
  }
  return styles;
});

function imgStyle(i) {
  const total = props.slices;
  return {
    width: `${total * 100}%`,
    transform: `translateX(-${i * (100 / total)}%)`,
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    pointerEvents: 'none',
    userSelect: 'none'
  };
}

let timeoutHandle = null;

function startTransition(newSrc) {
  if (phase.value === 'out') return;
  phase.value = 'out';
  const stagger = 60;
  const totalOut = props.duration + (props.slices - 1) * stagger;
  clearTimeout(timeoutHandle);
  timeoutHandle = setTimeout(() => {
    // swap background image: update sliceStyles by forcing re-compute via a small trick
    // Actually, since sliceStyles depends on props.src, changing src prop will update it from parent.
    phase.value = 'in';
    const totalIn = props.duration + (props.slices - 1) * stagger;
    clearTimeout(timeoutHandle);
    timeoutHandle = setTimeout(() => {
      phase.value = 'idle';
      emit('transitionend');
    }, totalIn);
  }, totalOut);
}

watch(() => props.src, (n, o) => {
  if (!o) return;
  startTransition(n);
});

const phaseClass = computed(() => phase.value);
</script>

<style scoped>
.slice-box { width: 100%; display:flex; justify-content:center; }
.slices { display:flex; position:relative; }
.slice { height:100%; background-repeat:no-repeat; background-position:0 0; background-size:cover; box-sizing:border-box; overflow:hidden; display:flex; align-items:center; justify-content:center; }
.slices { height: 100%; }
.slice img { width: auto; height: 100%; }

/* base transition state */
.slice { transform-origin: 50% 0; }

/* out phase: rotate slices away with staggered delays (using CSS variables set inline) */
.slices.out .slice {
  opacity: 0;
  transform: rotateX(75deg) translateZ(-120px) scale(0.98);
  transition-delay: var(--delay-out, 0ms);
}

.slices.in .slice {
  opacity: 1;
  transform: rotateX(0deg) translateZ(0) scale(1);
  transition-delay: var(--delay-in, 0ms);
}

.slices.idle .slice { opacity: 1; transform: none; transition-delay: 0ms; }

</style>
