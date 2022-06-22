<template>
  <div class="login-wrapper">
    <el-card class="box-card">
      <h2 class="title">后台管理系统</h2>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="60px">
        <el-form-item label="账号" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="onSubmit(formRef)" class="login-button">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useLogin } from '@/service/api/login'
import { setCache } from '@/utils/cache'
import { reactive, ref, watch, onMounted } from 'vue'
import { loginParamsType, loginResultType } from './type'
import { useRouter } from 'vue-router'
import { FormInstance, FormRules } from 'element-plus'

const router = useRouter()

const formRef = ref<FormInstance>()

const form = reactive<loginParamsType>({
  name: 'coderwhy',
  password: '123456'
})

onMounted(() => {
  document.onkeydown = () => {
    const event = window.event as KeyboardEvent
    if (event.key === 'Enter') {
      onSubmit(formRef.value)
    }
  }
})

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码最少6位数', trigger: 'blur' }
  ]
})

// 登录接口
const { mutate, resultData } = useLogin<loginParamsType, loginResultType>()

watch(resultData, (newValue) => {
  if (newValue) {
    setCache<string>('token', newValue.token)
    setCache<number>('adminUserId', newValue.id)
    router.push({ path: '/main' })
  }
})

const onSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  formEl.validate((valid) => {
    if (valid) {
      mutate(form)
    }
  })
}
</script>

<style lang="less" scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
  .box-card {
    width: 350px;
    padding: 10px 20px;
    margin-bottom: 100px;
    .title {
      text-align: center;
    }
    .login-button {
      width: 100%;
      margin: 0 auto;
    }
  }
}
</style>
