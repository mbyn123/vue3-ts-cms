<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="30%"
    :close-on-click-modal="false"
    :before-close="closeDialog"
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
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import ZForm from '@/components/form/z-form.vue'
import { ref, watch } from 'vue'
import { formItemsType } from '../form/type'
const { formItems, formData } = defineProps<{
  title?: string
  dialogVisible: boolean
  formItems?: formItemsType[]
  formData?: any
}>()

const emit = defineEmits(['closeDialog', 'submitForm', 'update:formData'])

const closeDialog = () => {
  if (formItems) {
    resetFields()
  }
  emit('closeDialog')
}

const submitForm = () => emit('submitForm')

const formRef = ref()

const resetFields = () => {
  formRef.value.form.resetFields()
  emit('update:formData', formData)
}

const validate = () => formRef.value.form.validate()

defineExpose({ validate })
</script>

<style lang="less" scoped></style>
