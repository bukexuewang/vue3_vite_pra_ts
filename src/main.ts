import { createApp } from 'vue'
import App from './App.vue'

import './assets/styles/index.scss'

import router from './router'
import store from './store'

const app = createApp(App)

app.use(router).use(store).mount('#app')
