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
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
    <path d="M11 11h1l3 -4z"></path>
    <path d="M12 13h1l-4 4z"></path>
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
