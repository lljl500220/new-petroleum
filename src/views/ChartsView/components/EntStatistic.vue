<template>
  <el-row>
    <el-col v-for="item in props.param" :span="item.span">
      <el-statistic :class="{'view-right':item.right,'view-left':item.left}" :title="item.title" :value="item.value"></el-statistic>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
interface Props {
  param: Statistic[];
}

interface Statistic {
  title: string;
  value: number;
  span: number;
  right: boolean,
  left: boolean,
}

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
@function px2rem($px) {
  $design_font_size: 12;
  @return calc($px/$design_font_size) + rem;
}

:deep(.el-col) {
  font-family: FangSong, serif;
  margin-top: px2rem(12);
  text-align: center;
  display: flex;
  justify-content: space-around;

  .el-statistic__head {
    font-size: px2rem(12);
    color: #fff;
  }

  .el-statistic__content {
    font-size: px2rem(12);
    color: #fff;
  }
}
.view-right{
  margin-left: auto !important;
}
.view-left{
  margin-right: auto !important;
}
</style>