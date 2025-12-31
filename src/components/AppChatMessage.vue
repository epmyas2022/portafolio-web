<template>
    <div class="flex justify-start items-end gap-2" v-if="!isUser">
        <img src="https://unavatar.io/github/epmyas2022" alt="Isaac" class="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-700 flex-shrink-0" />
        <div v-if="!pending" class="bg-white dark:bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 shadow-md border border-gray-100 dark:border-gray-700 max-w-[85%]">
            <p class="text-sm leading-relaxed text-gray-800 dark:text-gray-200" v-html="marked(message)"></p>
        </div>
        <div v-else class="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 shadow-md border border-gray-100 dark:border-gray-700">
            <span class="text-sm text-gray-600 dark:text-gray-400">Escribiendo</span>
            <div class="flex gap-1">
                <span class="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
                <span class="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
                <span class="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
            </div>
        </div>
    </div>

    <div v-else class="flex justify-end">
        <div class="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-2xl rounded-br-sm px-4 py-3 shadow-lg max-w-[85%]">
            <p class="text-sm leading-relaxed">{{ message }}</p>
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