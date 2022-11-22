<template>
  <PieChart :chartData="data" :options="options" />
</template>

<script>
import { PieChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default {
  name: 'awesome-pie-chart',
  props: { data: Object },
  components: { PieChart },
  data() {
    return {
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label({ label, parsed }) {
                return `${label}: ${parsed}%`
              }
            }
          }
        }
      }
    }
  }
}
</script>
