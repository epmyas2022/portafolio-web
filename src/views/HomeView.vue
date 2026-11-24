<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import OperatorMonitor from '@/components/OperatorMonitor.vue'
import type { OperatorMode } from '@/components/composable/useSpriteAnimator'
import {
  operatorProfile,
  dossierProjects,
  timelineEntries,
  technicalCapabilities,
  type DossierProject
} from '@/shared/data/dossierData'

// Hero & RPG Character Mode State
const heroMode = ref<OperatorMode>('saludo')
const rpgModeIndex = ref<number>(0)

// Scroll state for AppBar background color & active section tracking
const isScrolled = ref<boolean>(false)

const characterModes: {
  id: OperatorMode
  title: string
  subtitle: string
  fileExe: string
  level: string
}[] = [
  {
    id: 'saludo',
    title: 'Developer Mode',
    subtitle:
      'Construyo plataformas para la Secretaría de Innovación de la Presidencia y arquitecturas web limpias en Vue 3 y Laravel.',
    fileExe: 'isaac_dev.exe',
    level: 'LVL. 23'
  },
  {
    id: 'computo',
    title: 'Security & Systems Mode',
    subtitle:
      'Automatizo contratos OpenAPI, entreno modelos NLP en TensorFlow y audito sesiones, sockets y vectores SQLi antes de producción.',
    fileExe: 'sec_kernel.sys',
    level: 'LVL. 23'
  },
  {
    id: 'celebracion',
    title: 'Ship & Impact Mode',
    subtitle:
      'Código en producción que resuelve problemas reales: desde paquetes open-source hasta infraestructura gubernamental.',
    fileExe: 'deploy_ok.bat',
    level: 'LVL. 23'
  }
]

const currentRpgMode = computed(() => characterModes[rpgModeIndex.value])

const selectHeroMode = (mode: OperatorMode, index: number) => {
  heroMode.value = mode
  rpgModeIndex.value = index
}

const prevRpgMode = () => {
  rpgModeIndex.value = (rpgModeIndex.value - 1 + characterModes.length) % characterModes.length
  heroMode.value = characterModes[rpgModeIndex.value].id
}

const nextRpgMode = () => {
  rpgModeIndex.value = (rpgModeIndex.value + 1) % characterModes.length
  heroMode.value = characterModes[rpgModeIndex.value].id
}

// Rotating Pixel Speech Bubble Greeting
const greetings = ['¡Hola!', 'Hello!', 'console.log()', '200 OK', 'San Salvador']
const greetingIdx = ref(0)
let greetingTimer: number | null = null

// Retro OS Project Windows & Active Case Modal
const activeProjectModal = ref<DossierProject | null>(null)
const isContactOpen = ref(false)
const copiedEmail = ref(false)
const activeSectionId = ref<string>('hero')
const sectionIds = ['hero', 'about', 'windows', 'stack', 'world']

const windowFiles = computed(() => {
  const extensions = ['.exe', '.sys', '.dll', '.py', '.pkg', '.json']
  return dossierProjects.map((proj, idx) => ({
    ...proj,
    filename: `${proj.id.replace(/-/g, '_')}${extensions[idx % extensions.length]}`,
    progressBlocks: 9 + (idx % 4)
  }))
})

const openProjectWindow = (proj: DossierProject) => {
  activeProjectModal.value = proj
}

const closeProjectWindow = () => {
  activeProjectModal.value = null
}

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(operatorProfile.email)
    copiedEmail.value = true
    setTimeout(() => {
      copiedEmail.value = false
    }, 2800)
  } catch {
    window.location.href = `mailto:${operatorProfile.email}`
  }
}

const scrollToSection = (id: string) => {
  activeSectionId.value = id
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleWindowScroll = () => {
  const scrollY = window.scrollY || window.pageYOffset
  isScrolled.value = scrollY > 24

  const viewportMid = scrollY + window.innerHeight * 0.4
  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (el) {
      const top = el.offsetTop
      const height = el.offsetHeight
      if (viewportMid >= top && viewportMid < top + height) {
        activeSectionId.value = id
        break
      }
    }
  }
}

// Pixel Transition Grid Overlay on Mode Change
const isGridFlashing = ref(false)
const triggerPixelTransition = (mode: OperatorMode, idx: number) => {
  isGridFlashing.value = true
  selectHeroMode(mode, idx)
  setTimeout(() => {
    isGridFlashing.value = false
  }, 260)
}

