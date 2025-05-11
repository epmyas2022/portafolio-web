<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" fill="none"
        :stroke="color" :stroke-width="stroke" stroke-linecap="round" stroke-linejoin="round"
        class="icon icon-tabler icons-tabler-outline icon-tabler-send-2">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
            d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
        <path d="M6.5 12h14.5" />
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