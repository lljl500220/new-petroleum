<script setup lang="ts">
import * as echarts from 'echarts';
import {reactive, ref} from "vue";

const barChart = ref<HTMLElement>()
const option = reactive({
  // 直角坐标系内绘图网格,设置组件距离容器的距离
  grid:{
    top:20,
    bottom:55,
    right:10
  },
  title:{
    text: '加油站关联数据对比',
    textStyle:{
      color: 'rgb(55, 162, 255)',
      fontSize: '1.5rem'
    },
    bottom: 10,
    left: 'center'
  },
  // 设置鼠标移入的提示，默认显示
  tooltip: {},
  // 设置图例
  legend:{
    show:false,
    textStyle:{
      color: '#999'
    }
  },
  // 设置x轴
  xAxis: {
    data: [],
    // 显示x轴
    axisLine: {
      show: true
    },
    // 设置x轴的颜色和偏移量
    axisLabel: {
      color: 'rgb(55, 162, 255)',
    },
    // 不显示x轴刻度
    axisTick:{
      show: false
    }
  },
  // 设置y轴
  yAxis: {
    // 显示y轴
    axisLine: {
      show: true
    },
    // 设置y轴的颜色
    axisLabel:{
      color: 'rgb(55, 162, 255)',
    },
    // 不显示y轴刻度
    axisTick:{
      show: false
    },
    // 不显示分隔线
    splitLine:{
      show: false
    }
  },
  // 表示不同系列的列表
  series:[]
})

function initData (xData, yData, yData2) {
  // 设置顶部和底部的值
  let symbolData = [], newShadowHight = []
  for (let i = 0; i < yData.length; i++) {
    symbolData.push(0)
    newShadowHight.push(yData[i]+yData2[i])
  }
  option.xAxis.data = xData
  option.series = [
    // 底部
    {
      z: 2,
      type: 'pictorialBar',
      symbol: 'diamond',
      symbolOffset: ['0%', '50%'],
      symbolSize: [20, 12],
      tooltip:{
        show: false
      },
      itemStyle:{
        color: new echarts.graphic.LinearGradient(0,0,0,1, [{offset:0, color: '#1f7eff'},{offset:1, color: '#64adff'}])
      },
      data: symbolData, // [1,1,1,1,1]
    },
    // 内容区域
    {
      z: 1,
      type: 'bar',
      name : 'name',
      barGap:'-100%',
      show: true,
      tooltip:{
        show: true,
        formatter: function (param) {
          let res = `<div>${param.name}</div><div>数据一&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${yData[param.dataIndex]}</div>`
          res += `<div>数据二&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${yData2[param.dataIndex]}</div>`
          return res
        }
      },
      barWidth: 20,
      data: yData
    },
    // 内容的顶部
    {
      z: 3,
      type: 'pictorialBar',
      symbol: 'diamond',
      symbolPosition: 'end',
      symbolOffset: ['0%', '-50%'],
      symbolSize: [20, 12],
      tooltip:{
        show: false
      },
      itemStyle:{
        color: new echarts.graphic.LinearGradient(0,0,0,1, [{offset:0, color: '#1f7eff'},{offset:1, color: '#64adff'}])
      },
      data: yData,
    },
    // 阴影区域
    {
      z: 0,
      type: 'bar',
      barWidth: 20,
      tooltip:{
        show: true,
        formatter: function (param) {
          let res = `<div>${param.name}</div><div>数据一&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${yData[param.dataIndex]}</div>`
          res += `<div>数据二&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${yData2[param.dataIndex]}</div>`
          return res
        }
      },
      data: newShadowHight,  // [400, 400, 400, 400, 400]
      itemStyle:{
        color: new echarts.graphic.LinearGradient(0,0,0,1, [{offset:0, color: '#9cc1ff'},{offset:1, color: '#ecf5ff'}])
      }
    },
    // 阴影的顶部
    {
      z: 3,
      type: 'pictorialBar',
      symbol: 'diamond',
      symbolPosition: 'end',
      symbolOffset: ['0%', '-50%'],
      symbolSize: [20, 12],
      tooltip:{
        show: false
      },
      itemStyle:{
        color: new echarts.graphic.LinearGradient(0,0,0,1, [{offset:0, color: '#1f7eff'},{offset:1, color: '#64adff'}])
      },
      data: newShadowHight,
    }
  ]
}

const initChart = (name:string[],data: number[][]) => {
  barChart.value && echarts.dispose(<HTMLElement>barChart.value)
  const chart = echarts.init(<HTMLElement>barChart.value)
  initData(name,data[0],data[1])
  chart.setOption(option, false)
  window.addEventListener('resize', function () {
    chart.resize()
  })
}
defineExpose({initChart})
</script>

<template>
  <div ref="barChart" class="stack-bar-chart-dom"></div>
</template>

<style scoped lang="scss">
.stack-bar-chart-dom{
  width: 100%;
  height: 100%;
}
</style>