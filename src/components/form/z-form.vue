<template>
  <div class="contaniner">
    <el-form ref="form" :model="formData" :label-width="labelWidth || defaultLabelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.prop">
          <el-col v-bind="labelColType || defaultLabelCol">
            <el-form-item
              :label="item.label"
              :prop="item.prop"
              style="width: 100%"
              :rules="item.rules"
              v-if="!item.isHidden"
            >
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'password'">
                <el-input
                  v-model="formData[item.prop]"
                  type="password"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-if="item.optionKey">
                    <el-option
                      v-for="option in item.options"
                      :key="option.label"
                      :label="option[item.optionKey.label]"
                      :value="option[item.optionKey.value]"
                    />
                  </template>
                  <template v-else>
                    <el-option v-for="option in item.options" :key="option.label" v-bind="option" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'datePicker'">
                <el-date-picker :type="item.pickerType" style="width: 100%" />
              </template>
            </el-form-item>
          </el-col>
        </template>
        <el-form-item label=" " v-if="mode === 'search'">
          <el-button type="primary" @click="clickSubmit">搜索</el-button>
          <el-button @click="clickResult">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { formItemsType, labelColType, modaType } from './type'
const { mode } = defineProps<{
  mode: modaType
  formItems: formItemsType[]
  labelWidth?: string
  labelCol?: labelColType
  formData: any
}>()

const emit = defineEmits(['handSubmitClick', 'handResetClick'])

const defaultLabelWidth = '80px'
const defaultLabelCol: labelColType =
  mode === 'search'
    ? {
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      }
    : {
        span: 24
      }
const form = ref()

const clickResult = () => {
  emit('handResetClick')
}

const clickSubmit = () => {
  emit('handSubmitClick')
}

defineExpose({ form })
</script>

<style lang="less" scoped></style>
