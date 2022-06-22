import { ref } from 'vue'
import ZForm from '@/components/form/z-form.vue'

export default function useForm() {
  const formRef = ref<InstanceType<typeof ZForm>>()

  const resetForm = () => formRef.value?.form.resetFields()

  return {
    formRef,
    resetForm
  }
}
