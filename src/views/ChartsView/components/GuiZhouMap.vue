<template>
    <div class="img-container">
        <div class="map-img img-pos"><img :src="mapImg" alt="map"/></div>
        <div class="jt-img img-pos"><img :src="jt" alt="jt"/></div>
        <div class="lbx-img img-pos"><img :src="lbx" alt="lbx"/></div>
    </div>
    <div class="map rem-300" ref="map"></div>
</template>

<script lang="ts" setup>
import jt from "@/assets/ChartsViewImg/jt.png";
import mapImg from "@/assets/ChartsViewImg/map.png";
import lbx from "@/assets/ChartsViewImg/lbx.png";
import {onMounted, reactive, ref} from "vue";
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
import {codes} from "@/views/ChartsView/utils/code.ts";

const map: any = ref(null);

const codeProvince = [{name: "贵阳市", value: 2000, selected: true},
    {name: "遵义市", value: 2000},
    {name: "六盘水", value: 2000},
    {name: "毕节市", value: 2000},
    {name: "铜仁市", value: 2000},
    {name: "安顺市", value: 2000},
    {name: "黔西南", value: 2000},
    {name: "黔东南", value: 2000},
    {name: "黔南州", value: 2000},]

const tempData = ref(codeProvince)
const mapList = [guizhou, gy, lps, zy, anshun, bj, tr, qn, qxn, qdn];
const chart = ref<any>()

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
            selectedMode: 'single',
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
            data: []
        },
    ],
});
const changeMapActive = (name: string) => {
    // debugger
    let mapType = null
    let newName = ''
    switch (name) {
        case '贵州省':
            mapType = guizhou;
            newName = 'guizhou';
            tempData.value = codeProvince
            break
        case '贵阳市':
            mapType = gy;
            newName = 'gy';
            tempData.value = codes.cityList[0].cityList
            break
        case '黔东南':
            mapType = qdn;
            newName = 'qdn';
            tempData.value = codes.cityList[7].cityList
            break
        case '黔西南':
            mapType = qxn;
            newName = 'qxn';
            tempData.value = codes.cityList[5].cityList
            break
        case '六盘水':
            mapType = lps;
            newName = 'lps';
            tempData.value = codes.cityList[1].cityList
            break
        case '毕节市':
            mapType = bj;
            newName = 'bj';
            tempData.value = codes.cityList[6].cityList
            break
        case '铜仁市':
            mapType = tr;
            newName = 'tr';
            tempData.value = codes.cityList[4].cityList
            break
        case '安顺市':
            mapType = anshun;
            newName = 'as';
            tempData.value = codes.cityList[3].cityList
            break
        case '黔南州':
            mapType = qn;
            newName = 'qn';
            tempData.value = codes.cityList[8].cityList
            break
        case '遵义市':
            mapType = zy;
            newName = 'zy';
            tempData.value = codes.cityList[2].cityList
            break
    }
    option.series[0].data = tempData.value
}

//改变地图
const changeMap = (name: string, index: number) => {
    option.series[0].map = name;
    changeMapActive(name)
    map.value && echarts.dispose(map.value);
    echarts.registerMap(name, mapList[index]);
    chart.value = echarts.init(map.value);
    chart.value.setOption(option);
};


defineExpose({changeMap});

window.addEventListener("resize", function () {
    chart.value.resize()
});

onMounted(() => {
});
</script>

<style scoped lang="scss">
@function px2rem($px) {
  $design_font_size: 12;
  @return calc($px/$design_font_size) + rem;
}

.img-container {
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