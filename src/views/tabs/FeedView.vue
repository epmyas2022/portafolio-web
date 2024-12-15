<template>
  <div>
    <PostComponent v-for="post in posts" 
    :key="post.id" :tags="post.tags" 
    :date="post.date" :title="post.title"
    :html="post.HTML" :user="post.user"
    :pin="post.pinned"
    />
  </div>
</template>

<script setup>
import { usePostStore } from '../../stores/post'
import PostComponent from '../../components/PostComponent.vue'
import { onMounted, ref } from 'vue'

const posts = ref([])

onMounted(async () => {
  await usePostStore().getPostData()
  posts.value = await usePostStore().listPostData['posts']

})
</script>

