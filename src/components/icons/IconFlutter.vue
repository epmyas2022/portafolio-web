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
    <path d="M7 14l-3 -3l8 -8h6z"></path>
    <path d="M14 21l-5 -5l5 -5h5l-5 5l5 5z"></path>
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
