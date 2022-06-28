import { ref, UnwrapRef, watch } from 'vue'
import ZDialog from '@/components/dialog/z-dialog.vue'
import { iDialogType } from '@/components/dialog/type'
import { ElMessageBox } from 'element-plus'

export default function useDialog<T>(title: string, data: T) {
  const dialogRef = ref<InstanceType<typeof ZDialog>>()
  const dialogVisible = ref(false)
  const dialogTitle = ref(title)
  const dialogType = ref()
  const dialogFormData = ref<T>(data)

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

  // 设置标题
  const setDialogTitle = (value: string) => (dialogTitle.value = value)

  // 设置弹窗/表单 类型
  const setDialogType = (value: iDialogType) => (dialogType.value = value)

  // 表单赋值
  const setDialogFormData = (value: UnwrapRef<T>) => (dialogFormData.value = value)

  // 表单验证
  const validateDialogForm = () => dialogRef.value.validate()

  // 确认弹窗
  const confirmBox = (subTitle: string, title: string) => {
    return ElMessageBox.confirm(subTitle, title, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).catch((err) => err)
  }

  return {
    dialogRef,
    dialogVisible,
    dialogType,
    dialogTitle,
    dialogFormData,
    confirmBox,
    setDialogFormData,
    openDialog,
    closeDialog,
    validateDialogForm,
    setDialogTitle,
    setDialogType
  }
}
