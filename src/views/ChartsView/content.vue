<script setup lang="ts">
import {onBeforeUnmount, onMounted, reactive, ref} from "vue";
import { useRouter } from "vue-router";
import GuiZhouMap from "@/views/ChartsView/components/GuiZhouMap.vue";
import EntStatistic from "@/views/ChartsView/components/EntStatistic.vue";
import BusinessTable from "@/views/ChartsView/components/BusinessTable.vue";
import LineChart from "@/views/ChartsView/components/LineChart.vue";
import RoseChart from "@/views/ChartsView/components/RoseChart.vue";

const router = useRouter();
const screenWrapper = ref<HTMLElement>();
const defaultFontSize = ref(16);

/**
 * 计算视图比例，实现等比缩放
 */
function setFontSize() {
  let designWidth = 1920; //设计稿的宽度，根据实际项目调整
  let designHeight = 992; //设计稿的高度，根据实际项目调整
  const fontSize =
    document.documentElement.clientWidth /
      document.documentElement.clientHeight <
    designWidth / designHeight
      ? (document.documentElement.clientWidth / designWidth) * 12
      : (document.documentElement.clientHeight / designHeight) * 12;
  document.querySelector("html").style.fontSize = fontSize + "px";
}

//添加事件监听，浏览器尺寸缩放时触发rem计算
window.onresize = function () {
  setFontSize();
  // console.log(document.documentElement.clientHeight)
};

//阻止用户手动缩放页面
const mousewheel = (e: Event) => {
  e = e || window.event;
  if ((e.wheelDelta && event.ctrlKey) || e.detail) {
    event.preventDefault();
  }
};
//阻止用户手动缩放页面
const keydown = (event: KeyboardEvent) => {
  if (
    (event.ctrlKey === true || event.metaKey === true) &&
    (event.keyCode === 61 ||
      event.keyCode === 107 ||
      event.keyCode === 173 ||
      event.keyCode === 109 ||
      event.keyCode === 187 ||
      event.keyCode === 189)
  ) {
    event.preventDefault();
  }
};
//初始化时计算当前视图和标准视图的比例差值，并重新计算rem的值
setFontSize();

//地图逻辑 开始
const map: any = ref();

//地图按钮
const isActive = ref(0);
const mapBtnLeft = ["贵州省", "贵阳市", "六盘水", "遵义市", "安顺市"];
const mapBtnRight = ["毕节市", "铜仁市", "黔南州", "黔西南", "黔东南"];

//按钮改变
const mapChange = (name: string, index: number) => {
  isActive.value = index;
  map.value.changeMap(name, index);
  resetChart(name, index);
};

//两个展示信息的内容
const mapStatistic = ref([
  { title: "累计加油量(万升)", value: 1000, span: 12 ,left:true},
  { title: "累计交易金额(万元)", value: 2000, span: 12,right:true},
]);
//地图逻辑 结束

//企业档案
const entStatistic = ref([
  {title: '企业入驻总数', value: 1000, span: 8},
  {title: '企业建档总数', value: 2000, span: 8},
  {title: '税控系统安装总数', value: 2000, span: 8}
])

// 加油站经营情况趋势图 开始
const lineChart: any = ref(null)

const lineData = reactive({
  xData: ['2023-3','2023-4','2023-5','2023-6','2023-7','2023-8'],
  data: [
    [100000, 230200, 313200, 42300, 51000, 216000],
    [12, 31, 24, 15, 56, 17]
  ],
})
//结束


const resetChart = (name, index) => {
  map.value.changeMap(name, index);
  lineChart.value.initChart(lineData.data, lineData.xData)
};

onMounted(() => {
  defaultFontSize.value = parseInt(
    getComputedStyle(document.documentElement).fontSize
  );
  //添加缩放禁止
  document.addEventListener("mousewheel", mousewheel, {
    capture: false,
    passive: false,
  });
  document.addEventListener("keydown", keydown, false);
  resetChart('贵州', 0)
});

