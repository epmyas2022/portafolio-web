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
    <path d="M17 3l4 4"></path>
    <path d="M19 5l-4.5 4.5"></path>
    <path d="M11.5 6.5l6 6"></path>
    <path d="M16.5 11.5l-6.5 6.5h-4v-4l6.5 -6.5"></path>
    <path d="M7.5 12.5l1.5 1.5"></path>
    <path d="M10.5 9.5l1.5 1.5"></path>
    <path d="M3 21l3 -3"></path>
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
