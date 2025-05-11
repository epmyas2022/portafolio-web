<template>
    <div class="flex gap-2 mb-3 flex-wrap">
        <button v-for="(suggestion, index) in suggestions" :key="index"
            @click="handleSuggestionClick(suggestion)"
            class="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-600">
            <p>{{ suggestion }}</p>
        </button>

    </div>
</template>

<script setup>

defineProps({
    suggestions: Array,
});
const emit = defineEmits(['suggestionSelected']);

const handleSuggestionClick = (suggestion) => {
    emit('suggestionSelected', suggestion);
};

</script>