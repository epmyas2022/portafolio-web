<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    :stroke="color"
    stroke-linecap="round"
    stroke-linejoin="round"
    :width="size"
    :height="size"
    :stroke-width="stroke"
  >
    <path d="M20 16v-8l3 8v-8"></path>
    <path d="M15 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2z"></path>
    <path d="M1 8h3v6.5a1.5 1.5 0 0 1 -3 0v-.5"></path>
    <path
      d="M7 15a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-1a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h1a1 1 0 0 1 1 1"
    ></path>
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
