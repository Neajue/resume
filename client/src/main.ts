import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

import './assets/css/tailwind.css'
import router from './router'
import pinia from './store'

const app = createApp(App)

app.use(router);
app.use(pinia);

app.mount('#app')