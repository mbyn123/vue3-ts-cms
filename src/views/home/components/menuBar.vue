import { MenuDataType } from "../type";

<template>
  <div class="menu-wrapper">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!isCollapse" class="title">CMS后台</span>
    </div>
    <el-menu
      :default-active="defaultUrl"
      :collapse="isCollapse"
      :collapse-transition="false"
      unique-opened
      router
      background-color="#001529"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in menuDataList" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.url" :show-timeout="0" :hide-timeout="0">
            <template #title>
              <el-icon v-if="item.icon">
                <component :is="'Grid'"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.url">
                <el-icon>
                  <component :is="subItem.icon"></component>
                </el-icon>
                <template #title>{{ subItem.name }}</template>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-if="item.type === 2">
          <el-menu-item :index="item.url">
            <el-icon v-if="item.icon">
              <component :is="'Grid'"></component>
            </el-icon>
            <template #title>{{ item.name }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { MenuDataType } from '../type'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
const props = defineProps<{
  isCollapse: boolean
  menuData: MenuDataType
  defaultActive: string
}>()
const route = useRoute()
const menuDataList = ref<MenuDataType>([])
const defaultUrl = ref()
watch([() => route.path, () => props.defaultActive], (newValue) => {
  defaultUrl.value = newValue[newValue[0] !== '/main' ? 0 : 1]
})

watch(
  () => props.menuData,
  (newValue) => {
    menuDataList.value = newValue
  }
)
</script>

<style lang="less" scoped>
.menu-wrapper {
  height: 100%;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 60px);
}
</style>
