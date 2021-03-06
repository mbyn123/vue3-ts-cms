import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router, { mapMenusToRoutes } from './router'
// import store from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { getCache } from './utils/cache'
import { debounce } from './utils/directive'

mapMenusToRoutes(getCache('adminMenuData'))

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.directive('debounce', debounce)
// app.use(store)
app.use(router)
app.mount('#app')
