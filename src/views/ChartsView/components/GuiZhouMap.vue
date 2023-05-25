<template>
  <div class="img-container">
    <div class="map-img img-pos"><img :src="mapImg" alt="map" /></div>
    <div class="jt-img img-pos"><img :src="jt" alt="jt" /></div>
    <div class="lbx-img img-pos"><img :src="lbx" alt="lbx" /></div>
  </div>
  <div class="map rem-300" ref="map"></div>
</template>

<script lang="ts" setup>
import jt from "@/assets/ChartsViewImg/jt.png";
import mapImg from "@/assets/ChartsViewImg/map.png";
import lbx from "@/assets/ChartsViewImg/lbx.png";
import { onMounted, reactive, ref } from "vue";
import * as echarts from "echarts";
import guizhou from "../json/guizhou.json";
import lps from "../json/lps.json";
import qxn from "../json/qxn.json";
import qdn from "../json/qdn.json";
import anshun from "../json/as.json";
import bj from "../json/bj.json";
import gy from "../json/gy.json";
import tr from "../json/tr.json";
import zy from "../json/zy.json";
import qn from "../json/qn.json";

const map: any = ref(null);

const option = reactive({
  grid: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  series: [
    {
      name: "数据名称",
      type: "map",
      map: "",
      label: {
        show: true,
        formatter: (param: any) => {
          switch (param.name) {
            case "黔西南布依族苗族自治州":
              return "黔西南";
            case "黔南布依族苗族自治州":
              return "黔南州";
            case "黔东南苗族侗族自治州":
              return "黔东南";
            case "六盘水市":
              return "六盘水";
          }
        },
        color: "#fff",
        fontSize: "1.2rem",
        fontFamily: "FangSong",
      },
      // layoutCenter: ["50%", "50%"], //位置
      // layoutSize: "100%",
      select: {
        itemStyle: {
          areaColor: "#3262de",
        },
        label: {
          color: "#000",
          fontSize: "1.4rem",
          fontWeight: "bold",
        },
      },
      itemStyle: {
        normal: {
          areaColor: "rgba(45,197,203,0.8)", //rgba设置透明度0
          borderColor: "#fff",
          borderWidth: 1,
          shadowColor: "rgba(0,54,255, 1)",
          shadowBlur: 50,
        },
        emphasis: {
          areaColor: "#708fe0",
          shadowColor: "rgba(0,54,255, 1)",
          shadowBlur: 50,
        },
      },
    },
  ],
});

const mapList = [guizhou, gy, lps, zy, anshun, bj, tr, qn, qxn, qdn];
const chart = ref<any>()
//改变地图
const changeMap = (name: string, index: number) => {
  option.series[0].map = name;
  map.value && echarts.dispose(map.value);
  echarts.registerMap(name, mapList[index]);
  chart.value = echarts.init(map.value);
  chart.value.setOption(option);
};

defineExpose({ changeMap });

window.addEventListener("resize",function (){
  chart.value.resize()
});

onMounted(() => {});
</script>

<style scoped lang="scss">
@function px2rem($px) {
  $design_font_size: 12;
  @return calc($px/$design_font_size) + rem;
}

.img-container{
  position: absolute;
  left: px2rem(275);
  top: px2rem(90);
  .img-pos {
    pointer-events: none;
    position: absolute;

    img {
      width: px2rem(200);
      height: px2rem(200);
      object-fit: cover;
    }
  }
}

@keyframes jtAnimation {
  0% {
    transform: rotate(0deg) scale(1.4, 1.4);
  }
  50% {
    transform: rotate(-180deg) scale(1.6, 1.6);
  }
  100% {
    transform: rotate(-360deg) scale(1.4, 1.4);
  }
}

@keyframes lbxAnimation {
  0% {
    transform: rotate(0deg) scale(1.1, 1.1);
  }
  50% {
    transform: rotate(180deg) scale(1.3, 1.3);
  }
  100% {
    transform: rotate(360deg) scale(1.1, 1.1);
  }
}

.map-img {
  opacity: 0.8;
  z-index: 1;
}

.lbx-img {
  animation: lbxAnimation 10s linear infinite;
  z-index: 3;
}

.jt-img {
  animation: jtAnimation 5s linear infinite;
  z-index: 2;
}

@keyframes mapAnimation {
  0% {
    transform: scale(1.2, 1.2);
  }
  70% {
    transform: scale(1.4, 1.4);
  }
  100% {
    transform: scale(1.2, 1.2);
  }
}

.map {
  position: absolute;
  width: px2rem(380);
  height: px2rem(340);
  left: px2rem(185);
  top: px2rem(40);
  z-index: 10;
}
</style>