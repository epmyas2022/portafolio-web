<script setup>
import AppTabsComponent from '../components/AppTabsComponent.vue'
import { useTabsStore } from '../stores/tabs';
const {tabs} = useTabsStore()
</script>

<template>
  <main>
    <div class="lg:px-20 px-1">

      <app-tabs-component :items="tabs"> </app-tabs-component>
    </div>
  </main>
</template>