onMounted(() => {
  handleWindowScroll()
  window.addEventListener('scroll', handleWindowScroll, { passive: true })

  greetingTimer = window.setInterval(() => {
    greetingIdx.value = (greetingIdx.value + 1) % greetings.length
  }, 2600)

  gsap.from('#hero-copy > *', {
    opacity: 0,
    y: 24,
    stagger: 0.12,
    duration: 0.7,
    ease: 'power3.out'
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleWindowScroll)
  if (greetingTimer !== null) clearInterval(greetingTimer)
})
</script>

<template>
  <div class="jld-site">
    <!-- ============================================================
         STICKY TOP APPBAR (Changes background & border on scroll)
         ============================================================ -->
    <header id="masthead" :class="{ 'is-scrolled': isScrolled }">
      <div class="container masthead-inner">
        <a href="#hero" class="site-logo" @click.prevent="scrollToSection('hero')">
          <span class="logo-box">IC</span>
          <span class="logo-text">ISAAC<span class="lime">'26</span></span>
        </a>

        <nav class="masthead-quick-links" aria-label="Navegación rápida">
          <button
            type="button"
            class="quick-link"
            :class="{ active: activeSectionId === 'about' }"
            @click="scrollToSection('about')"
          >
            PERFIL
          </button>
          <button
            type="button"
            class="quick-link"
            :class="{ active: activeSectionId === 'windows' }"
            @click="scrollToSection('windows')"
          >
            PROYECTOS
          </button>
          <button
            type="button"
            class="quick-link"
            :class="{ active: activeSectionId === 'stack' }"
            @click="scrollToSection('stack')"
          >
            STACK
          </button>
        </nav>

        <button type="button" class="header-cta-pixel" @click="isContactOpen = true">
          C:/CONTACT.EXE
        </button>
      </div>
    </header>

    <!-- ============================================================
         LEFT FLOATING 8-BIT DOCK (GitHub, LinkedIn, Contact Phone)
         ============================================================ -->
    <aside id="home-dock" aria-label="Accesos directos">
      <a
        :href="operatorProfile.githubUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="dock-btn"
        title="GitHub // epmyas2022"
      >
        <svg viewBox="0 0 24 24" shape-rendering="crispEdges">
          <path d="M2 4h8v2h12v14H2V4zm2 4v10h16V8H4z" />
          <path d="M8 11h2v2H8v-2zm6 0h2v2h-2v-2zm-4 3h4v2h-4v-2z" />
        </svg>
      </a>

      <a
        :href="operatorProfile.linkedinUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="dock-btn"
        title="LinkedIn // Isaac Castillo"
      >
        <svg viewBox="0 0 24 24" shape-rendering="crispEdges">
          <path d="M4 2h16v20H4V2zm2 2v16h12V4H6zm4 3h4v4h-4V7zm-2 6h8v4H8v-4z" />
        </svg>
      </a>

      <button
        type="button"
        class="dock-btn dock-phone"
        title="Abrir C:/ISAAC.DEV/CONTACT"
        @click="isContactOpen = true"
      >
        <svg viewBox="0 0 24 24" shape-rendering="crispEdges">
          <path d="M2 5h20v14H2V5zm2 2v2h2v2h2v2h8v-2h2V9h2V7H4zm0 4v6h16v-6h-2v2h-2v2H8v-2H6v-2H4z" />
        </svg>
      </button>
    </aside>

    <!-- ============================================================
         RIGHT FLOATING ARCADE DOT NAV
         ============================================================ -->
    <nav id="section-nav" aria-label="Secciones de la página">
      <ul class="section-nav-list">
        <li v-for="sec in sectionIds" :key="sec">
          <button
            type="button"
            class="nav-dot-btn"
            :class="{ active: activeSectionId === sec }"
            :title="sec.toUpperCase()"
            @click="scrollToSection(sec)"
          >
            <span class="pixel-pellet"></span>
          </button>
        </li>
      </ul>
    </nav>

    <!-- ============================================================
         SECTION 1: HERO (100SVH — GIANT PIXEL AVATAR + SPEECH BUBBLE + MODES)
         ============================================================ -->
    <section id="hero" class="section hero-section">
      <div class="container hero-inner">
        <!-- LEFT 50%: Giant Pixel Avatar + Floating 8-bit Speech Bubble -->
        <div id="hero-avatar-wrap">
          <div id="hero-bubble" class="bubble-float">
            <div id="hero-greeting">
              {{ greetings[greetingIdx] }}<span class="greeting-cursor">_</span>
            </div>
            <svg
              id="hero-bubble-tail"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 32"
              shape-rendering="crispEdges"
            >
              <path d="M8 0H0V8H8V0Z" fill="#FFFFFF" />
              <path d="M16 0H8V8H16V0Z" fill="#FFFFFF" />
              <path d="M24 0H16V8H24V0Z" fill="#FFFFFF" />
              <path d="M16 8H8V16H16V8Z" fill="#FFFFFF" />
              <path d="M24 8H16V16H24V8Z" fill="#FFFFFF" />
              <path d="M24 16H16V24H24V16Z" fill="#FFFFFF" />
              <path d="M16 24H8V32H16V24Z" fill="#FFFFFF" />
            </svg>
          </div>

          <div class="hero-stage-canvas" :class="{ 'flash-grid': isGridFlashing }">
            <OperatorMonitor :mode="heroMode" size="hero" />
          </div>
        </div>

        <!-- RIGHT 50%: Monumental Display Headline + 8-Bit Mode Selector Arrows -->
        <div id="hero-copy">
          <p class="hero-eyebrow">SAN SALVADOR, EL SALVADOR // FULL-STACK &amp; SECURITY</p>
          <h1 id="hero-title">
            Transformando Píxeles y Código en Sistemas Memorables.
          </h1>
          <p id="hero-lead">
            Arquitectura limpia, automatización de APIs y seguridad ofensiva.
            Construyendo software con identidad propia desde la Secretaría de Innovación hasta el open-source.
          </p>

          <!-- 8-Bit Mode Selector Buttons with Pixel Triangle Arrows -->
          <div id="hero-modes" role="group" aria-label="Seleccionar modo del personaje">
            <button
              v-for="(m, idx) in characterModes"
              :key="m.id"
              type="button"
              class="selection-button"
              :class="{ 'selection-button-active': heroMode === m.id }"
              @click="triggerPixelTransition(m.id, idx)"
            >
              <svg
                class="selection-arrow"
                viewBox="0 0 92 161"
                shape-rendering="crispEdges"
              >
                <polygon
                  points="69 69 69 46 46 46 46 23 23 23 23 0 0 0 0 161 23 161 23 138 46 138 46 115 69 115 69 92 92 92 92 69 69 69"
                  fill="currentColor"
                />
              </svg>
              <span class="selection-text">{{ m.title }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         SECTION 2: ABOUT / RPG CHARACTER SELECTOR CARD (LVL + 3 HEARTS)
         ============================================================ -->
    <section id="about" class="section about-section">
      <div class="container about-inner">
        <div class="about-header">
          <h2 class="section-heading text-center">
            El Ingeniero Detrás del <br /><span class="lime">Código y los Píxeles.</span>
          </h2>
          <p class="about-lead text-center">
            {{ currentRpgMode.subtitle }}
          </p>
        </div>

        <!-- RPG CHARACTER CARD -->
        <div id="about-card">
          <!-- Top Bar: LVL + 3 Pixel Hearts (#EE3B3E) -->
          <div id="about-stats">
            <div id="about-level">{{ currentRpgMode.level }}</div>
            <div id="about-hearts" aria-label="3 corazones de energía">
              <svg
                v-for="n in 3"
                :key="n"
                class="creator-health"
                viewBox="0 0 56 48"
                fill="none"
                shape-rendering="crispEdges"
              >
                <path
                  d="M8 8H0V24H8V8ZM16 0H8V32H16V0ZM24 0H16V40H24V0ZM32 8H24V48H32V8ZM40 0H32V40H40V0ZM48 0H40V32H48V0ZM56 8H48V24H56V8Z"
                  fill="#EE3B3E"
                />
              </svg>
            </div>
          </div>

          <!-- Center: Left Pixel Arrow + Animated Character Box + Right Pixel Arrow -->
          <div id="about-character">
            <button
              type="button"
              class="mode-arrow"
              aria-label="Modo anterior"
              @click="prevRpgMode"
            >
              <svg viewBox="0 0 92 161" shape-rendering="crispEdges">
                <polygon
                  points="23 92 23 115 46 115 46 138 69 138 69 161 92 161 92 0 69 0 69 23 46 23 46 46 23 46 23 69 0 69 0 92 23 92"
                />
              </svg>
            </button>

            <div class="character-stage-box">
              <div class="stage-file-tag">{{ currentRpgMode.fileExe }}</div>
              <OperatorMonitor :mode="currentRpgMode.id" size="card" />
            </div>

            <button
              type="button"
              class="mode-arrow"
              aria-label="Siguiente modo"
              @click="nextRpgMode"
            >
              <svg viewBox="0 0 92 161" shape-rendering="crispEdges">
                <polygon
                  points="69 69 69 46 46 46 46 23 23 23 23 0 0 0 0 161 23 161 23 138 46 138 46 115 69 115 69 92 92 92 92 69 69 69"
                />
              </svg>
            </button>
          </div>

          <!-- Bottom Actions: Active Mode Box + Action CTA -->
          <div id="about-actions">
            <div class="mode-badge-box">
              <span>{{ currentRpgMode.title }}</span>
            </div>
            <button
              type="button"
              class="btn-pixel-lime"
              @click="scrollToSection('windows')"
            >
              EXPLORAR PROYECTOS.EXE
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         SECTION 3: RETRO OS WINDOWS SHOWCASE (PROJECTS AS .EXE / .DLL WINDOWS)
         ============================================================ -->
    <section id="windows" class="section windows-section">
      <div class="container windows-inner">
        <div class="windows-header">
          <p class="pixel-kicker">C:/ISAAC/PROJECTS_EXECUTABLE</p>
          <h2 class="section-heading">
            Las ideas no valen nada <br /><span class="lime">sin manos que las programen.</span>
          </h2>
          <p class="windows-sub">
            Hacé clic en cualquier módulo ejecutable para inspeccionar el problema real, la arquitectura y el repositorio.
          </p>
        </div>

        <!-- RETRO OS WINDOWS GRID -->
        <div class="os-windows-grid">
          <article
            v-for="win in windowFiles"
            :key="win.id"
            class="os-window"
            @click="openProjectWindow(win)"
          >
            <!-- Title Bar -->
            <div class="window-title-bar">
              <span class="window-title-text">{{ win.filename }}</span>
              <span class="window-close-box" aria-hidden="true">
                <svg viewBox="0 0 69 69" shape-rendering="crispEdges">
                  <path d="M46 23H23V46H46V23Z" fill="currentColor" />
                  <path d="M23 0H0V23H23V0Z" fill="currentColor" />
                  <path d="M69 0H46V23H69V0Z" fill="currentColor" />
                  <path d="M69 46H46V69H69V46Z" fill="currentColor" />
                  <path d="M23 46H0V69H23V46Z" fill="currentColor" />
                </svg>
              </span>
            </div>

            <!-- Window Body -->
            <div class="window-body">
              <div class="window-body-content">
                <span class="win-category">{{ win.category }}</span>
                <h3 class="win-heading">{{ win.title }}</h3>
                <p class="win-problem">{{ win.problem }}</p>

                <!-- 12-Block Retro Progress Bar -->
                <div class="win-progress" aria-hidden="true">
                  <i
                    v-for="b in 12"
                    :key="b"
                    :class="{ filled: b <= win.progressBlocks }"
                  ></i>
                </div>

                <div class="win-footer-row">
                  <span class="win-stack">{{ win.stack.slice(0, 3).join(' · ') }}</span>
                  <span class="win-open-cmd">[RUN ↗]</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ============================================================
         SECTION 4: DNA & TRAYECTORIA (GOVTECH + STACK)
         ============================================================ -->
    <section id="stack" class="section stack-section">
      <div class="container stack-inner">
        <div class="stack-two-col">
          <!-- Left: Architecture DNA -->
          <div class="dna-column">
            <p class="pixel-kicker">SYSTEM_DNA.SYS</p>
            <h2 class="section-heading">
              Más que código que funciona: <span class="lime">sistemas que resisten.</span>
            </h2>

            <div class="cap-cards">
              <article
                v-for="cap in technicalCapabilities"
                :key="cap.domain"
                class="cap-pixel-card"
              >
                <h3>{{ cap.domain }}</h3>
                <p class="cap-tools-line">{{ cap.tools }}</p>
                <p class="cap-desc-line">{{ cap.note }}</p>
              </article>
            </div>
          </div>

          <!-- Right: Log / Timeline -->
          <div class="log-column">
            <p class="pixel-kicker">QUEST_LOG // 2021 — 2026</p>
            <div class="quest-list">
              <article
                v-for="entry in timelineEntries"
                :key="entry.code"
                class="quest-card"
              >
                <div class="quest-top">
                  <span class="quest-period">{{ entry.period }}</span>
                  <span class="quest-code">{{ entry.code }}</span>
                </div>
                <h3 class="quest-role">{{ entry.role }}</h3>
                <p class="quest-org">{{ entry.organization }}</p>
                <p class="quest-summary">{{ entry.summary }}</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         SECTION 5: FINAL CTA / WORLD
         ============================================================ -->
    <section id="world" class="section world-section">
      <div class="container world-inner">
        <p class="pixel-kicker">READY PLAYER ONE // SAN SALVADOR [13.69° N, 89.21° W]</p>
        <h2 id="world-title" class="section-heading text-center">
          Construyamos tu próximo sistema,<br />
          <span class="lime">un píxel y un endpoint a la vez.</span>
        </h2>

        <div class="world-actions">
          <button type="button" class="btn-pixel-lime btn-xl" @click="isContactOpen = true">
            ABRIR C:/ISAAC.DEV/CONTACT
          </button>
          <button type="button" class="btn-pixel-outline" @click="copyEmail">
            {{ copiedEmail ? '¡COPIADO AL PORTAPAPELES!' : operatorProfile.email }}
          </button>
        </div>

        <div class="world-socials">
          <a
            :href="operatorProfile.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="world-social-link"
          >
            ► GITHUB / EPMYAS2022
          </a>
          <a
            :href="operatorProfile.linkedinUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="world-social-link"
          >
            ► LINKEDIN / ISAAC CASTILLO
          </a>
        </div>

        <footer class="home-footer">© ISAAC CASTILLO 2026 // PIXEL &amp; SYSTEMS EDITION</footer>
      </div>
    </section>

    <!-- ============================================================
         MODAL 1: PROJECT EXECUTABLE INSPECTOR
         ============================================================ -->
    <div
      v-if="activeProjectModal"
      class="retro-modal-backdrop"
      role="dialog"
      aria-modal="true"
      @click.self="closeProjectWindow"
    >
      <div class="cm-window">
        <div class="cm-titlebar">
          <div class="cm-title">C:/ISAAC.DEV/PROJECTS/{{ activeProjectModal.id.toUpperCase() }}</div>
          <button
            type="button"
            class="cm-close"
            aria-label="Cerrar ventana"
            @click="closeProjectWindow"
          >
            <svg viewBox="0 0 69 69" shape-rendering="crispEdges">
              <path d="M46 23H23V46H46V23Z" fill="currentColor" />
              <path d="M23 0H0V23H23V0Z" fill="currentColor" />
              <path d="M69 0H46V23H69V0Z" fill="currentColor" />
              <path d="M69 46H46V69H69V46Z" fill="currentColor" />
              <path d="M23 46H0V69H23V46Z" fill="currentColor" />
            </svg>
          </button>
        </div>

        <div class="cm-body">
          <span class="modal-cat-badge">{{ activeProjectModal.category }} // {{ activeProjectModal.year }}</span>
          <h3 class="cm-heading">{{ activeProjectModal.title }}</h3>

          <div class="modal-anatomy-block">
            <h4>01 // EL PROBLEMA</h4>
            <p>{{ activeProjectModal.problem }}</p>
          </div>

          <div class="modal-anatomy-block">
            <h4>02 // ARQUITECTURA &amp; EJECUCIÓN</h4>
            <p>{{ activeProjectModal.implementation }}</p>
          </div>

          <div class="modal-anatomy-block">
            <h4>03 // RESULTADO VERIFICABLE</h4>
            <p>{{ activeProjectModal.outcome }}</p>
          </div>

          <div class="modal-stack-pills">
            <span v-for="t in activeProjectModal.stack" :key="t" class="modal-pill">{{ t }}</span>
          </div>

          <div class="cm-actions">
            <a
              :href="activeProjectModal.repositoryUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="cm-submit"
            >
              VER CÓDIGO EN GITHUB ↗
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================
         MODAL 2: C:/ISAAC.DEV/CONTACT
         ============================================================ -->
    <div
      v-if="isContactOpen"
      class="retro-modal-backdrop"
      role="dialog"
      aria-modal="true"
      @click.self="isContactOpen = false"
    >
      <div class="cm-window">
        <div class="cm-titlebar">
          <div class="cm-title">C:/ISAAC.DEV/CONTACT</div>
          <button
            type="button"
            class="cm-close"
            aria-label="Cerrar contacto"
            @click="isContactOpen = false"
          >
            <svg viewBox="0 0 69 69" shape-rendering="crispEdges">
              <path d="M46 23H23V46H46V23Z" fill="currentColor" />
              <path d="M23 0H0V23H23V0Z" fill="currentColor" />
              <path d="M69 0H46V23H69V0Z" fill="currentColor" />
              <path d="M69 46H46V69H69V46Z" fill="currentColor" />
              <path d="M23 46H0V69H23V46Z" fill="currentColor" />
            </svg>
          </button>
        </div>

        <div class="cm-body">
          <h3 class="cm-heading">Las buenas ideas merecen arquitectura sólida. Conectemos.</h3>
          <p class="cm-subcopy">
            Estoy disponible para proyectos full-stack, desarrollo en Vue / Laravel / Flutter y auditorías de seguridad.
          </p>

          <div class="contact-direct-boxes">
            <button type="button" class="contact-retro-row" @click="copyEmail">
              <span class="c-key">EMAIL DIRECTO:</span>
              <span class="c-val">{{ operatorProfile.email }}</span>
              <span class="c-action">{{ copiedEmail ? '[¡COPIADO!]' : '[COPIAR]' }}</span>
            </button>

            <a
              :href="`mailto:${operatorProfile.email}`"
              class="contact-retro-row"
            >
              <span class="c-key">CLIENTE DE CORREO:</span>
              <span class="c-val">Abrir aplicación de correo</span>
              <span class="c-action">[LAUNCH ↗]</span>
            </a>

            <a
              :href="operatorProfile.linkedinUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-retro-row"
            >
              <span class="c-key">LINKEDIN:</span>
              <span class="c-val">in/isaac-castillo-b4a213225</span>
              <span class="c-action">[ABRIR ↗]</span>
            </a>

            <a
              :href="operatorProfile.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-retro-row"
            >
              <span class="c-key">GITHUB:</span>
              <span class="c-val">github.com/epmyas2022</span>
              <span class="c-action">[VER REPOS ↗]</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ============================================================
   GLOBAL CONTAINER & SECTION ARCHITECTURE (JLD2ND.DEV STYLE)
   ============================================================ */
.jld-site {
  width: 100%;
  background-color: var(--color-ink);
  color: var(--color-white);
  position: relative;
  overflow-x: hidden;
}

.section {
  width: 100%;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 110px var(--page-gutter);
  position: relative;
}

.container {
  width: 100%;
  max-width: 1380px;
  margin: 0 auto;
}

.lime {
  color: var(--color-lime);
}

.text-center {
  text-align: center;
}

.pixel-kicker {
  font-family: var(--font-pixel);
  font-size: 0.82rem;
  color: var(--color-lime);
  letter-spacing: 0.08em;
  margin-bottom: 14px;
  word-break: break-word;
}

.section-heading {
  font-family: var(--font-heading);
  font-size: var(--fs-display-md);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: var(--color-white);
  text-wrap: balance;
}

/* ============================================================
   STICKY TOP APPBAR WITH SCROLL COLOR TRANSITION
   ============================================================ */
#masthead {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 960;
  padding: 20px var(--page-gutter);
  background-color: transparent;
  border-bottom: 2px solid transparent;
  transition:
    background-color 220ms cubic-bezier(0.22, 1, 0.36, 1),
    padding 220ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 220ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

#masthead.is-scrolled {
  background-color: rgba(18, 18, 18, 0.96);
  backdrop-filter: blur(8px);
  padding: 13px var(--page-gutter);
  border-bottom: 2px solid var(--color-lime);
  box-shadow: 0 6px 0 0 rgba(0, 0, 0, 0.65);
}

.masthead-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.site-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--color-white);
  font-family: var(--font-pixel);
  font-size: 1.15rem;
  flex-shrink: 0;
}

