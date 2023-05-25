<template>
  <div class="rose-chart-dom" ref="roseChart"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import {reactive, ref} from "vue";

const roseChart:any = ref(null)

const option = reactive({
  tooltip: {
    trigger: "item",
    formatter: "{b} : {c}(万元)({d}%)",
  },
  legend: {
    icon: "rect",
    orient: "vertical",
    right: 0,
    itemHeight: 15,
    itemWidth: 15,
    textStyle: {
      color: 'rgb(55, 162, 255)',
      fontSize:10,
      padding: [0,0,0,1]
    },
  },
  graphic: {
    show: true,
    type: "text",
    left: "34%",
    top: "48%",
    style: {
      textAlign: "center",
    },
  },
  series: [
    {
      radius: ["20%", "70%"],
      center: ["35%", "50%"],
      roseType: "area",
      type: "pie",
      avoidLabelOverlap: false,
      label: {
        formatter: "{d}%",
        fontWeight: 'normal',
        fontSize: '1.2rem',
        color: 'rgb(55, 162, 255)',
      },
      itemStyle: {
        borderRadius: 2
      },
      labelLine:{
        normal:{
          length:5
        }
      },
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 0,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
})

const initChart = (data: any[]) => {
  roseChart.value && echarts.dispose(roseChart.value)
  option.series[0].data = data
  const chart = echarts.init(roseChart.value)
  chart.setOption(option, false)
  window.addEventListener('resize',function () {
    chart.resize()
  })
}
defineExpose({initChart})
</script>

<style scoped lang="scss">
@function px2rem($px) {
  $design_font_size: 12;
@return calc($px/$design_font_size) + rem;
}
.rose-chart-dom {
  position: absolute;
  top: px2rem(50);
  width: px2rem(550);
  height: px2rem(240);
}
</style>
