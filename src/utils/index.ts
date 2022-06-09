import router from '@/router'
import { MenuDataType } from '@/views/home/type'
import { RouteRecordRaw } from 'vue-router'
import { setCache } from './cache'

export const mapMenusToRoutes = (menu: MenuDataType) => {
  const routes: RouteRecordRaw[] = []
  const renderRouter = (menu: MenuDataType) => {
    if (!menu || (menu && !menu.length)) {
      return
    }
    menu.forEach((key) => {
      if (key.children) {
        renderRouter(key.children)
      }
      if (!key.url) {
        return
      }
      const { url, name } = key
      routes.push({
        path: url,
        name,
        component: () => import(`@/views${url}/index.vue`)
      })
    })
  }
  renderRouter(menu)
  routes.forEach((item) => router.addRoute('main', item))
  setCache('defaultActive', routes[0].path)
}