.logo-box {
  background-color: var(--color-lime);
  color: var(--color-ink);
  padding: 4px 8px;
  font-weight: 700;
}

.masthead-quick-links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.quick-link {
  background: transparent;
  border: none;
  font-family: var(--font-pixel);
  font-size: 0.76rem;
  color: #b5b5b5;
  cursor: pointer;
  letter-spacing: 0.06em;
  padding: 4px 6px;
  transition: color 150ms;
}

.quick-link:hover,
.quick-link.active {
  color: var(--color-lime);
}

.header-cta-pixel {
  background-color: var(--color-ink);
  color: var(--color-lime);
  border: 2px solid var(--color-lime);
  box-shadow: 4px 4px 0 0 var(--color-lime);
  font-family: var(--font-pixel);
  font-size: 0.78rem;
  padding: 8px 14px;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.12s steps(2, end), background-color 0.12s;
}

.header-cta-pixel:hover {
  background-color: var(--color-lime);
  color: var(--color-ink);
  transform: translate(-2px, -2px);
}

/* ============================================================
   FLOATING LEFT DOCK & RIGHT ARCADE NAV
   ============================================================ */
#home-dock {
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 950;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dock-btn {
  width: 44px;
  height: 44px;
  background: rgba(18, 18, 18, 0.92);
  border: 2px solid var(--color-gold);
  box-shadow: 3px 3px 0 0 #000;
  color: var(--color-gold);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.12s steps(2, end), color 0.12s, border-color 0.12s;
}

