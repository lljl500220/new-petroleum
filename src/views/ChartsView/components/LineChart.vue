<template>
    <div ref="lineChart" class="line-chart-dom"></div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import * as echarts from 'echarts';

const lineChart = ref<HTMLElement>()

const option = reactive({
    tooltip: {
        trigger: 'axis',
    },
    legend: {
        data: ['交易金额', '加油量'],
        icon: 'circle',
        itemHeight: 10,
        textStyle: {
            color: 'rgb(55, 162, 255)',
            fontSize: "1rem",
            padding: [0, 0, 0, -8]
        },
    },
    grid: {
        bottom: 30,
        left: 50,
        right: 50
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLabel: {
            color: 'rgb(55, 162, 255)',
        },
    },
    yAxis: [
        {
            type: "value",
            name: '万元',
            axisLine: {
                // 轴线
                show: true,
                lineStyle: {
                    type: "line",
                },
            },
            axisLabel: {
                color: 'rgb(55, 162, 255)',
                fontSize: '10'
            },
            nameTextStyle: {
                color: 'rgb(55, 162, 255)',
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: "#1A2C6B",
                    type: "dashed",
                },
            },
        },
        {
            type: "value",
            name: '万升',
            axisLine: {
                // 轴线
                show: true,
                lineStyle: {
                    type: "line",
                },
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: "#1A2C6B",
                    type: "dashed",
                },
            },
            axisLabel: {
                color: 'rgb(55, 162, 255)',
            },
            nameTextStyle: {
                color: 'rgb(55, 162, 255)',
            },
        },
    ],
    series: [
        {
            data: [],
            type: 'line',
            name: '交易金额',
            yAxisIndex: 0,
            itemStyle: {
                color: 'rgb(128, 255, 165)'
            },
            areaStyle: {
                opacity: 0.4,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(128, 255, 165,0.1)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(1, 191, 236,0.4)'
                    }
                ])
            },
            smooth: true
        },
        {
            data: [],
            name: '加油量',
            type: 'line',
            yAxisIndex: 1,
            itemStyle: {
                color: 'rgb(55, 162, 255)'
            },
            areaStyle: {
                opacity: 0.5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(55, 162, 255,0.1)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(116, 21, 219,0.6)'
                    }
                ])
            },
            smooth: true
        }
    ]
})

const dataObj = ref<any>()
const xDataObj = ref<any>()
const initChart = (data: number[][], xData: string[]) => {
    dataObj.value = data
    xDataObj.value = xData
    echarts.dispose(lineChart.value)
    const chart = echarts.init(lineChart.value)
    option.xAxis.data = xData
    option.series[0].data = data[0]
    option.series[1].data = data[1]
    chart.setOption(option, false)
    window.addEventListener('resize', function () {
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

.line-chart-dom {
  position: absolute;
  top: px2rem(50);
  width: px2rem(570);
  height: px2rem(250);
}
</style>
