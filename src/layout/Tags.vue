<script setup lang="ts">
const closeTag = () => {
    console.log('close tag')
}

const addTag = () => {

}

</script>

<template>
    <div class="scrollbar-content">
        <div class="arrow-left">
            <el-icon class="arrow-icon">
                <ArrowLeft/>
            </el-icon>
        </div>
        <el-scrollbar>
            <div class="link-box" v-for="item in 20">
                <router-link to="/">
                    企业档案1
                    <el-icon @click.prevent.stop="closeTag" class="link-icon">
                        <Close/>
                    </el-icon>
                </router-link>
            </div>
        </el-scrollbar>
        <div class="arrow-right">
            <el-icon class="arrow-icon">
                <ArrowRight/>
            </el-icon>
        </div>
    </div>
</template>

<style lang="less" scoped>
:deep(.el-scrollbar) {
  flex: 1;
  // 横向超出窗口长度时，显示滚动条
  white-space: nowrap;
  width: calc(100% - 5rem);
  position: absolute;
  left: 2rem;
  padding-left: 10px;
  padding-right: 10px;
}

:deep(.el-scrollbar__view) {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
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
}

.arrow-right {
  text-align: center;
  vertical-align: middle;
  width: 2rem;
  font-size: 1.5rem;
  position: absolute;
  right: 0;
  height: 100%;
  box-shadow: -5px 0 5px -6px #ccc;
}

.arrow-icon:hover {
  cursor: pointer;
  box-shadow: 1px 0 1px 2px rgba(0, 0, 0, 0.2),
  -1px 0 1px 2px rgba(0, 0, 0, 0.2),
    0px -1px 1px 2px rgba(0, 0, 0, 0.2),
  0 1px 1px 2px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
}

.link-box {
  display: inline;
  position: relative;
  top: 50%;
  cursor: pointer;
  transform: translateY(-50%);
  border: 1px #d8dce5 solid;
  color: #495060;
  height: 2rem;
  border-radius: 3px;
  padding: 0 5px 0 5px;
  line-height: 2rem;
  font-size: 14px;
  margin-right: 10px;
  transition: all 1s;
}

.link-box:hover {
  background-color: #d8dce5;
  transition: all 0.5s;

  .link-icon {
    display: inline;
  }
}


.link-icon {
  display: none;
  vertical-align: -15%;
  font-size: 14px;
  transition: all 0.5s;

  :hover {
    background-color: #6d8ed9;
    border-radius: 50%;
    color: white;
    transform: scale(1.2, 1.2);
    transition: transform 0.5s;
  }
}


a {
  color: #000;
  text-decoration: none;
}
</style>