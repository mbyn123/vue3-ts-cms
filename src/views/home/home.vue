<template>
  <div class="home-wrapper">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <MenuBar :menuData="menuData" :defaultActive="defaultActive" :isCollapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header"> <NavHeader :userInfo="userInfo" @clickCollapse="clickCollapse" /> </el-header>
        <el-main class="page-content"><MainContent></MainContent></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import NavHeader from './components/navHeader.vue'
import MenuBar from './components/menuBar.vue'
import MainContent from './components/mainContent.vue'
import { ref, watch } from 'vue'
import { useAdminMenu, useAdminUser } from '@/service/api/login'
import { getCache, setCache } from '@/utils/cache'
import { AdminUserType, MenuDataType } from './type'
import { mapMenusToRoutes } from '@/utils'

const adminUserId = getCache('adminUserId')

let isCollapse = ref(false)
let userInfo = ref<AdminUserType>(getCache('adminUserInfo'))
let menuData = ref<MenuDataType>(getCache('adminMenuData'))
let defaultActive = ref('')

const clickCollapse = (value: boolean) => {
  isCollapse.value = value
}

// 获取用户信息接口
const { resultData: adminUserInfo } = useAdminUser<AdminUserType>(adminUserId)

watch(adminUserInfo, (newValue) => {
  if (!newValue) return
  userInfo.value = newValue
  setCache<AdminUserType>('adminUserInfo', newValue)
})

// 获取用户菜单接口
const { resultData: adminMenuData } = useAdminMenu<MenuDataType>(adminUserId)

watch(adminMenuData, (newValue) => {
  if (!newValue) return
  menuData.value = newValue
  mapMenusToRoutes(menuData.value)
  defaultActive.value = getCache('defaultActive')
  setCache<MenuDataType>('adminMenuData', newValue)
})
</script>

<style scoped lang="less">
.home-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 60px);

  .page-info {
    background-color: #fff;
    border-radius: 5px;
  }
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 60px;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  // line-height: 200px;
  // text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