.dock-btn svg {
  width: 26px;
  height: 26px;
  fill: currentColor;
}

.dock-btn:hover {
  color: var(--color-lime);
  border-color: var(--color-lime);
  transform: scale(1.15);
}

#section-nav {
  position: fixed;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
  z-index: 950;
}

.section-nav-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nav-dot-btn {
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.pixel-pellet {
  width: 10px;
  height: 10px;
  background-color: #555;
  transition: transform 0.12s steps(2, end), background-color 0.12s;
}

.nav-dot-btn:hover .pixel-pellet,
.nav-dot-btn.active .pixel-pellet {
  background-color: var(--color-lime);
  transform: scale(1.6);
  box-shadow: 0 0 10px var(--color-lime);
}

/* ============================================================
   SECTION 1: HERO (AVATAR + FLOATING PIXEL BUBBLE + MODES)
   ============================================================ */
.hero-section {
  padding-top: 100px;
  padding-bottom: 50px;
}

.hero-inner {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 56px;
}

#hero-avatar-wrap {
  position: relative;
  width: 48%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}

#hero-bubble {
  position: relative;
  background-color: var(--color-ink);
  border: 3px solid var(--color-white);
  box-shadow: 6px 6px 0 0 rgba(255, 255, 255, 0.25);
  padding: 14px 26px;
  margin-bottom: 18px;
  z-index: 15;
  animation: bubble-float 3s ease-in-out infinite;
  max-width: 92%;
}

