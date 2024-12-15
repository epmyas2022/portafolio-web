<template>
  <div
    id="modal"
    class="fixed top-0 left-0 right-0 bottom-0 background-overlay flex justify-center items-center z-50"
  >
    <div class="bg-white p-6 rounded">
      <slot name="title">
        <h1 class="font-bold">{{ title }}</h1>
      </slot>
      <br />
      <slot name="content">
        <p>{{ text }}</p>
      </slot>
      <br />
      <slot name="footer">
        <div class="flex gap-5">
          <button class="bg-pink-600 text-white p-2 rounded-full text-sm" @click="ok">
            Aceptar
          </button>
          <button class="bg-slate-500 text-white p-2 rounded-full text-sm" @click="close">
            Close
          </button>
        </div>
      </slot>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'

import useModal from './composable/useModal'

const props = defineProps({
  closable: {
    type: Function,
    required: false
  },

  defaultOpen: {
    type: Boolean,
    required: false,
    default: false
  },
  title: {
    type: String,
    required: false,
    default: 'Title'
  },

  text: {
    type: String,
    required: false,
    default: 'Text'
  },

  ok: {
    type: Function,
    required: false
  }
})

const { modalAnimatedClose, modalAnimatedOpen, close, ok } = useModal(props)

defineExpose({
  modalAnimatedClose,
  modalAnimatedOpen
})
onMounted(() => {
  if (props.defaultOpen) {
    modalAnimatedOpen()
  }
})
</script>

<style scoped>
.background-overlay {
  display: none;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>