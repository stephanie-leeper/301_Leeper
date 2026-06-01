<template>
  <div class="chart-container">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import type { MonthData } from '../types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps<{
  data: MonthData[]
  highlightMonth: string | null
}>()

const PALETTE_PRIMARY = '#5C6BC0'
const PALETTE_HIGHLIGHT = '#3949AB'
const PALETTE_DIM = '#C5CAE9'

const chartData = computed(() => ({
  labels: props.data.map(d => d.month),
  datasets: [
    {
      label: 'Clicks',
      data: props.data.map(d => d.clicks),
      backgroundColor: props.data.map(d => {
        if (!props.highlightMonth || props.highlightMonth === 'ALL') return PALETTE_PRIMARY
        return d.month === props.highlightMonth ? PALETTE_HIGHLIGHT : PALETTE_DIM
      }),
      borderRadius: 6,
      borderSkipped: false,
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
        label: (ctx: any) => ` ${ctx.parsed.y.toLocaleString()} clicks`,
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
