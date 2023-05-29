<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import GuiZhouMap from "@/views/ChartsView/components/GuiZhouMap.vue";
import EntStatistic from "@/views/ChartsView/components/EntStatistic.vue";
import BusinessTable from "@/views/ChartsView/components/BusinessTable.vue";
import LineChart from "@/views/ChartsView/components/LineChart.vue";
import RoseChart from "@/views/ChartsView/components/RoseChart.vue";
import BarChart from "@/views/ChartsView/components/BarChart.vue";
import PieChart from "@/views/ChartsView/components/PieChart.vue";
import MissStatistic from "@/views/ChartsView/components/MissStatistic.vue";
import CustomStackBar from "@/views/ChartsView/components/CustomStackBar.vue";
import {get} from "@/utils/http.ts";

const router = useRouter();
const screenWrapper = ref<HTMLElement>();
const defaultFontSize = ref(16);

const locationString = ref("");

/**
 * 计算视图比例，实现等比缩放
 */
function setFontSize() {
  const designWidth = 1920; //设计稿的宽度，根据实际项目调整
  const designHeight = 992; //设计稿的高度，根据实际项目调整
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
  { title: "累计加油量(万升)", value: 1000, span: 12, left: true },
  { title: "累计交易金额(万元)", value: 2000, span: 12, right: true },
]);
//地图逻辑 结束

//企业档案
const entStatistic = ref([
  { title: "企业入驻总数", value: 1000, span: 8 },
  { title: "企业建档总数", value: 2000, span: 8 },
  { title: "税控系统安装总数", value: 2000, span: 8 },
]);

// 加油站经营情况趋势图 开始
const lineChart: any = ref(null);

const lineData = reactive({
  xData: ["2023-3", "2023-4", "2023-5", "2023-6", "2023-7", "2023-8"],
  data: [
    [100000, 230200, 313200, 42300, 51000, 216000],
    [12, 31, 24, 15, 56, 17],
  ],
});
//结束
//加油金额占比 开始
const roseChart: any = ref(null);
const roseData = reactive({
  data: [
    { value: 101, name: "贵阳市", select: true },
    { value: 102, name: "六盘水" },
    { value: 103, name: "遵义市" },
    { value: 104, name: "安顺市" },
    { value: 105, name: "毕节市" },
    { value: 106, name: "铜仁市" },
    { value: 107, name: "黔南州" },
    { value: 108, name: "黔西南" },
    { value: 109, name: "黔东南" },
  ],
});
//结束

//油品交易情况 开始
const barChart: any = ref(null);
const barData = reactive({
  data: [100, 233, 133, 234, 125, 145],
});

//预警模块
const pieChart: any = ref(null);
const stackBar: any = ref(null);
const pieData = reactive({
  data: [
    { value: 101, name: "贵阳市" },
    { value: 102, name: "六盘水" },
    { value: 103, name: "遵义市" },
    { value: 104, name: "安顺市" },
    { value: 105, name: "毕节市" },
    { value: 106, name: "铜仁市" },
    { value: 107, name: "黔南州" },
    { value: 108, name: "黔西南" },
    { value: 109, name: "黔东南" },
  ],
});
const stackBarData = reactive({
  data: [
    [101, 101, 101, 101, 101, 101, 101, 101, 101, 101],
    [101, 101, 101, 101, 101, 101, 101, 101, 101, 101],
  ],
});

const stackBarName = [
  "贵州省",
  "贵阳市",
  "六盘水",
  "遵义市",
  "安顺市",
  "毕节市",
  "铜仁市",
  "黔南州",
  "黔西南",
  "黔东南",
];

const missRate = ref([
  { title: "贵阳市", data: [0.5, 0.4, 0.3, 0.2], rate: "10%" },
  { title: "六盘水", data: [0.5, 0.4, 0.3, 0.2], rate: "20%" },
  { title: "遵义市", data: [0.5, 0.4, 0.3, 0.2], rate: "30%" },
  { title: "安顺市", data: [0.5, 0.4, 0.3, 0.2], rate: "100%" },
  { title: "毕节市", data: [0.5, 0.4, 0.3, 0.2], rate: "20%" },
  { title: "铜仁市", data: [0.5, 0.4, 0.3, 0.2], rate: "30%" },
  { title: "黔南州", data: [0.5, 0.4, 0.3, 0.2], rate: "40%" },
  { title: "黔西南", data: [0.5, 0.4, 0.3, 0.2], rate: "50%" },
  { title: "黔东南", data: [0.5, 0.4, 0.3, 0.2], rate: "60%" },
]);

