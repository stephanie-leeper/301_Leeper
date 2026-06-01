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

const PALETTE_LINE = '#42A5F5'

const chartData = computed(() => ({
  labels: props.data.map(d => d.month),
  datasets: [
    {
      label: 'Page Views',
      data: props.data.map(d => d.pageViews),
      borderColor: PALETTE_LINE,
      backgroundColor: 'rgba(66,165,245,0.08)',
      borderWidth: 2.5,
      pointRadius: props.data.map(d =>
        props.highlightMonth && props.highlightMonth !== 'ALL' && d.month === props.highlightMonth ? 8 : 4
      ),
      pointBackgroundColor: props.data.map(d =>
        props.highlightMonth && props.highlightMonth !== 'ALL' && d.month === props.highlightMonth
          ? '#1565C0'
          : PALETTE_LINE
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
        label: (ctx: any) => ` ${ctx.parsed.y.toLocaleString()} views`,
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