#hero-greeting {
  font-family: var(--font-pixel);
  font-size: clamp(1.15rem, 2.1vw, 2rem);
  color: var(--color-lime);
  line-height: 1;
  white-space: nowrap;
}

.greeting-cursor {
  display: inline-block;
  margin-left: 4px;
  animation: pixel-blink 1s step-end infinite;
}

#hero-bubble-tail {
  position: absolute;
  bottom: -31px;
  right: 24px;
  height: 31px;
  width: 24px;
}

.hero-stage-canvas {
  width: 100%;
  display: flex;
  justify-content: center;
  transition: filter 0.18s steps(3, end);
}

.hero-stage-canvas.flash-grid {
  filter: brightness(1.6) drop-shadow(0 0 24px var(--color-lime));
}

#hero-copy {
  width: 52%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
}

.hero-eyebrow {
  font-family: var(--font-pixel);
  font-size: 0.78rem;
  color: var(--color-lime);
  letter-spacing: 0.08em;
}

#hero-title {
  font-family: var(--font-heading);
  font-size: var(--fs-display-lg);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.025em;
  color: var(--color-white);
  text-wrap: balance;
}

#hero-lead {
  font-size: var(--fs-text-lg);
  color: #cfcfcf;
  line-height: 1.6;
  max-width: 54ch;
}

