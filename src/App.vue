<template>
  <v-app theme="light" style="background: #f7f8fa;">

    <!-- App Bar -->
    <v-app-bar elevation="0" color="white" border="b">
      <v-app-bar-title>
        <span class="text-h6 font-weight-bold" style="letter-spacing: -0.5px;">
          Retail Dashboard
        </span>
        <span class="text-caption text-medium-emphasis ml-2">2025</span>
      </v-app-bar-title>

      <template #append>
        <v-select
          v-model="selectedMonth"
          :items="monthOptions"
          item-title="label"
          item-value="value"
          variant="outlined"
          density="compact"
          hide-details
          style="min-width: 140px; max-width: 160px;"
          class="mr-4"
          rounded="lg"
        />
      </template>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="pa-6">

        <!-- Summary Cards -->
        <v-row class="mb-2">
          <v-col cols="12" sm="6" lg="3">
            <MetricCard
              label="Revenue"
              :value="summary.revenue.value"
              :prev="summary.revenue.prev"
              format="currency"
              icon="mdi-currency-usd"
              icon-color="#5C6BC0"
              :subtitle="isAllMonths ? 'Full year total' : ''"
            />
          </v-col>
          <v-col cols="12" sm="6" lg="3">
            <MetricCard
              label="Page Views"
              :value="summary.pageViews.value"
              :prev="summary.pageViews.prev"
              format="number"
              icon="mdi-eye-outline"
              icon-color="#42A5F5"
              :subtitle="isAllMonths ? 'Monthly average' : ''"
            />
          </v-col>
          <v-col cols="12" sm="6" lg="3">
            <MetricCard
              label="Clicks"
              :value="summary.clicks.value"
              :prev="summary.clicks.prev"
              format="number"
              icon="mdi-cursor-default-click-outline"
              icon-color="#AB47BC"
              :subtitle="isAllMonths ? 'Monthly average' : ''"
            />
          </v-col>
          <v-col cols="12" sm="6" lg="3">
            <MetricCard
              label="Orders"
              :value="summary.orders.value"
              :prev="summary.orders.prev"
              format="number"
              icon="mdi-shopping-outline"
              icon-color="#43A047"
              :subtitle="isAllMonths ? 'Full year total' : ''"
            />
          </v-col>
        </v-row>

        <!-- Charts Row -->
        <v-row class="mb-2">
          <v-col cols="12" md="6">
            <v-card rounded="lg" elevation="0" border class="pa-5" style="background:#fff;">
              <div class="text-subtitle-2 font-weight-semibold text-medium-emphasis text-uppercase mb-4" style="letter-spacing:0.07em;">Monthly Clicks</div>
              <ClicksBarChart :data="chartData" :highlight-month="isAllMonths ? null : selectedMonth" />
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card rounded="lg" elevation="0" border class="pa-5" style="background:#fff;">
              <div class="text-subtitle-2 font-weight-semibold text-medium-emphasis text-uppercase mb-4" style="letter-spacing:0.07em;">Page Views</div>
              <PageViewsLineChart :data="chartData" :highlight-month="isAllMonths ? null : selectedMonth" />
            </v-card>
          </v-col>
        </v-row>

        <!-- Orders Area Chart -->
        <v-row>
          <v-col cols="12">
            <v-card rounded="lg" elevation="0" border class="pa-5" style="background:#fff;">
              <div class="text-subtitle-2 font-weight-semibold text-medium-emphasis text-uppercase mb-4" style="letter-spacing:0.07em;">Orders Over Time</div>
              <OrdersAreaChart :data="chartData" :highlight-month="isAllMonths ? null : selectedMonth" />
            </v-card>
          </v-col>
        </v-row>

      </v-container>
    </v-main>

  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMetrics } from './composables/useMetrics'
import MetricCard from './components/MetricCard.vue'
import ClicksBarChart from './components/ClicksBarChart.vue'
import PageViewsLineChart from './components/PageViewsLineChart.vue'
import OrdersAreaChart from './components/OrdersAreaChart.vue'

const { allData, getSummary } = useMetrics()

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const monthOptions = [
  { label: 'All Months', value: 'ALL' },
  ...MONTHS.map(m => ({ label: m, value: m })),
]

const selectedMonth = ref<string>('ALL')

const isAllMonths = computed(() => selectedMonth.value === 'ALL')

const summary = computed(() => getSummary(selectedMonth.value))

// For charts: show all months always (highlight selected if single month is chosen)
const chartData = computed(() => allData)
</script>
