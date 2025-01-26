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
        :languages="project.languages"
      />
    </div>
  </div>
</template>

<script setup>
import AppProjectComponent from '@/components/AppProjectComponent.vue'
import IconLaravel from '../../components/icons/IconLaravel.vue'
import IconPhp from '../../components/icons/IconPhp.vue'
import IconPython from '../../components/icons/IconPython.vue'
import IconSocket from '../../components/icons/IconSocket.vue'
import IconNode from '../../components/icons/IconNode.vue'
import IconJson from '../../components/icons/IconJson.vue'
import IconVue from '../../components/icons/IconVue.vue'
import IconFlutter from '../../components/icons/IconFlutter.vue'
import IconApi from '../../components/icons/IconApi.vue'
import IconInject from '../../components/icons/IconInject.vue'
import IconTailwind from '../../components/icons/IconTailwind.vue'
import IconCss from '../../components/icons/IconCss.vue'
const projects = [
  {
    id: 1,
    title: 'Auto-Generate Swagger',
    description:
      'Este es un paquete que busca facilitar la generación de documentación de APIs en Laravel utilizando Swagger UI.',
    link: 'https://github.com/epmyas2022/laravel-swagger',
    languages: [
      { name: 'Laravel', icon: IconLaravel },
      { name: 'PHP', icon: IconPhp }
    ]
  },
  {
    id: 2,
    title: 'Reverse Shell',
    description:
      'Proyecto que consiste en generar un payload de reverse shell en Python, el cual se ejecuta en la máquina objetivo y se conecta a un servidor controlado por el atacante',
    link: 'https://github.com/epmyas2022/reverse_shell',
    languages: [
      { name: 'Python', icon: IconPython },
      { name: 'Socket', icon: IconSocket }
    ]
  },

  {
    id: 3,
    title: 'Api Instagram Profile',
    description:
      'Este es un proyecto de scraping de la API de Instagram que permite obtener información de los perfiles de los usuarios, como el avatar, entre otros.',
    link: 'https://github.com/epmyas2022/instagram-avatar',

    languages: [
      { name: 'Node JS', icon: IconNode },
      { name: 'Json', icon: IconJson }
    ]
  },

  {
    id: 4,
    title: 'Porfolio Json',
    description:
      'Este proyecto es una página web que facilita la creación de un CV a través de un JSON. Además, permite imprimirlo, ofreciendo una forma fácil de crear tu CV.',
    link: 'https://github.com/epmyas2022/porfolio-json',
    languages: [
      { name: 'Node JS', icon: IconNode },
      { name: 'Json', icon: IconJson },
      { name: 'Vue', icon: IconVue }
    ]
  },
  {
    id: 5,
    title: 'App de Rick and Morty',
    description:
      'Esta es una aplicación que consume la API de Rick and Morty. Muestra los personajes de la serie con sus respectivas características y permite filtrarlos por nombre y estado.',
    link: 'https://github.com/epmyas2022/rick_and_morty',
    languages: [
      { name: 'Flutter', icon: IconFlutter },
      { name: 'Api', icon: IconApi }
    ]
  },
  {
    id: 6,
    title: 'Vunerabilidad en portal universitario',
    description:
      'Script que permite obtener la información de estudiantes y la sesión de un usuario en el portal de la Universidad Pedagógica de El Salvador.',
    link: 'https://github.com/epmyas2022/uped-vunerabilidad',
    languages: [
      { name: 'Node JS', icon: IconNode },
      { name: 'Json', icon: IconJson },
      { name: 'Inject SQL', icon: IconInject }
    ]
  },
  {
    id: 7,
    title: 'Plugin de animaciones para Tailwind CSS',
    description:
      'El proyecto busca implementar una serie de animaciones diferentes que se pueden usar en cualquier proyecto que esté trabajando con TailwindCSS.',
    link: 'https://github.com/epmyas2022/animate-tailwind',
    languages: [
      { name: 'Node JS', icon: IconNode },
      { name: 'Tailwind', icon: IconTailwind },
      { name: 'CSS', icon: IconCss }
    ]
  },
  {
    id: 8,
    title: 'Modelo Machine Learning de emociones',
    description:
      'Este proyecto es la API de un modelo de detección de emociones. El modelo fue entrenado con 25,000 textos clasificados como positivos, negativos o neutrales. Fue desarrollado utilizando la librería de machine learning TensorFlow en Python',
    link: 'https://github.com/epmyas2022/tweets',
    languages: [{ name: 'Python', icon: IconPython }]
  }
]
</script>
