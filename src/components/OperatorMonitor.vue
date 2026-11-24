<script setup lang="ts">
import { ref, toRef } from 'vue'
import { useSpriteAnimator, type OperatorMode } from './composable/useSpriteAnimator'

const props = defineProps<{
  mode: OperatorMode
  size?: 'hero' | 'card'
}>()

const canvasEl = ref<HTMLCanvasElement | null>(null)
const modeRef = toRef(props, 'mode')

useSpriteAnimator(canvasEl, modeRef, {
  totalFrames: 96,
  fps: 24
})
</script>

<template>
  <div class="pixel-avatar-wrap" :class="size || 'hero'">
    <canvas
      ref="canvasEl"
      width="680"
      height="680"
      class="pixel-avatar-canvas"
      aria-label="Avatar pixel-art animado de Isaac Castillo"
    ></canvas>
  </div>
</template>

<style scoped>
.pixel-avatar-wrap {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
}

.pixel-avatar-wrap.hero {
  max-width: 600px;
  aspect-ratio: 1 / 1;
}

.pixel-avatar-wrap.card {
  max-width: 360px;
  aspect-ratio: 1 / 1;
}

.pixel-avatar-canvas {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center bottom;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}

@media (max-width: 767px) {
  .pixel-avatar-wrap.hero {
    max-width: 340px;
  }
  .pixel-avatar-wrap.card {
    max-width: 240px;
  }
}

@media (max-width: 480px) {
  .pixel-avatar-wrap.hero {
    max-width: 270px;
  }
  .pixel-avatar-wrap.card {
    max-width: 190px;
  }
}
</style>
