<script setup lang="ts"></script>

<template>
  <div class="error-page">
    <img src="/src/assets/img/404.svg" alt="404" />
    <el-button type="primary">
      <router-link to="/">回到首页</router-link>
    </el-button>
  </div>
</template>

<style scoped lang="scss">
.error-page {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  img {
    width: 25%;
  }
}
a {
  text-decoration: none;
  color: #fff;
}
</style>
