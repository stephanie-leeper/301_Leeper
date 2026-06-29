<template>
  <v-card rounded="lg" elevation="0" class="metric-card pa-5" border>
    <div class="d-flex align-center justify-space-between mb-2">
      <span class="text-caption text-medium-emphasis text-uppercase font-weight-semibold letter-spacing">
        {{ label }}
      </span>
      <v-icon :color="iconColor" size="20">{{ icon }}</v-icon>
    </div>

    <div class="text-h5 font-weight-bold text-on-surface mt-1">
      {{ formattedValue }}
    </div>

    <div v-if="prev !== null" class="d-flex align-center mt-2 gap-1">
      <v-icon :color="changeColor" size="16">{{ changeIcon }}</v-icon>
      <span class="text-caption" :style="{ color: changeColor }">
        {{ changePercent }}% vs prev month
      </span>
    </div>
    <div v-else class="mt-2">
      <span class="text-caption text-medium-emphasis">{{ subtitle }}</span>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
  value: number
  prev: number | null
  format: 'currency' | 'number' | 'percent'
  icon: string
  iconColor?: string
  subtitle?: string
}>()

const formattedValue = computed(() => {
  if (props.format === 'currency') {
    return '$' + props.value.toLocaleString('en-US')
  }
  if (props.format === 'percent') {
    return props.value.toFixed(1) + '%'
  }
  return props.value.toLocaleString('en-US')
})

const change = computed(() => {
  if (props.prev === null || props.prev === 0) return null
  return ((props.value - props.prev) / props.prev) * 100
})

const changePercent = computed(() => {
  if (change.value === null) return ''
  return (change.value >= 0 ? '+' : '') + change.value.toFixed(1)
})

const changeColor = computed(() => {
  if (change.value === null) return 'grey'
  return change.value >= 0 ? '#2e7d32' : '#c62828'
})

const changeIcon = computed(() => {
  if (change.value === null) return 'mdi-minus'
  return change.value >= 0 ? 'mdi-trending-up' : 'mdi-trending-down'
})
</script>

<style scoped>
.metric-card {
  background: #ffffff;
  transition: box-shadow 0.2s ease;
}
.metric-card:hover {
  box-shadow: 0 4px 24px rgba(0,0,0,0.08) !important;
}
.letter-spacing {
  letter-spacing: 0.08em;
}
</style>
