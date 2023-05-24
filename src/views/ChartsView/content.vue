<script setup lang="ts">
import {onMounted, ref} from "vue";

const screenWrapper = ref<HTMLElement>()

function setFontSize() {
    let designWidth = 1920;//设计稿的宽度，根据实际项目调整
    let designHeight = 1080;//设计稿的高度，根据实际项目调整
    var fontSize =
        document.documentElement.clientWidth / document.documentElement.clientHeight < designWidth / designHeight ?
            (document.documentElement.clientWidth / designWidth) * 12 :
            (document.documentElement.clientHeight / designHeight) * 12;
    document.querySelector('html').style.fontSize = fontSize + 'px';
    console.log(fontSize)
}

window.onresize = function () {
    setFontSize()
};

onMounted(() => {
    setFontSize()
    // screenWrapper.value.style.height = document.documentElement.clientHeight + "px"
    // screenWrapper.value.style.width = document.documentElement.clientWidth + "px"
})
</script>

<template>
    <div ref="screenWrapper" class="screen-wrapper">
        <div class="title-bar"></div>
        <div class="screen" id="screen">
            <div class="screen-front">
                <div class="front-item">1111</div>
                <div class="front-item">1111</div>
            </div>
            <div class="screen-content">

            </div>
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
  width: 100%;
  height: 100%;
  position: relative;
  background: url("../../assets/ChartsViewImg/img.png");
  background-size: cover;

  &:before {
    position: absolute;
    content: '';
    width: 100%;
    height: px2rem(83);
    background: url("../../assets/ChartsViewImg/顶部背景.png");
    background-size: cover;
    z-index: 2;
  }

  .screen {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: px2rem($design_width);
    height: px2rem($design_height);
    border: 1px pink solid;

    .screen-front {
      display: flex;
      justify-content: space-between;
      align-items: end;
      width: 100%;
      height: px2rem(83);

      .front-item {
        margin-bottom: 5px;
      }
    }

    .screen-content {
      position: absolute;
      width: 100%;
      height: px2rem(917);
      bottom: 0;
      background-color: #5b66e3;
    }


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
