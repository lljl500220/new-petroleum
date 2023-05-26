<template>
  <div class="bus-table">
    <el-table
      class="bus-table-content"
      @mouseenter="cellMouseEnter"
      @mouseleave="cellMouseLeave"
      ref="table"
      :row-class-name="getRowClass"
      :data="businessData"
    >
      <el-table-column prop="region" label="区域" align="center" />
      <el-table-column prop="gas_station_name" label="加油站名称">
      </el-table-column>
      <el-table-column prop="refueling_time" label="加油时间" align="center" />
      <el-table-column prop="station_no" label="油品" align="center" />
      <el-table-column prop="oil_quantity" label="加油量(升)" align="center" />
      <el-table-column
        prop="refueling_amount"
        label="金额(元)"
        align="center"
      />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, Ref, ref } from "vue";

const businessData = ref([
  {
    region: 123,
    gas_station_name: 123,
    refueling_time: 123,
    station_no: 123,
    oil_quantity: 123,
    refueling_amount: 123,
  },
  {
    region: 123,
    gas_station_name: 123,
    refueling_time: 123,
    station_no: 123,
    oil_quantity: 123,
    refueling_amount: 123,
  },
  {
    region: 123,
    gas_station_name: 123,
    refueling_time: 123,
    station_no: 123,
    oil_quantity: 123,
    refueling_amount: 123,
  },
  {
    region: 123,
    gas_station_name: 123,
    refueling_time: 123,
    station_no: 123,
    oil_quantity: 123,
    refueling_amount: 123,
  },
  {
    region: 123,
    gas_station_name: 123,
    refueling_time: 123,
    station_no: 123,
    oil_quantity: 123,
    refueling_amount: 123,
  },
  {
    region: 123,
    gas_station_name: 123,
    refueling_time: 123,
    station_no: 123,
    oil_quantity: 123,
    refueling_amount: 123,
  },
  {
    region: 123,
    gas_station_name: 123,
    refueling_time: 123,
    station_no: 123,
    oil_quantity: 123,
    refueling_amount: 123,
  },
  {
    region: 123,
    gas_station_name: 123,
    refueling_time: 123,
    station_no: 123,
    oil_quantity: 123,
    refueling_amount: 123,
  },
]);

//改变行的样式
const getRowClass = (value: { row: any; rowIndex: number }) => {
  if (value.rowIndex % 2 === 0) return "light-row";
  return "deep-row";
};

const table: Ref<any> = ref(null);
const interNal: Ref<any> = ref(null);
const scrollTo: Ref<any> = ref(null);
const top: Ref<number> = ref(0);

const cellMouseEnter = () => {
  clearInterval(interNal.value);
};

const cellMouseLeave = () => {
  interNal.value = setInterval(() => {
    if (
      top.value +
        table.value.$refs.bodyWrapper.getElementsByClassName(
          "el-scrollbar__wrap"
        )[0].clientHeight >=
      table.value.$refs.bodyWrapper.children[0].children[0].children[0]
        .scrollHeight
    )
      top.value = 0;
    else top.value += 1;
    scrollTo.value(0, top.value);
  }, 50);
};

onMounted(() => {
  scrollTo.value = table.value.scrollTo;
  top.value = 0;
  interNal.value = setInterval(() => {
    if (
      top.value +
        table.value.$refs.bodyWrapper.getElementsByClassName(
          "el-scrollbar__wrap"
        )[0].clientHeight >=
      table.value.$refs.bodyWrapper.getElementsByClassName(
        "el-scrollbar__wrap"
      )[0].scrollHeight
    )
      top.value = 0;
    else top.value += 0.2;
    scrollTo.value(0, top.value);
  }, 10);
});

onBeforeUnmount(() => {
  clearInterval(interNal.value);
});
</script>

<style scoped lang="scss">
@function px2rem($px) {
  $design_font_size: 12;
  @return calc($px/$design_font_size) + rem;
}

.bus-table {
  position: absolute;
  bottom: 2px;
  width: 100%;
  overflow-x: auto;
  .bus-table-content {
    height: px2rem(245);
  }

  :deep(.el-table) {
    color: white;
    --el-table-border: 0px;
    background-color: transparent;

    tr,
    td,
    th {
      background-color: transparent;
      color: white;
    }

    thead {
      background-color: rgba(91,102,227,0.1);
    }

    .el-table__inner-wrapper::before {
      height: 0;
    }

    .light-row {
      background-color: rgba(80, 113, 210, 0.2) !important;
    }

    .deep-row {
    }

    .el-table__body tr:hover > td {
      background-color: #50a0bd !important;
    }
    .el-table__header {
      font-size: px2rem(12);
    }
  }
}
</style>
