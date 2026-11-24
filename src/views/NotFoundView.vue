<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="not-found-frame">
    <p class="err-code">ERR_404 // SECTOR_NOT_FOUND</p>
    <h1 class="err-title">La ruta solicitada no existe en este expediente.</h1>
    <RouterLink to="/" class="return-btn">VOLVER AL INICIO →</RouterLink>
  </main>
</template>

<style scoped>
.not-found-frame {
  max-width: 640px;
  width: 100%;
  border: 3px solid var(--color-white);
  padding: 2.5rem;
  margin: 4rem auto;
  font-family: var(--font-pixel);
}
.err-code {
  color: var(--color-lime);
  font-size: 0.85rem;
  margin: 0 0 1rem 0;
}
.err-title {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  margin: 0 0 2rem 0;
}
.return-btn {
  display: inline-block;
  background: var(--color-lime);
  color: var(--color-ink);
  padding: 0.8rem 1.4rem;
  text-decoration: none;
  font-size: 0.85rem;
}
</style>
