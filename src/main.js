import { createApp } from 'vue'



// main.ts

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')





// createApp(App).mount('#app')
