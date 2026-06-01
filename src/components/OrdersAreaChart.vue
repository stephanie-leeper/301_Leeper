<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import type { MonthData } from '../types'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const props = defineProps<{
  data: MonthData[]
  highlightMonth: string | null
}>()

const AREA_COLOR = 'rgba(102,187,106,0.18)'
const LINE_COLOR = '#43A047'

const chartData = computed(() => ({
  labels: props.data.map(d => d.month),
  datasets: [
    {
      label: 'Orders',
      data: props.data.map(d => d.orders),
      borderColor: LINE_COLOR,
      backgroundColor: AREA_COLOR,
      borderWidth: 2.5,
      pointRadius: props.data.map(d =>
        props.highlightMonth && props.highlightMonth !== 'ALL' && d.month === props.highlightMonth ? 9 : 4
      ),
      pointBackgroundColor: props.data.map(d =>
        props.highlightMonth && props.highlightMonth !== 'ALL' && d.month === props.highlightMonth
          ? '#2E7D32'
          : LINE_COLOR
      ),
      tension: 0.4,
      fill: true,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx: any) => ` ${ctx.parsed.y.toLocaleString()} orders`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: { font: { family: 'Raleway', size: 12 } },
    },
    y: {
      grid: { color: '#f0f0f0' },
      border: { display: false, dash: [4, 4] },
      ticks: {
        font: { family: 'Raleway', size: 12 },
        callback: (v: any) => v.toLocaleString(),
      },
    },
  },
}
</script>

<style scoped>
.chart-container {
  height: 260px;
}
</style>
