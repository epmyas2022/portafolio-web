<template>
  <div>
    <div class="flex font-bold lg:text-base text-sm text-gray-700">
      <button
        v-for="item in data"
        :key="item"
        @click="loadContent(item?.id)"
        :class="'flex-grow hover:bg-gray-100 p-2 relative  ' + (item?.selected ? 'selected' : '')"
      >
        {{ item.title }}
      </button>
    </div>
  </div>
  <br />
  <div id="content">
    <component :is="contenido" v-if="isComponent()" />
    <div v-else v-html="contenido"></div>
  </div>
</template>

<script setup>
import useTabs from './composable/useTabs'
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const { data, loadContent, isComponent, contenido } = useTabs(props)
</script>

<style>
.selected::after {
  content: '';
  position: absolute;
  left: 50%;
  right: 0;
  bottom: 0;
  width: 80%;
  height: 4px;
  transform: translateX(-50%);
  background-color: rgb(219, 39, 119);
}

/* we will explain what these classes do next! */
</style>