<template>
  <div>
    <h1 class="font-bold lg:text-2xl text-lg mb-4">Acerca de</h1>
    
    <div class="space-y-4">
      <!-- Experiencia -->
      <div class="hover:bg-gray-50 lg:p-4 p-2 rounded-lg dark:hover:bg-gray-500/10">
        <h2 class="font-bold text-base mb-2">💼 Experiencia</h2>
        <p class="leading-relaxed text-balance">
          He tenido el privilegio de formar parte activa de la <span class="font-semibold">Secretaría de Innovación de la Presidencia</span>,
          donde he contribuido significativamente a impulsar soluciones innovadoras para desafíos
          gubernamentales.
        </p>
      </div>

      <!-- Habilidades -->
      <div class="hover:bg-gray-50 lg:p-4 p-2 rounded-lg dark:hover:bg-gray-500/10">
        <h2 class="font-bold text-base mb-2">⚡ Habilidades</h2>
        <p class="leading-relaxed text-balance mb-3">
          Mis aptitudes abarcan un amplio espectro de desarrollo, respaldadas por una sólida
          experiencia en la ejecución de proyectos estratégicos que han optimizado procesos y mejorado la
          eficiencia en el ámbito gubernamental.
        </p>
        <div class="flex flex-wrap gap-2">
          <div class="bg-gray-300/70 dark:bg-gray-300/30 px-4 py-1 rounded-full">
            <p class="font-semibold lg:text-sm text-xs">🌐 Desarrollo Web</p>
          </div>
          <div class="bg-gray-300/70 dark:bg-gray-300/30 px-4 py-1 rounded-full">
            <p class="font-semibold lg:text-sm text-xs">Backend</p>
          </div>
          <div class="bg-gray-300/70 dark:bg-gray-300/30 px-4 py-1 rounded-full">
            <p class="font-semibold lg:text-sm text-xs">Frontend</p>
          </div>
          <div class="bg-gray-300/70 dark:bg-gray-300/30 px-4 py-1 rounded-full">
            <p class="font-semibold lg:text-sm text-xs">📱 Móvil</p>
          </div>
        </div>
      </div>

      <!-- Timeline -->
      <div class="hover:bg-gray-50 lg:p-4 p-2 rounded-lg dark:hover:bg-gray-500/10">
        <h2 class="font-bold text-base mb-4">📅 Timeline</h2>
        
        <div class="relative pl-8 space-y-6">
          <!-- Línea vertical -->
          <div class="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
          
          <!-- Item 1 -->
          <div class="relative">
            <div class="absolute -left-[26px] w-4 h-4 rounded-full bg-gray-400 dark:bg-gray-500 border-2 border-white dark:border-black"></div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="font-bold text-sm">2024 - Presente</span>
                <div class="bg-gray-300/70 dark:bg-gray-300/30 px-3 py-0.5 rounded-full">
                  <p class="font-semibold text-xs">Actual</p>
                </div>
              </div>
              <h3 class="font-semibold mb-1">Secretaría de Innovación de la Presidencia</h3>
              <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Desarrollo de soluciones innovadoras para optimizar procesos gubernamentales y mejorar la eficiencia en el sector público.
              </p>
            </div>
          </div>

          <!-- Item 2 -->
          <div class="relative">
            <div class="absolute -left-[26px] w-4 h-4 rounded-full bg-gray-400 dark:bg-gray-500 border-2 border-white dark:border-black"></div>
            <div>
              <span class="font-bold text-sm">2023 - 2024</span>
              <h3 class="font-semibold mb-1">Proyectos Full Stack</h3>
              <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Desarrollo de aplicaciones web y móviles utilizando tecnologías modernas como Vue, Laravel, Flutter y Node.js.
              </p>
            </div>
          </div>

          <!-- Item 3 -->
          <div class="relative">
            <div class="absolute -left-[26px] w-4 h-4 rounded-full bg-gray-400 dark:bg-gray-500 border-2 border-white dark:border-black"></div>
            <div>
              <span class="font-bold text-sm">2022 - 2023</span>
              <h3 class="font-semibold mb-1">Especialización en Backend</h3>
              <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Profundización en arquitecturas de microservicios, APIs RESTful y bases de datos relacionales y NoSQL.
              </p>
            </div>
          </div>

          <!-- Item 4 -->
          <div class="relative">
            <div class="absolute -left-[26px] w-4 h-4 rounded-full bg-gray-400 dark:bg-gray-500 border-2 border-white dark:border-black"></div>
            <div>
              <span class="font-bold text-sm">2021 - 2022</span>
              <h3 class="font-semibold mb-1">Inicio en Desarrollo Web</h3>
              <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Primeros pasos en el mundo del desarrollo web, aprendiendo HTML, CSS, JavaScript y frameworks modernos.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Visión -->
      <div class="hover:bg-gray-50 lg:p-4 p-2 rounded-lg dark:hover:bg-gray-500/10">
        <h2 class="font-bold text-base mb-2">🚀 Visión</h2>
        <p class="leading-relaxed text-balance">
          Estoy entusiasmado por seguir contribuyendo al avance de la innovación, explorando nuevas tecnologías 
          y colaborando en proyectos que generen un impacto positivo en la sociedad.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
