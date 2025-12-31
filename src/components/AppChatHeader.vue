<template>
    <div class="flex justify-between items-center border-b bg-gradient-to-r from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 rounded-tr-2xl rounded-tl-2xl border-l border-r border-gray-200 dark:border-gray-700">
        <div class="flex gap-3 p-5">
            <div class="relative">
                <img src="https://unavatar.io/github/epmyas2022" alt="epmyas avatar github"
                    class="w-14 h-14 rounded-full border-3 border-white dark:border-gray-700 shadow-lg" />
                <span class="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-900"></span>
            </div>

            <div class="flex flex-col justify-center">
                <h2 class="font-bold text-lg text-gray-900 dark:text-white">Isaac</h2>
                <p class="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    Asistente con IA
                </p>
            </div>
        </div>
        
        <button class="p-4 mr-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-200" @click="closeChat">
            <IconChevronDown :size="28" class="text-gray-600 dark:text-gray-400" />
        </button>
    </div>
</template>

<script setup>
import IconChevronDown from './icons/IconChevronDown.vue';


const emit = defineEmits(['closeChat']);


const closeChat = () => {
    emit('closeChat');
};
</script>