#hero-modes {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 8px;
}

.selection-button {
  background: transparent;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  color: var(--color-white);
  padding: 4px 0;
  text-align: left;
}

.selection-arrow {
  height: 22px;
  width: auto;
  opacity: 0;
  flex-shrink: 0;
  color: var(--color-white);
  transition: opacity 0.12s steps(2, end), transform 0.12s steps(2, end);
}

.selection-text {
  font-family: var(--font-pixel);
  font-size: clamp(0.95rem, 1.3vw, 1.25rem);
  letter-spacing: 1px;
}

.selection-button:hover .selection-arrow {
  opacity: 1;
  transform: translateX(4px);
}

.selection-button-active .selection-arrow {
  opacity: 1;
  color: var(--color-lime);
}

.selection-button-active .selection-text {
  color: var(--color-lime);
}

/* ============================================================
   SECTION 2: ABOUT / RPG CHARACTER SELECTOR CARD
   ============================================================ */
.about-section {
  background: radial-gradient(circle at 50% 50%, rgba(206, 255, 0, 0.05) 0%, transparent 65%);
}

.about-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 44px;
}

.about-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

.about-lead {
  max-width: 640px;
  color: #cfcfcf;
  font-size: var(--fs-text-lg);
  line-height: 1.6;
}

#about-card {
  width: 100%;
  max-width: 680px;
  border: 3px solid var(--color-white);
  background-color: #161616;
  box-shadow: 10px 10px 0 0 #000000;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

#about-stats {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px dashed rgba(255, 255, 255, 0.18);
  padding-bottom: 16px;
}

#about-level {
  font-family: var(--font-pixel);
  font-size: 1.35rem;
  color: var(--color-white);
}

#about-hearts {
  display: flex;
  gap: 10px;
}

.creator-health {
  height: 28px;
  width: auto;
}

#about-character {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.mode-arrow {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  flex-shrink: 0;
  transition: transform 0.12s steps(2, end);
}

.mode-arrow svg {
  height: 48px;
  width: auto;
  fill: var(--color-cream);
}

.mode-arrow:hover {
  transform: scale(1.18);
}

.mode-arrow:hover svg {
  fill: var(--color-lime);
}

.character-stage-box {
  position: relative;
  flex: 1;
  min-width: 0;
  background-color: var(--color-ink);
  border: 3px solid var(--color-white);
  padding: 18px 14px 0 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stage-file-tag {
  align-self: flex-start;
  font-family: var(--font-pixel);
  font-size: 0.72rem;
  color: var(--color-lime);
  margin-bottom: 6px;
}

#about-actions {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.mode-badge-box {
  border: 3px solid var(--color-white);
  padding: 12px 24px;
  font-family: var(--font-pixel);
  font-size: 1rem;
  color: var(--color-white);
  background-color: var(--color-ink);
  text-align: center;
}

