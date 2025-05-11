<template>
    <div class="flex justify-start" v-if="!isUser">
        <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-2" v-if="!pending">
            <p class="text-md text-pretty space-y-4" v-html="marked(message)"></p>
        </div>
        <p v-else class="text-md  text-gray-400 italic">Escribiendo
            <span class="animate-typing animate-pulse font-bold text-lg"></span>
        </p>
    </div>

    <div v-else class="flex justify-end">
        <div class="bg-pink-600 text-white rounded-lg p-2">
            <p class="text-md">{{ message }}</p>
        </div>
    </div>
</template>

<script setup>

import { marked } from 'marked'

defineProps({
    message: {
        type: String,
        required: true
    },

    pending: {
        type: Boolean,
        required: true
    },
    isUser: {
        type: Boolean,
        required: true
    }
})


</script>

<style scoped>
.animate-typing::after {
    content: '';
    animation: typing 2s steps(3) infinite;
}

@keyframes typing {
    0% {
        content: '.';
    }

    50% {
        content: '..';
    }

    100% {
        content: '...';
    }
}
</style>