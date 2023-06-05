<script setup lang="ts">
function setFontSize() {
  const designWidth = 1920 //设计稿的宽度，根据实际项目调整
  const designHeight = 1080 //设计稿的高度，根据实际项目调整
  const fontSize =
    document.documentElement.clientWidth /
      document.documentElement.clientHeight <
    designWidth / designHeight
      ? (document.documentElement.clientWidth / designWidth) * 12
      : (document.documentElement.clientHeight / designHeight) * 12
  document.querySelector('html').style.fontSize = fontSize + 'px'
  console.log(fontSize)
}

window.onresize = function () {
  setFontSize()
}
</script>

<template>
  <div class="screen-wrapper">
    <div class="screen" id="screen">
      <div class="section">A</div>
      <div class="section">A</div>
      <div class="section">B</div>
      <div class="section">C</div>
      <div class="section">D</div>
      <div class="section">E</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$design_width: 1920; //设计稿的宽度，根据实际项目调整
$design_height: 1000; //设计稿的高度，根据实际项目调整

@function px2rem($px) {
  $design_font_size: 12;
  @return calc($px/$design_font_size) + rem;
}

.screen-wrapper {
  height: 100vh;
  width: 100vw;
  background-color: aqua;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  .screen {
    display: flex;
    flex-direction: row;
    justify-content: center;
    min-width: 1000px;
    min-height: 700px;
    width: px2rem($design_width);
    height: px2rem($design_height - 0);
    background: pink;

    .section {
      height: px2rem(200);
      width: px2rem(200);
      border: 1px solid #000;
      line-height: px2rem(200);
      font-size: px2rem(100);
      margin: px2rem(20);
      text-align: center;
      display: inline-block;
    }
  }
}
</style>
