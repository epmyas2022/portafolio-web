<template>
  <div class="hover:bg-gray-50 lg:p-4 p-2 rounded-lg dark:hover:bg-gray-500/10">
    <div class="pl-14 text-gray-500 text-sm mb-2 absolute top-5 md:static md:top-0">
      <span v-if="pin" class="mdi mdi-pin"> Pinned cheep</span>
    </div>

    <!-- Post card user -->
    <div class="flex flex-col md:flex-row gap-4">
      <img class="w-12 h-12 rounded-full" src="https://unavatar.io/github/epmyas2022" alt="epmyas avatar github" />
      <div>
        <div class="flex gap-2 items-center">
          <a href="#" class="font-bold lg:text-base text-sm">{{ user }} ✨</a>
          <p class="font-light text-xs">• {{ formateDate(date) }}</p>
        </div>
        <div class="flex gap-2 flex-wrap mt-2">
        <div v-for="tag in tags" :key="tag" class="bg-gray-300/70 dark:bg-gray-300/30 px-4 py-1 rounded-full mt-2 ">
          <p class="font-semibold lg:text-sm text-xs">{{ tag }}</p>
        </div>
      </div>
      </div>
    </div>
    <!-- Post card content -->

    <div class="md:pl-16 pl-2 mt-3">
      <h1 class="font-bold lg:text-2xl text-lg mb-2">{{ title }}</h1>

      <p class="leading-relaxed text-balance" v-html="html"></p>

    </div>

    <div class="flex justify-end p-2">
      <button class="hover:text-red-500 text-3xl text-gray-400">
        <span class="mdi mdi-heart"></span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tags: {
    type: Array,
    required: true
  },

  date: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  html: {
    type: String,
    required: true
  },

  user: {
    type: String,
    required: true
  },

  pin: {
    type: Boolean,
    required: true
  }
})

const formateDate = (date) => {
  const config = { year: 'numeric', month: 'short', day: '2-digit' }
  return new Date(date).toLocaleDateString('en-US', config)
}
</script>

