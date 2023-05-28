<script setup lang="ts">
import Notify from "@/components/Notify/index.vue";
import Log from "@/components/Log/index.vue";
import { useLogStore } from "@/store/log.ts";

const logStore = useLogStore();

const msgList = [
  { type: 1, title: "有消息", content: "123123123" },
  { type: 2, title: "有消息", content: "123123123" },
  { type: 3, title: "有消息", content: "123123123" },
  { type: 4, title: "有消息", content: "123123123" },
  { type: 1, title: "有消息", content: "123123123" },
  { type: 2, title: "有消息", content: "123123123" },
  { type: 3, title: "有消息", content: "123123123" },
  { type: 4, title: "有消息", content: "123123123" },
];

logStore.setLog({
  name: "用户信息",
  time: "2023-5-29",
  status: 200,
  request: "{phone:1000000}",
  type: "post",
});
</script>
<template>
  <div class="app-container">
    <el-row justify="space-between">
      <el-col :span="14">
        <el-card>
          <el-descriptions title="用户信息">
            <el-descriptions-item label="用户名">123 </el-descriptions-item>
            <el-descriptions-item label="手机号"
              >18100000000
            </el-descriptions-item>
            <el-descriptions-item label="归属地区">贵州省</el-descriptions-item>
            <el-descriptions-item label="账号等级">
              <el-tag size="small">省级</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="上次登录时间">
              2023-05-27
            </el-descriptions-item>
            <el-descriptions-item label="权限字符">
              <el-tag>admin</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
        <el-card class="margin-top-15" header="本地网络日志">
          <el-card v-for="(item, index) in logStore.logList" :key="index">
            <log :item="item" />
          </el-card>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card header="待办事项">
          <el-card
            class="margin-top-15"
            :key="index"
            v-for="(item, index) in msgList"
          >
            <notify :item="item" />
          </el-card>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.margin-top-15 {
  margin-top: 15px;
}
:deep(.el-card__header) {
  border: none;
  font-size: 16px;
  font-weight: 700;
}
</style>
