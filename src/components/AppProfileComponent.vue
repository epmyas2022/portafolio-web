<template>
  <div class="-mb-12">
    <div>
      <PaperPlane class="z-0" />
    </div>

    <div class="-translate-y-20 lg:px-20 z-50">
      <div class="flex justify-between">
        <img
          class="rounded-full w-40 border-black border-4"
          src="https://unavatar.io/github/epmyas2022"
          alt=""
        />

        <div class="flex items-end">
          <a
            class="bg-pink-600 p-2 lg:text-base text-sm rounded-full text-white border-transparent hover:border-black border-4 dark:hover:border-white"
            target="_blank"
            href="https://www.linkedin.com/in/isaac-castillo-b4a213225/"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div>
        <h1 class="font-bold lg:text-4xl text-2xl mt-2 mb-2">
          Isaac Castillo
          <span class="mdi mdi-check-decagram text-pink-600"></span>
        </h1>
        <p class="text-base text-gray-600 mb-1 dark:text-gray-400">¡Vamos a construir algo increíble juntos! 🌐✨</p>
        <p class="text-base text-gray-600 dark:text-gray-400">Desarrollador Web - Frontend - Backend - Movil.</p>

        <br />
        <div class="flex flex-wrap lg:gap-4 gap-2 text-gray-500 lg:text-base text-xs dark:text-gray-400">
          <p>
            <span class="mdi mdi-briefcase"></span>
            Disponible
          </p>
          <p>
            <span class="mdi mdi-map-marker"></span>
            El Salvador, San Salvador
          </p>
          <p>
            <span class="mdi mdi-link"></span>
            <a target="_blank" href="https://github.com/epmyas2022"> epmyas.com</a>
          </p>
          <p>
            <span class="mdi mdi-cake-variant"></span>
            Julio 20, 2003
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PaperPlane from '../components/PaperPlane.vue'
</script>

