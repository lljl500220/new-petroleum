<script setup lang="ts">

</script>

<template>
    <div class="scrollbar-content">
        <div class="arrow-left">
            <el-icon class="arrow-icon">
                <ArrowLeft/>
            </el-icon>
        </div>
        <el-scrollbar>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
        </el-scrollbar>
    </div>
</template>

<style lang="less" scoped>
:deep(.el-scrollbar) {
  width: calc(100% - 2rem);
  position: absolute;
  left: 2rem;
}

:deep(.el-scrollbar__view) {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  float: right;
}

.scrollbar-content {
  width: 100%;
  height: 100%;
  position: relative;
}

.arrow-left {
  text-align: center;
  vertical-align: middle;
  float: left;
  width: 2rem;
  font-size: 1.5rem;
  height: 100%;
  box-shadow: 5px 0 5px -6px #ccc;


  .arrow-icon:hover {
    cursor: pointer;
    box-shadow: 1px 0 1px 2px rgba(0, 0, 0, 0.2),
    -1px 0 1px 2px rgba(0, 0, 0, 0.2),
      0px -1px 1px 2px rgba(0, 0, 0, 0.2),
    0 1px 1px 2px rgba(0, 0, 0, 0.2);
      transition: all 0.5s;
  }
}
</style>