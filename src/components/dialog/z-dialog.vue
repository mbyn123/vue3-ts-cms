<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :width="width || '30%'"
    :close-on-click-modal="false"
    :destroy-on-close="destroy"
    @close="closeDialog"
  >
    <slot></slot>
    <ZForm
      v-if="formItems"
      mode="submit"
      ref="formRef"
      :formItems="formItems"
      :formData="formData"
    />
    <template #footer v-if="formItems">
      <span class="dialog-footer">
        <el-button type="primary" v-loading="confirmLoading" v-debounce="submitForm"
          >确定</el-button
        >
        <el-button @click="closeDialog">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import ZForm from '@/components/form/z-form.vue'
import { ref, watch } from 'vue'
import { formItemsType } from '../form/type'

const props = defineProps<{
  width?: string | number
  title?: string
  dialogVisible: boolean
  formItems?: formItemsType[]
  formData?: any
  confirmLoading?: boolean
  destroy?: boolean
}>()

const emit = defineEmits(['closeDialog', 'submitForm', 'update:formData'])

const formRef = ref<InstanceType<typeof ZForm>>()

const formOriginData: any = {}

for (const key in props.formData) {
  formOriginData[key] = props.formData[key]
}

// 关闭弹窗
const closeDialog = () => {
  if (props.formItems) {
    reset()
    emit('update:formData', { ...formOriginData })
  }
  emit('closeDialog')
}

// 确认
const submitForm = () => emit('submitForm')

const reset = () => formRef.value?.form?.resetFields()

const validate = () => formRef.value?.form?.validate()

defineExpose({ validate })
</script>

<style lang="less" scoped></style>
