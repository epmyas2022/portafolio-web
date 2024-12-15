
import index from './lib'
import { createApp } from 'vue'

import App from './App.vue'
const app = createApp(App)

index(app)
app.mount('#app')
