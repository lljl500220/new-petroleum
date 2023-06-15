<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import * as graph from './data/df_dic.json'
import '@/assets/css/chart.css'

const chartDom = ref<HTMLElement>()
const random = () => {
  const num = Math.random()
  return num > 0.5 ? num - 1 : num
}

const getSeries = (): any[] => {
  const res = []
  for (const graphKey in graph) {
    res.push({
      name: graphKey,
      type: 'graph',
      layout: 'force',
      data: graph[graphKey].node,
      links: graph[graphKey].link,
      roam: true,
      label: {
        show: true,
        position: 'right',
        formatter: '{b}'
      },
      lineStyle: {
        color: 'source',
        curveness: random()
      },
      force: {
        repulsion: 100
      }
    })
  }
  return res
}

const option = ref({
  title: {
    text: '相关性分析',
    subtext: 'Default layout',
    top: 'top',
    left: 'center'
  },
  tooltip: {},
  series: getSeries()
})

onMounted(() => {
  const chart = echarts.init(chartDom.value as HTMLElement)
  chart.setOption(option.value)
})
</script>

<template>
  <div class="app-container">
    <div class="chart-container" ref="chartDom" />
  </div>
</template>

<style scoped lang="scss"></style>