onBeforeUnmount(() => {
  //移除缩放禁止
  document.removeEventListener("mousewheel", mousewheel, false);
  document.removeEventListener("keydown", keydown, false);
  document.querySelector("html").style.fontSize = defaultFontSize.value + "px";
});
</script>

<template>
  <div ref="screenWrapper" class="screen-wrapper">
    <div class="screen" id="screen">
      <div class="screen-front">
        <div class="front-item">
          <router-link to="/test/test11">222</router-link>
        </div>
        <div class="front-item">
          <el-button class="link-button" type="primary" size="small">
            <span>管理后台</span>
          </el-button>
        </div>
      </div>
      <div class="screen-content">
        <div class="map-container">
          <div class="map-chart-container content-border">
            <ent-statistic :param="mapStatistic"></ent-statistic>
            <div class="btn-content left">
              <el-button v-for="(item,index) in mapBtnLeft" @click="mapChange(item,index)"
                         :class="{active:isActive === index}">{{ item }}
              </el-button>
            </div>
            <div class="btn-content right">
              <el-button v-for="(item,index) in mapBtnRight" @click="mapChange(item,index+5)"
                         :class="{active:isActive === index+5}">{{ item }}
              </el-button>
            </div>
            <gui-zhou-map ref="map"></gui-zhou-map>
          </div>
          <div class="ent-info-container content-border">
            <ent-statistic class="statistic-content" :param="entStatistic"></ent-statistic>
          </div>
          <div class="scroll-table-container content-border">
            <business-table></business-table>
          </div>
        </div>
        <div class="content-item">
          <div class="item-child content-border">
            <line-chart ref="lineChart"></line-chart>
          </div>
          <div class="item-child content-border">
            <rose-chart ref="roseChart"></rose-chart>
          </div>
          <div class="item-child content-border">
          </div>
        </div>
        <div class="content-item"></div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
