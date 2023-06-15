<script setup lang="ts">
import Notify from '@/components/Notify/index.vue'
import Log from '@/components/Log/index.vue'
import { useLogStore } from '@/store/log.ts'
import { useUserStore } from '@/store/user.ts'

const logStore = useLogStore()
const userStore = useUserStore()

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
            <el-descriptions-item label="用户名"
              >{{ userStore.user.nickName }}
            </el-descriptions-item>
            <el-descriptions-item label="手机号"
              >{{ userStore.user.phone }}
            </el-descriptions-item>
            <el-descriptions-item label="归属地区">{{
              userStore.user.areaFlag
            }}</el-descriptions-item>
            <el-descriptions-item label="账号等级">
              <el-tag size="small">{{ userStore.user.areaLevel }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="roleId">
              {{ userStore.user.roleId }}
            </el-descriptions-item>
            <el-descriptions-item label="权限字符">
              <el-tag>{{ userStore.user.roleUnitCode }}</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
        <el-card class="margin-top-15 log-content" header="本地网络日志">
          <el-empty v-if="!logStore.logList || logStore.logList.length === 0" />
          <div v-else>
            <el-card
              class="log-item"
              v-for="(item, index) in logStore.logList"
              :key="index"
            >
              <log :item="item" />
            </el-card>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="log-content" header="待办事项">
          <el-empty v-if="!msgList || msgList.length === 0" />
          <div v-else>
            <el-card
              class="margin-top-15"
              :key="index"
              v-for="(item, index) in msgList"
            >
              <notify :item="item" />
            </el-card>
          </div>
        </el-card>
      </el-col>
      <el-backtop :right="100" :bottom="100" />
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
