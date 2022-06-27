import { getCache, setCache } from '@/utils/cache'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { MenuDataType } from '@/views/home/type'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    // redirect: getCache('defaultActive'),
    component: () => import('@/views/home/home.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = getCache('token')
    if (!token) {
      return '/login'
    }
  }
  if (to.path === '/main') {
    return getCache('defaultActive')
  }
})

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
  if (routes.length) {
    routes.forEach((item) => router.addRoute('main', item))
    setCache('defaultActive', routes[0].path)
  } else {
    router.push({
      path: '/login'
    })
  }
}

export default router as any
