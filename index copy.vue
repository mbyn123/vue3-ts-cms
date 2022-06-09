<template>
  <div>
    <el-button type="primary" @click="login">登录</el-button>
    <el-button type="danger" @click="changePageSize(50)">50</el-button>
    <el-button type="success" @click="changePageSize(100)">100</el-button>
    <el-button @click="retry">刷新</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="realname" label="realname" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="cellphone" label="cellphone" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { useLogin, useUserList } from "@/service/api/login";
import { reactive, ref, watch } from "vue";
import { ElButton, ElTable, ElTableColumn } from "element-plus";

const params = reactive({ offset: 0, size: 100 });

let tableData = ref<any[]>([]);

const { mutate, resultData } = useLogin();

const { resultData: userList, retry } = useUserList(params);

watch(resultData, (newValue) => {
  console.log(newValue, "newValue");
  sessionStorage.setItem("cms-token", newValue.token);
});

watch(userList, async (newUserList) => {
  console.log(newUserList.list, "newUserList");
  tableData.value = newUserList.list;
});

const login = () => {
  mutate({ name: "coderwhy", password: "123456" });
};

const changePageSize = (size: number) => {
  params.size = size;
};
</script>
