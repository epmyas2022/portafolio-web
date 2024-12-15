<template>
  <div class="relative">
    <AppRichTextComponent />

    <AppModalComponent ref="modal" title="Perfil de usuario">
      <template #content>
        <div class="flex-col gap-5">
          <div class="flex flex-col gap-2">
            <label for="nombre"
              >Usuario de github
              <span class="mdi mdi-github"></span>
            </label>
            <input
              class="bg-slate-200 p-2"
              type="text"
              placeholder="example: epmyas2022"
              id="nombre"
            />
            <p class="text-xs text-gray-400">
              Nota: el usuario ingresado aparecera en la foto de perfil del post
            </p>
          </div>
        </div>
      </template>
    </AppModalComponent>

    <div class="absolute -bottom-4 right-0 text-pink-500 text-5xl hover:text-pink-600">
      <button @click="enviar">
        <span class="mdi mdi-send-circle"></span>
      </button>
    </div>
  </div>
</template>
  <script setup>
import { ref } from 'vue'
import AppRichTextComponent from '@/components/AppRichTextComponent.vue'

import AppModalComponent from '@/components/AppModalComponent.vue'
const modal = ref(null)
const enviar = () => {
  modal.value.modalAnimatedOpen()
  return false
}
</script>
  
  <style>
</style>