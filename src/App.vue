<script setup>
import AppProfileComponent from './components/AppProfileComponent.vue'
import AppChat from './components/AppChat.vue'
import { ModalsContainer } from 'vue-final-modal'
import { usePostStore } from './stores/post'
import { LocalPostDatasource } from './views/datasources/localPostDatasourceImpl'
import { PostRepositoryImpl } from './views/repositories/postRepositoryImpl'
import IconTheme from './components/icons/IconTheme.vue'
import IconGithub from './components/icons/IconGithub.vue'
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)

usePostStore().loadRespository(new PostRepositoryImpl(new LocalPostDatasource()))
</script>

<template>
  <div class="w-full dark:text-white">
    <AppChat />
    <div
      class="sticky top-0 left-0 z-50 right-0 flex justify-between items-center p-4 dark:bg-black/5 bg-white/60 backdrop-blur-sm"
    >
      <a href="https://github.com/epmyas2022" target="_blank">
        <IconGithub :color="isDark ? 'white' : 'black'" :size="30"  />
      </a>
      <button @click="toggleDark()" class="hover:bg-gray-400/30 p-2 rounded-md">
        <IconTheme :isDark="isDark" :size="26" />
      </button>
    </div>
    <div style="max-width: 1000px" class="lg:px-12 p-5 flex flex-col items-center mx-auto">
      <header class="flex-col justify-center w-full">
        <app-profile-component />
      </header>
      <RouterView />
    </div>
    <ModalsContainer />
  </div>
</template>
