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
    <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
    <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4"></path>
    <path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6"></path>
    <path d="M17 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6"></path>
    <path d="M11 21v-6"></path>
    <path d="M14 15v6"></path>
    <path d="M11 18h3"></path>
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
