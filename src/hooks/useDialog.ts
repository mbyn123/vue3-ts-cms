import { reactive, ref } from 'vue'
import ZDialog from '@/components/dialog/z-dialog.vue'
import { iDialogType } from '@/components/dialog/type'

export default function useDialog<T>(title?: string, data?: T) {
  const dialogRef = ref<InstanceType<typeof ZDialog>>()
  const dialogVisible = ref(false)
  const dialogTitle = ref(title)
  const dialogType = ref()
  const dialogFormData = ref<(T & object) | {}>(data || {})

  // 打开对话框
  const openDialog = (type?: iDialogType) => {
    dialogType.value = type
    if (title && type) {
      const _title =
        (type === 'add' && '新增' + title) || (type === 'edit' && '编辑' + title) || title
      setDialogTitle(_title)
    }
    dialogVisible.value = true
  }

  // 关闭对话框
  const closeDialog = () => {
    dialogVisible.value = false
  }

  const setDialogTitle = (value: string) => (dialogTitle.value = value)

  const setDialogType = (value: iDialogType) => (dialogType.value = value)

  // 表单赋值
  const setDialogFormData = (value: T) => (dialogFormData.value = value)

  // 表单验证
  const validateDialogForm = () => dialogRef.value.validate()

  return {
    dialogRef,
    dialogVisible,
    dialogType,
    dialogTitle,
    dialogFormData,
    setDialogFormData,
    openDialog,
    closeDialog,
    validateDialogForm,
    setDialogTitle,
    setDialogType
  }
}
