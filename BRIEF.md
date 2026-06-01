Create a new Vue project called "Retail-dashboard".
Use Vite with TypeScript and Vue Router. Then add Vuetify3 with Material Design Icons, and also install chart.js and vuechartjs for data visualizations. Set everything up and open the project. Keep everything in the workspace route, do not create a subfolder.

# My Dashboard - Project Brief

## What is this?
A single-page analytics dashboard showing monthly business metrics.
Think Shopify admin or a simple Google Analytics view.

## Data
Generate a fake dataset as a JSON file (src/data/metrics.json).
12 months of data (Jan-Dec 2025), each month containing:
- Page Views (number, trending upward with some variation)
- Shares (number, seasonal pattern - higher in spring, smaller than page views, but loose correlation)
- Clicks (number, smaller than page views, but loose correlation)
- Orders (number, correlates loosely with clicks but smaller amounts)

## Layout (Vuetify)
- v-app-bar at the top with the dashboard title and a month picker
- The month picker should default to showing ALL months
- When a specific month is selected, all cards and charts filter to that month. When "ALL" is selected, show the full year.
- Below the app bar: a row of 4 summary cards (v-card) showing the key metrics - revenue, visitors, conversions, orders
- Below the cards: a row of 2 charts
  - Left: Bar chart showing monthly clicks
  - Right: Line chart showing page views
- Below that: one full-width area chart showing orders
- Use v-container, v-row, v-col for responsive grid layout

## Interactions
- Month picker in the app bar filters EVERYTHING - summary cards show that month's numbers, charts highlight or filter to that month
- When "ALL" is selected, summary cards show yearly totals/averages and charts show all 12 months
- Cards should show a small up/down arrow or color indicating change from previous month
- Place this above the cards, next to the title of the dashboard

## Style
- Light theme by default (Vuetify light theme)
- Clean, minimal, lots of whitespace
- Charts should use a cohesive color palette - not rainbow
- Mobile responsive - cards stack on small screens
- Google font: Raleway

## Tech
- Vue 3 + TypeScript + Vuetify 3
- Chart.js via vue-chartjs for all charts
- Fake data from a local JSON file (No API calls)
- Single page - no routing needed for this app

