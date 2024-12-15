import { defineStore } from 'pinia'
import { ref,markRaw} from 'vue'
import FeedView from '@/views/tabs/FeedView.vue'
import AboutView from '@/views/tabs/AboutView.vue'
import ProjectsView from '@/views/tabs/ProjectsView.vue'
export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref([
    {
      id: 1,
      selected: true,
      title: 'Feed',
      content: markRaw(FeedView)
    },
    {
      id: 2,
      title: 'About',
      content: markRaw(AboutView)
    },
 
    {
      id: 3,
      title: 'Proyects',
      content: markRaw(ProjectsView)
    }
  ])

  return { tabs }
})
