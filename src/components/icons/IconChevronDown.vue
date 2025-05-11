<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
        :stroke-width="stroke" stroke-linecap="round" stroke-linejoin="round"
        class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 9l6 6l6 -6" />
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