.btn-pixel-lime {
  background-color: var(--color-lime);
  color: var(--color-ink);
  border: 3px solid var(--color-white);
  box-shadow: 5px 5px 0 0 #000;
  padding: 13px 26px;
  font-family: var(--font-pixel);
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  text-align: center;
  transition: transform 0.12s steps(2, end), background-color 0.12s;
}

.btn-pixel-lime:hover {
  background-color: var(--color-white);
  transform: translate(-2px, -2px);
}

/* ============================================================
   SECTION 3: RETRO OS WINDOWS (.EXE / .DLL / .SYS PROJECT CARDS)
   ============================================================ */
.windows-inner {
  display: flex;
  flex-direction: column;
  gap: 44px;
}

.windows-header {
  max-width: 780px;
}

.windows-sub {
  margin-top: 14px;
  color: #bdbdbd;
  font-size: var(--fs-text-lg);
}

.os-windows-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
  gap: 28px;
}

.os-window {
  background-color: var(--color-white);
  color: var(--color-ink);
  border: 3px solid var(--color-white);
  box-shadow: 8px 8px 0 0 rgba(206, 255, 0, 0.28);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  min-width: 0;
  transition: transform 0.18s steps(3, end), box-shadow 0.18s;
}

.os-window:hover {
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0 0 var(--color-lime);
}

.window-title-bar {
  background-color: var(--color-ink);
  color: var(--color-white);
  padding: 10px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.window-title-text {
  font-family: var(--font-pixel);
  font-size: 0.82rem;
  color: var(--color-lime);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.window-close-box {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  flex-shrink: 0;
}

.window-close-box svg {
  width: 14px;
  height: 14px;
}

.window-body {
  padding: 10px;
  flex: 1;
  display: flex;
}

.window-body-content {
  border: 3px solid var(--color-ink);
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  min-width: 0;
}

.win-category {
  font-family: var(--font-pixel);
  font-size: 0.7rem;
  color: #555;
}

.win-heading {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-ink);
  line-height: 1.2;
}

.win-problem {
  font-size: 0.94rem;
  color: #2b2b2b;
  line-height: 1.5;
}

.win-progress {
  border: 3px solid var(--color-ink);
  padding: 4px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 3px;
}

.win-progress i {
  height: 12px;
  background-color: #e0e0e0;
  display: block;
}

.win-progress i.filled {
  background-color: var(--color-ink);
}

.os-window:hover .win-progress i.filled {
  background-color: #111;
}

.win-footer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  font-family: var(--font-pixel);
  font-size: 0.72rem;
  padding-top: 4px;
}

.win-stack {
  color: #444;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.win-open-cmd {
  background-color: var(--color-ink);
  color: var(--color-lime);
  padding: 3px 8px;
  flex-shrink: 0;
}

/* ============================================================
   SECTION 4: SYSTEM DNA & QUEST LOG
   ============================================================ */
.stack-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: start;
}

.cap-cards,
.quest-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 28px;
}

.cap-pixel-card,
.quest-card {
  border: 3px solid var(--color-white);
  background-color: #171717;
  padding: 24px;
  box-shadow: 6px 6px 0 0 #000;
}

.cap-pixel-card h3,
.quest-role {
  font-family: var(--font-pixel);
  font-size: 0.95rem;
  color: var(--color-lime);
  margin-bottom: 8px;
  word-break: break-word;
}

.cap-tools-line,
.quest-org {
  font-weight: 700;
  color: var(--color-white);
  margin-bottom: 8px;
}

.cap-desc-line,
.quest-summary {
  color: #c4c4c4;
  font-size: 0.95rem;
}

.quest-top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 6px;
  font-family: var(--font-pixel);
  font-size: 0.72rem;
  color: #999;
  margin-bottom: 8px;
}

/* ============================================================
   SECTION 5: WORLD / FINAL CTA
   ============================================================ */
.world-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 32px;
}

.world-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
  width: 100%;
}

.btn-xl {
  font-size: 1.05rem;
  padding: 16px 32px;
}

.btn-pixel-outline {
  background-color: transparent;
  color: var(--color-white);
  border: 3px solid var(--color-white);
  padding: 16px 28px;
  font-family: var(--font-pixel);
  font-size: 0.95rem;
  cursor: pointer;
  word-break: break-all;
  transition: all 0.12s steps(2, end);
}

.btn-pixel-outline:hover {
  border-color: var(--color-lime);
  color: var(--color-lime);
}

.world-socials {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  margin-top: 16px;
}

.world-social-link {
  font-family: var(--font-pixel);
  font-size: 0.9rem;
  color: var(--color-white);
  text-decoration: none;
}

.world-social-link:hover {
  color: var(--color-lime);
}

.home-footer {
  margin-top: 60px;
  font-family: var(--font-pixel);
  font-size: 0.75rem;
  color: #777;
}

/* ============================================================
   RETRO OS DIALOG MODALS
   ============================================================ */
.retro-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.82);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.cm-window {
  width: 100%;
  max-width: 620px;
  background-color: var(--color-white);
  color: var(--color-ink);
  border: 4px solid var(--color-ink);
  box-shadow:
    0 0 0 3px var(--color-white),
    12px 12px 0 0 var(--color-lime);
}

