import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePostStore = defineStore('post', () => {
  const postRepository = ref(null)

  const listPostData = ref([])

  const loadRespository = (postRepositoryImpl) => {
    postRepository.value = postRepositoryImpl
  }

  const getPostData = async () => {
    listPostData.value = await postRepository.value.getAllPost()
  }

  return {
    loadRespository,
    getPostData,
    postRepository,
    listPostData
  }
})
