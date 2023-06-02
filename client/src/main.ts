import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

import './assets/css/tailwind.css'
import 'element-plus/theme-chalk/src/message.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import pinia from './store'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router);
app.use(pinia);

app.mount('#app')