<template>
  <div>
    <div v-if="editor" class="flex gap-1 sm:gap-4 bg-gray-100 lg:p-2">
      <VTooltip v-for="item in customMenu" :key="item.name">
        <template #popper> {{ item.label }} </template>
        <button
          @click="item.clicked"
          class="bg-gra-50 hover:bg-gray-200 p-1 rounded"
          :class="`text-2xl galaxy:text-base ${item.class}`"
        >
          <span :class="item.icon"></span>
        </button>
      </VTooltip>
      <hr />
    </div>
    <EditorContent class="content-edit p-2" :editor="editor" />
  </div>
</template>

<script setup>
import useRichText from './composable/useRichText'
const { editor, customMenu, EditorContent } = useRichText()

defineExpose({
  editor
})


</script>


<style scoped>
:deep(.content-edit > div) {
  width: 100%;
  outline: none;
  border: none;
  max-height: 350px; /* Establece el máximo de altura según tus necesidades */
}


</style>