html,body{
  font-family: FangSong, serif;
}
$design_width: 1920; //设计稿的宽度，根据实际项目调整
$design_height: 992; //设计稿的高度，根据实际项目调整
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

  .screen {
    margin-left: 50%;
    transform: translateX(-50%);
    width: px2rem($design_width);
    height: px2rem($design_height);

    &:before {
      position: absolute;
      content: "";
      width: 100%;
      height: px2rem(83);
      background: url("../../assets/ChartsViewImg/顶部背景.png");
      background-size: cover;
    }

    .screen-front {
      display: flex;
      justify-content: space-between;
      align-items: end;
      width: 100%;
      height: px2rem(83);

      .front-item {
        color: #fff;
        font-size: px2rem(20);
        margin-bottom: 5px;

        .link-button {
          display: inline-block;
          animation: heartBeat 2s infinite; /* referring directly to the animation's @keyframe declaration */
          height: px2rem(30);
          background-color: rgba(80, 113, 210, 0.2) !important;
          margin-right: 10px;

          &:hover {
            animation: none;
          }
        }
      }
    }

    .screen-content {
      width: 100%;
      height: px2rem(900);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      justify-items: end;

      .map-container {
        width: px2rem(750);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .map-chart-container {
          width: 100%;
          position: relative;
          height: px2rem(400);
          text-align: center;

          &:before {
            content: "接入数据总量";
            position: absolute;
            font-size: px2rem(20);
            color: #64c3e5;
            font-weight: lighter;
            text-align: center;
            line-height: px2rem(43);
            height: px2rem(43);
            width: px2rem(381);
            left: 50%;
            transform: translateX(-50%);
            background: url("../../assets/ChartsViewImg/title-bg1.png") no-repeat;
            background-size: contain;
          }
          .btn-content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: absolute;
            bottom: 10px;
            width: px2rem(100);
            height: px2rem(280);
            text-align: center;

            :deep(.el-button) {
              position: relative;
              width: px2rem(90);
              height: px2rem(30);
              margin: 0;
              color: #fff;
              font-size: px2rem(12);
              font-family: FangSong, sans-serif;
              border: none;
              z-index: 1;
              background: rgba(64, 169, 255, 0.3);
              outline: none;
            }

            button:hover {
              cursor: pointer;
              animation: jelly 0.5s;
            }

            @keyframes jelly {
              0%,
              100% {
                transform: scale(1, 1);
              }

              33% {
                transform: scale(0.9, 1.1);
              }

              66% {
                transform: scale(1.1, 0.9);
              }
            }

            .active {
              background-color: rgba(64, 169, 255, 0.8);
            }
          }

          .left {
            left: 10px;
          }

          .right {
            right: 10px;
            align-items: end;
          }
        }

        .ent-info-container {
          position: relative;
          height: px2rem(190);
          &:before {
            content: "企业档案";
            position: absolute;
            font-size: px2rem(20);
            color: #64c3e5;
            font-weight: lighter;
            text-align: center;
            line-height: px2rem(43);
            height: px2rem(43);
            width: px2rem(381);
            left: 50%;
            transform: translateX(-50%);
            background: url("../../assets/ChartsViewImg/title-bg1.png") no-repeat;
            background-size: contain;
          }
          .statistic-content{
            margin-top: px2rem(50);
          }
        }

        .scroll-table-container {
          height: px2rem(300);
          position: relative;
          &:before {
            content: "实时订单";
            position: absolute;
            font-size: px2rem(20);
            color: #64c3e5;
            font-weight: lighter;
            text-align: center;
            line-height: px2rem(43);
            height: px2rem(43);
            width: px2rem(381);
            left: 50%;
            transform: translateX(-50%);
            background: url("../../assets/ChartsViewImg/title-bg1.png") no-repeat;
            background-size: contain;
          }
        }
      }

      .content-item {
        height: 100%;
        width: px2rem(574);
        display: flex;
        flex-direction: column;
        .item-child{
          width: 100%;
          &:nth-child(1){
            position: relative;
            height: px2rem(300);
            &:before {
              content: "加油站经营情况趋势图(月)";
              position: absolute;
              font-size: px2rem(20);
              color: #64c3e5;
              font-weight: lighter;
              text-align: center;
              line-height: px2rem(45);
              height: px2rem(45);
              width: px2rem(500);
              left: 50%;
              transform: translateX(-50%);
              background: url("../../assets/ChartsViewImg/title-bg2.png") no-repeat;
              background-size: contain;
            }
          }
          &:nth-child(2){
            position: relative;
            height: px2rem(290);
            &:before {
              content: "各地加油站加油金额占比(上月)";
              position: absolute;
              font-size: px2rem(20);
              color: #64c3e5;
              font-weight: lighter;
              text-align: center;
              line-height: px2rem(45);
              height: px2rem(45);
              width: px2rem(500);
              left: 50%;
              transform: translateX(-50%);
              background: url("../../assets/ChartsViewImg/title-bg2.png") no-repeat;
              background-size: contain;
            }
          }
          &:nth-child(3){
            position: relative;
            height: px2rem(300);
            &:before {
              content: "各油品交易情况(上月)";
              position: absolute;
              font-size: px2rem(20);
              color: #64c3e5;
              font-weight: lighter;
              text-align: center;
              line-height: px2rem(45);
              height: px2rem(45);
              width: px2rem(500);
              left: 50%;
              transform: translateX(-50%);
              background: url("../../assets/ChartsViewImg/title-bg2.png") no-repeat;
              background-size: contain;
            }
          }
        }
      }
    }
  }
}

.content-border {
  margin-top: 0.5rem;
  background: linear-gradient(to left, #2474b5, #2474b5) left top no-repeat,
    linear-gradient(to bottom, #2474b5, #2474b5) left top no-repeat,
    linear-gradient(to left, #2474b5, #2474b5) right top no-repeat,
    linear-gradient(to bottom, #2474b5, #2474b5) right top no-repeat,
    linear-gradient(to left, #2474b5, #2474b5) left bottom no-repeat,
    linear-gradient(to bottom, #2474b5, #2474b5) left bottom no-repeat,
    linear-gradient(to left, #2474b5, #2474b5) right bottom no-repeat,
    linear-gradient(to left, #2474b5, #2474b5) right bottom no-repeat;
  background-size: 2px 2rem, 2rem 2px, 2px 2rem, 2rem 2px;
}
</style>