const resetChart = (name, index) => {
  locationString.value = name;
  map.value.changeMap(name, index);
  lineChart.value.initChart(lineData.data, lineData.xData);
  roseChart.value.initChart(roseData.data);
  barChart.value.initChart(barData.data);
  pieChart.value.initChart(pieData.data);
  stackBar.value.initChart(stackBarName, stackBarData.data);
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
  resetChart("贵州", 0);
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
          <div class="location">
            <el-icon>
              <MapLocation />
            </el-icon>
            <span>{{ locationString }}</span>
          </div>
        </div>
        <div class="front-item">
          <router-link to="/home">
            <el-button class="link-button" type="primary" size="small"
              >管理后台</el-button
            >
          </router-link>
        </div>
      </div>
      <div class="screen-content">
        <div class="map-container">
          <div class="map-chart-container content-border">
            <ent-statistic :param="mapStatistic" />
            <div class="btn-content left">
              <el-button
                v-for="(item, index) in mapBtnLeft"
                @click="mapChange(item, index)"
                :class="{ active: isActive === index }"
                >{{ item }}
              </el-button>
            </div>
            <div class="btn-content right">
              <el-button
                v-for="(item, index) in mapBtnRight"
                @click="mapChange(item, index + 5)"
                :class="{ active: isActive === index + 5 }"
                >{{ item }}
              </el-button>
            </div>
            <gui-zhou-map ref="map" />
          </div>
          <div class="ent-info-container content-border">
            <ent-statistic class="statistic-content" :param="entStatistic" />
          </div>
          <div class="scroll-table-container content-border">
            <business-table />
          </div>
        </div>
        <div class="content-item">
          <div class="item-child content-border">
            <line-chart ref="lineChart" />
          </div>
          <div class="item-child content-border">
            <rose-chart ref="roseChart" />
          </div>
          <div class="item-child content-border">
            <bar-chart ref="barChart" />
          </div>
        </div>
        <div class="content-border content-item-right">
          <div class="pie-chart">
            <pie-chart ref="pieChart" />
          </div>
          <div class="stack-bar box">
            <span />
            <span />
            <span />
            <span />
            <custom-stack-bar ref="stackBar" />
            <span>加油站关联数据对比</span>
          </div>
          <div class="statistic-box">
            <span
              >各地州数据缺失率<el-icon STYLE="vertical-align: middle"
                ><DArrowRight /></el-icon
            ></span>
            <miss-statistic
              v-for="(item, index) in missRate"
              :title="item.title"
              :rate="item.rate"
              :key="index"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
html,
body {
  font-family: FangSong, serif;
}

$design_width: 1920; //设计稿的宽度，根据实际项目调整
$design_height: 992; //设计稿的高度，根据实际项目调整
@function px2rem($px) {
  $design_font_size: 12;
  @return calc($px/$design_font_size) + rem;
}

@mixin title {
  position: absolute;
  font-size: px2rem(20);
  letter-spacing: 5px;
  font-weight: 400;
  font-family: "SimSun", FangSong, serif;
  color: #fff;
  text-align: center;
  line-height: px2rem(43);
  left: 50%;
  transform: translateX(-50%);
  text-shadow: 0 0 10px #5b66e3, 0 0 20px #5b66e3, 0 0 30px #5b66e3,
    0 0 40px #5b66e3;
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
        margin-bottom: 5px;

        .location {
          display: flex;
          font-family: FangSong, sans-serif;
          font-weight: bold;
          font-size: px2rem(25);

          span {
            margin-left: 10px;
          }
        }

        .link-button {
          display: inline-block;
          animation: heartBeat 2s infinite; /* referring directly to the animation's @keyframe declaration */
          height: px2rem(30);
          background-color: rgba(80, 113, 210, 0.2) !important;
          z-index: 30;
          margin-right: 10px;

          a {
            height: 100%;
            width: 100%;
            text-decoration: none;
            color: #fff;
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
            @include title //background-color: rgba(144,123,245,0.1);
;
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
            @include title;
          }

          .statistic-content {
            margin-top: px2rem(50);
          }
        }

        .scroll-table-container {
          height: px2rem(300);
          position: relative;

          &:before {
            content: "实时订单";
            @include title;
          }
        }
      }

      .content-item {
        height: 100%;
        width: px2rem(574);
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .item-child {
          width: 100%;

          &:nth-child(1) {
            position: relative;
            height: px2rem(300);

            &:before {
              content: "加油站经营情况趋势图(月)";
              @include title;
              letter-spacing: 0;
            }
          }

          &:nth-child(2) {
            position: relative;
            height: px2rem(290);

            &:before {
              content: "各地加油站加油金额占比(上月)";
              @include title;
              letter-spacing: 0;
            }
          }

          &:nth-child(3) {
            position: relative;
            height: px2rem(300);

            &:before {
              content: "各油品交易情况(上月)";
              @include title;
              letter-spacing: 0;
            }
          }
        }

        .right {
          &:before {
            content: "各油品交易情况(上月)";
            @include title;
            letter-spacing: 0;
          }
        }
      }

      .content-item-right {
        height: 100%;
        width: px2rem(574);
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: space-between;

        &:before {
          content: "预警模块";
          @include title;
        }

        .pie-chart {
          margin-top: px2rem(50);
          width: 100%;
          height: px2rem(280);
        }

        .stack-bar {
          width: 100%;
          position: relative;
          height: px2rem(300);
        }

        .box {
          position: relative;
          overflow: hidden;

          span {
            position: absolute;
            display: block;
          }

          /* 从左到右 */
          span:nth-child(1) {
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #5b66e3);
            animation: animate1 3s linear infinite;
          }

          @keyframes animate1 {
            0% {
              left: -100%;
            }
            50%,
            100% {
              left: 100%;
            }
          }

          /* 从上到下 */
          span:nth-child(2) {
            top: -100%;
            right: 0;
            width: 2px;
            height: 100%;
            background: linear-gradient(180deg, transparent, #5b66e3);
            animation: animate2 3s linear infinite;
            animation-delay: 0.75s;
          }

          @keyframes animate2 {
            0% {
              top: -100%;
            }
            50%,
            100% {
              top: 100%;
            }
          }

          /* 从右到左 */
          span:nth-child(3) {
            right: -100%;
            bottom: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(270deg, transparent, #5b66e3);
            animation: animate3 3s linear infinite;
            animation-delay: 1.5s;
          }

          @keyframes animate3 {
            0% {
              right: -100%;
            }
            50%,
            100% {
              right: 100%;
            }
          }

          /* 从下到上 */
          span:nth-child(4) {
            bottom: -100%;
            left: 0;
            width: 2px;
            height: 100%;
            background: linear-gradient(360deg, transparent, #5b66e3);
            animation: animate4 3s linear infinite;
            animation-delay: 2.25s;
          }

          @keyframes animate4 {
            0% {
              bottom: -100%;
            }
            50%,
            100% {
              bottom: 100%;
            }
          }
        }

        .statistic-box {
          text-align: center;
          width: 100%;
          height: px2rem(280);
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;

          span {
            text-align: center;
            height: px2rem(80);
            display: flex;
            width: px2rem(100);
            padding-top: 10px;
            color: rgb(55, 162, 255);
            font-family: "SimSun", FangSong, serif;
            align-items: center;
            font-weight: bold;
            font-size: 1.5rem;
            @keyframes arrowRight {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(30%);
              }
            }

            .el-icon {
              animation: arrowRight 500ms linear;
              animation-direction: alternate;
              animation-iteration-count: infinite;
            }

            &:hover {
              text-shadow: 0 0 10px #5b66e3, 0 0 20px #5b66e3, 0 0 30px #5b66e3,
                0 0 40px #5b66e3;
            }
          }
        }
      }
    }
  }
}

.content-border {
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
