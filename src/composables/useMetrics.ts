import type { MonthData } from '../types'
import rawData from '../data/metrics.json'

const allData: MonthData[] = rawData as MonthData[]

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
        pageViews: { value: d.pageViews, prev: prev?.pageViews ?? null },
        clicks: { value: d.clicks, prev: prev?.clicks ?? null },
        orders: { value: d.orders, prev: prev?.orders ?? null },
      }
    }
    // ALL: totals for revenue/orders, average for pageViews/clicks
    const totalRevenue = allData.reduce((s, d) => s + d.revenue, 0)
    const totalOrders = allData.reduce((s, d) => s + d.orders, 0)
    const avgPageViews = Math.round(allData.reduce((s, d) => s + d.pageViews, 0) / allData.length)
    const avgClicks = Math.round(allData.reduce((s, d) => s + d.clicks, 0) / allData.length)
    return {
      revenue: { value: totalRevenue, prev: null },
      pageViews: { value: avgPageViews, prev: null },
      clicks: { value: avgClicks, prev: null },
      orders: { value: totalOrders, prev: null },
    }
  }

  return { allData, getFiltered, getSummary }
}
