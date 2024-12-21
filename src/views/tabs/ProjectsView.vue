<template>
  <div>
    <div
      class="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-transparent bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"
    >
      <!-- NOTE: This overflows when width is less than 310px -->
      <div
        class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-pink-400 opacity-20 blur-[100px]"
      ></div>
    </div>

    <div class="flex flex-col gap-4 items-center justify-center">
      <app-project-component
        v-for="project in projects"
        :key="project.id"
        :title="project.title"
        :description="project.description"
        :link="project.link"
      />
    </div>
  </div>
</template>

<script setup>
import AppProjectComponent from '@/components/AppProjectComponent.vue'
const projects = [
  {
    id: 1,
    title: 'Auto-Generate Swagger',
    description:
      'Este es un paquete que busca facilitar la generación de documentación de APIs en Laravel, utilizando Swagger UI.',
    link: 'https://github.com/epmyas2022/laravel-swagger'
  },
  {
    id: 2,
    title: 'Reverse Shell',
    description:
      'Proyecto que consiste en generar un payload de reverse shell en python, el cual se ejecuta en la máquina objetivo y se conecta a un servidor controlado por el atacante.',
    link: 'https://github.com/epmyas2022/reverse_shell'
  },

  {
    id: 3,
    title: 'Api Instagram Profile',
    description:
      'Este un proyecto de scraping de la API de Instagram, que permite obtener información de los perfiles de los usuarios, como el avatar, etc',
    link: 'https://github.com/epmyas2022/instagram-avatar'
  },

  {
    id: 4,
    title: 'Porfolio Json',
    description:
      'Este proyecto es una página web que facilita la creacion de un cv atraves de un json, ademas de que se pude imprimir, una forma facil de hacer tu cv.',
    link: 'https://github.com/epmyas2022/porfolio-json'
  },
  {
    id: 5,
    title: 'App de rick and morty',
    description:
      'Esta es una aplicación que consume la API de Rick and Morty, la cual muestra los personajes de la serie, con sus respectivas características, y permite filtrarlos por nombre y por estado.',
    link: 'https://github.com/epmyas2022/rick_and_morty'
  },
  {
    id: 6,
    title: 'Vunerabilidad en portal universitario',
    description:
      'Script que permite obtener la información de estudiantes y la sesion de un usuario en el portal de la universidad Pedagógica de El Salvador.',
    link: 'https://github.com/epmyas2022/uped-vunerabilidad'
  },
  {
    id: 7,
    title: 'Plugin de animaciones para Tailwind CSS',
    description:
      'El proyecto busca poder implementar una series diferentes de animaciones que se pueden usar en cualquier proyecto que se este trabajando con tailwindcss.',
    link: 'https://github.com/epmyas2022/animate-tailwind'
  },
  {
    id: 8,
    title: 'Modelo Machine Learning de emociones',
    description:
      'Este proyecto es la API de un modelo de detección de emociones. El modelo fue entrenado con 25000 textos clasisificados como positivos, negativos o netutrales. El modelo fue entrenado con la librería de machine learning de python tensorflow.',
    link: 'https://github.com/epmyas2022/tweets'
  }
]
</script>
