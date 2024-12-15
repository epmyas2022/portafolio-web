import '../assets/main.css'
import { createPinia } from 'pinia'
import router from '../router'
import 'floating-vue/dist/style.css'
import FloatingVue from 'floating-vue'
import { createVfm } from 'vue-final-modal'



export default function index(app){
    app.use(createPinia())
    app.use(FloatingVue)
    app.use(router)
    app.use(createVfm())


}