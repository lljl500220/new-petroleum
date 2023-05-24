<script setup lang="ts">
import { useUserStore } from "@/store/user.ts";
import Screenfull from "@/components/Screenfull/index.vue";
import { ref } from "vue";

const userStore = useUserStore();
const showScreenfull = ref(true);
const logout = () => {
  console.log("logout");
  showScreenfull.value = true;
};
</script>

<template>
  <div class="right-menu">
    <Screenfull
      element=".app-main"
      openTips="内容区全屏"
      class="right-menu-item"
    />
    <el-dropdown>
      <div class="el-dropdown-link">
        <el-avatar :size="24">
          <el-icon>
            <Avatar />
          </el-icon>
        </el-avatar>
        <span>{{ userStore.username }}</span>
        <span class="size-small">{{ userStore.phone }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="Document" @click="logout">
            帮助文档
          </el-dropdown-item>
          <el-dropdown-item icon="Finished" @click="logout">
            退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<style scoped lang="scss">
.right-menu {
  display: flex;
  align-items: center;
  color: #ffffff;
  margin-right: 10px;

  .right-menu-item {
    margin-right: 10px;
  }

  .el-dropdown {
    .el-dropdown-link {
      color: #ffffff;
      display: flex;
      align-items: center;

      &:focus {
        outline: none;
      }

      .el-icon {
        font-size: 20px;
      }

      .size-small {
        font-size: 14px;
      }

      span {
        margin-left: 10px;
        font-weight: lighter;
        font-size: 16px;
      }
    }
  }
}
</style>
