<script setup lang="ts">
import Notify from '@/components/Notify/index.vue'
import Log from '@/components/Log/index.vue'
import { useLogStore } from '@/store/log.ts'
import { get } from '@/utils/http.ts'

const logStore = useLogStore()

get('/oilg/login/getUserInfo')
  .then((res) => {})
  .catch((err) => {})

const msgList = [
  { type: 1, title: '有消息', content: '123123123' },
  { type: 2, title: '有消息', content: '123123123' },
  { type: 3, title: '有消息', content: '123123123' },
  { type: 4, title: '有消息', content: '123123123' },
  { type: 1, title: '有消息', content: '123123123' },
  { type: 2, title: '有消息', content: '123123123' },
  { type: 3, title: '有消息', content: '123123123' },
  { type: 4, title: '有消息', content: '123123123' }
]
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
        <el-card class="margin-top-15 log-content" header="本地网络日志">
          <el-card
            class="log-item"
            v-for="(item, index) in logStore.logList"
            :key="index"
          >
            <log :item="item" />
          </el-card>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="log-content" header="待办事项">
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
.log-content {
  max-height: 1000px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #9fc5d2;
    border-radius: 5px;

    &:hover {
      background-color: #a6a3a3;
    }
  }
  .log-item {
    margin-top: 5px;
  }
}
</style>
