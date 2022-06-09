<template>
  <div class="wrapper">
    <div class="collapse">
      <el-icon @click="clickCollapse" class="icon">
        <component :is="!isCollapse ? 'Fold' : 'Expand'"></component>
      </el-icon>
    </div>
    <el-dropdown @command="handleCommand">
      <span class="user-wrapper">
        <el-avatar :size="30" :src="circleUrl" />
        <span class="user-name">{{ userInfo?.name }}</span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { clearCache } from '@/utils/cache'
import { useRouter } from 'vue-router'
import { AdminUserType } from '../type'

const emit = defineEmits(['clickCollapse'])
defineProps<{
  userInfo: AdminUserType
}>()
const router = useRouter()

const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

let isCollapse = ref(false)

const handleCommand = (command: string | number | object) => {
  console.log(command)
  if (command === 'logout') {
    clearCache()
    router.push({ path: '/login' })
  }
}

const clickCollapse = () => {
  isCollapse.value = !isCollapse.value
  emit('clickCollapse', isCollapse.value)
}
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .collapse {
    font-size: 30px;
    .icon {
      cursor: pointer;
    }
  }

  .user-wrapper {
    display: flex;
    align-items: center;
    .user-name {
      padding-left: 10px;
    }
  }
}
</style>
