import type { MonthData } from '../types'
import rawData from '../data/metrics.json'

const allData: MonthData[] = rawData as MonthData[]

function getConversionRate(data: Pick<MonthData, 'clicks' | 'orders'>) {
  if (data.clicks === 0) return 0
  return (data.orders / data.clicks) * 100
}

export function useMetrics() {
  function getFiltered(selectedMonth: string | null): MonthData[] {
    if (!selectedMonth || selectedMonth === 'ALL') return allData
    return allData.filter(d => d.month === selectedMonth)
  }

  function getSummary(selectedMonth: string | null) {
    const data = getFiltered(selectedMonth)
    if (selectedMonth && selectedMonth !== 'ALL') {
      const d = data[0]
      const prevIndex = allData.findIndex(m => m.month === selectedMonth) - 1
      const prev = prevIndex >= 0 ? allData[prevIndex] : null
      return {
        revenue: { value: d.revenue, prev: prev?.revenue ?? null },
        visitors: { value: d.pageViews, prev: prev?.pageViews ?? null },
        conversions: {
          value: getConversionRate(d),
          prev: prev ? getConversionRate(prev) : null,
        },
        orders: { value: d.orders, prev: prev?.orders ?? null },
      }
    }
    // ALL: totals for revenue/orders, average for visitors, overall conversion rate
    const totalRevenue = allData.reduce((s, d) => s + d.revenue, 0)
    const totalOrders = allData.reduce((s, d) => s + d.orders, 0)
    const avgVisitors = Math.round(allData.reduce((s, d) => s + d.pageViews, 0) / allData.length)
    const totalClicks = allData.reduce((s, d) => s + d.clicks, 0)
    return {
      revenue: { value: totalRevenue, prev: null },
      visitors: { value: avgVisitors, prev: null },
      conversions: { value: getConversionRate({ clicks: totalClicks, orders: totalOrders }), prev: null },
      orders: { value: totalOrders, prev: null },
    }
  }

  return { allData, getFiltered, getSummary }
}
