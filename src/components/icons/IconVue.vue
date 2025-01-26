<template>
  <svg
    fill="none"
    :stroke="color"
    stroke-linecap="round"
    stroke-linejoin="round"
    :width="size"
    :height="size"
    :stroke-width="stroke"
  >
    <path d="M16.5 4l-4.5 8l-4.5 -8"></path>
    <path d="M3 4l9 16l9 -16"></path>
  </svg>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: 'currentColor'
  },
  stroke: {
    type: String,
    default: '2'
  },
  size: {
    type: Number,
    default: 20
  }
})
</script>
