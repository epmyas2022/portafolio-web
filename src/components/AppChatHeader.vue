<template>
    <div class="flex justify-between border-b dark:border-gray-700">
        <div class="flex  gap-2 p-4 ">
            <img src="https://unavatar.io/github/epmyas2022" alt="epmyas avatar github"
                class="w-12 h-12 rounded-full  border-2 border-white dark:border-gray-800" />

            <div class="flex flex-col justify-center">
                <h2 class="font-semibold">Isaac</h2>

                <p class="text-gray-600 dark:text-gray-400">
                    Asistente con IA
                </p>
            </div>

        </div>
        <button class="p-4" @click="closeChat">
            <IconChevronDown :size="30" />
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