import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
// import store from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { mapMenusToRoutes } from './utils'
import { getCache } from './utils/cache'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
mapMenusToRoutes(getCache('adminMenuData'))

// app.use(store)
app.use(router)
app.mount('#app')