.cm-titlebar {
  background-color: var(--color-ink);
  color: var(--color-white);
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.cm-title {
  font-family: var(--font-pixel);
  font-size: 0.82rem;
  color: var(--color-lime);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cm-close {
  background: transparent;
  border: none;
  color: var(--color-white);
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  cursor: pointer;
}

.cm-close:hover {
  color: var(--color-lime);
}

.cm-body {
  padding: 24px;
  border: 3px solid var(--color-ink);
  margin: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-cat-badge {
  font-family: var(--font-pixel);
  font-size: 0.72rem;
  color: #555;
}

.cm-heading {
  font-family: var(--font-heading);
  font-size: clamp(1.3rem, 2.2vw, 1.65rem);
  font-weight: 700;
  color: var(--color-ink);
  line-height: 1.2;
}

.cm-subcopy {
  color: #333;
  font-size: 0.95rem;
}

.modal-anatomy-block {
  border-left: 4px solid var(--color-ink);
  padding-left: 14px;
}

.modal-anatomy-block h4 {
  font-family: var(--font-pixel);
  font-size: 0.74rem;
  color: #444;
  margin-bottom: 4px;
}

.modal-anatomy-block p {
  font-size: 0.95rem;
  color: var(--color-ink);
  line-height: 1.55;
}

.modal-stack-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.modal-pill {
  font-family: var(--font-pixel);
  font-size: 0.7rem;
  background-color: #eee;
  border: 2px solid var(--color-ink);
  padding: 4px 10px;
}

.cm-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 8px;
}

.cm-submit {
  background-color: var(--color-ink);
  color: var(--color-lime);
  font-family: var(--font-pixel);
  font-size: 0.85rem;
  padding: 12px 22px;
  text-decoration: none;
  border: 2px solid var(--color-ink);
  text-align: center;
}

.cm-submit:hover {
  background-color: var(--color-lime);
  color: var(--color-ink);
}

.contact-direct-boxes {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact-retro-row {
  width: 100%;
  background-color: #f4f4f4;
  border: 2px solid var(--color-ink);
  box-shadow: 4px 4px 0 0 var(--color-ink);
  padding: 12px 14px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--color-ink);
  font-family: var(--font-pixel);
  font-size: 0.74rem;
  cursor: pointer;
}

.contact-retro-row:hover {
  background-color: var(--color-lime);
}

.c-val {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.95rem;
  word-break: break-all;
}

/* ============================================================
   RESPONSIVE BREAKPOINTS (TABLET & MOBILE)
   ============================================================ */
@media (max-width: 1024px) {
  .section {
    padding: 96px 24px;
  }
  .hero-inner {
    gap: 36px;
  }
  .stack-two-col {
    gap: 36px;
  }
  #section-nav {
    right: 10px;
  }
  #home-dock {
    left: 12px;
    bottom: 16px;
  }
}

@media (max-width: 860px) {
  .masthead-quick-links {
    display: none;
  }
  .hero-inner {
    flex-direction: column-reverse;
    text-align: center;
    gap: 36px;
  }
  #hero-copy,
  #hero-avatar-wrap {
    width: 100%;
    align-items: center;
  }
  #hero-modes {
    align-items: flex-start;
    width: auto;
    margin: 0 auto;
  }
  .stack-two-col {
    grid-template-columns: 1fr;
    gap: 44px;
  }
  #section-nav {
    display: none;
  }
}

@media (max-width: 640px) {
  #masthead {
    padding: 14px 16px;
  }
  #masthead.is-scrolled {
    padding: 10px 16px;
  }
  .site-logo {
    font-size: 0.95rem;
  }
  .header-cta-pixel {
    font-size: 0.68rem;
    padding: 7px 10px;
    box-shadow: 3px 3px 0 0 var(--color-lime);
  }
  .section {
    min-height: auto;
    padding: 84px 16px 64px 16px;
  }
  .hero-section {
    padding-top: 96px;
  }
  #hero-bubble {
    padding: 10px 18px;
    margin-bottom: 14px;
  }
  #hero-bubble-tail {
    height: 22px;
    bottom: -22px;
    right: 16px;
  }
  #about-card {
    padding: 20px 14px;
    gap: 20px;
    box-shadow: 6px 6px 0 0 #000;
  }
  #about-level {
    font-size: 1.05rem;
  }
  .creator-health {
    height: 22px;
  }
  #about-character {
    gap: 8px;
  }
  .mode-arrow {
    padding: 4px;
  }
  .mode-arrow svg {
    height: 34px;
  }
  .character-stage-box {
    padding: 12px 8px 0 8px;
  }
  .mode-badge-box,
  .btn-pixel-lime {
    width: 100%;
    font-size: 0.82rem;
    padding: 12px 16px;
  }
  .os-windows-grid {
    gap: 20px;
  }
  .window-body-content {
    padding: 16px;
  }
  .cap-pixel-card,
  .quest-card {
    padding: 18px;
  }
  .world-actions {
    flex-direction: column;
    align-items: stretch;
  }
  .btn-xl,
  .btn-pixel-outline {
    width: 100%;
    font-size: 0.82rem;
    padding: 14px 16px;
  }
  .world-socials {
    flex-direction: column;
    gap: 16px;
  }
  .home-footer {
    margin-top: 40px;
    padding-bottom: 56px;
  }
  #home-dock {
    flex-direction: row;
    left: 50%;
    bottom: 12px;
    transform: translateX(-50%);
    background: rgba(18, 18, 18, 0.95);
    padding: 6px 10px;
    border: 2px solid #333;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.8);
  }
  .dock-btn {
    width: 38px;
    height: 38px;
  }
  .dock-btn svg {
    width: 22px;
    height: 22px;
  }
  .cm-body {
    padding: 16px;
    margin: 6px;
  }
  .cm-submit {
    width: 100%;
  }
}
</style>
