import { ref, onMounted} from 'vue'
import gsap from 'gsap'


export default function  useTabs(props) {

const contenido = ref(null)

const data = ref(props.items)

const getSelected = () => {
  return data.value.find((item) => item?.selected)
}

const loadContent = (id) => {
  clearSelected()
  const content = data.value.find((item) => item?.id === id)
  content.selected = true
  contenido.value = content?.content
  animatedContent()
}

const clearSelected = () => {
  data.value.forEach((item) => {
    item.selected = false
  })
}
const isComponent = () => {
  return contenido.value instanceof Object
}

const animatedContent = () => {
  gsap.fromTo('#content', { y: 1000 }, { y: 0, duration: 0.7 })
}

onMounted(() => {
  loadContent(getSelected()?.id)
})


return {
  data,
  getSelected,
  loadContent,
  clearSelected,
  isComponent,
  contenido,
  animatedContent
}
}