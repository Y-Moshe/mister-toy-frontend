<template>
  <section class="dashboard">
    <el-row>
      <el-col :offset="2" :span="10">
        <awesome-bar-chart :data="barChartData" />
      </el-col>

      <el-col :span="10">
        <awesome-pie-chart :data="pieChartData" />
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { utilService } from '../services/util.service'
import { TAGS } from '../services/toy.service'

import awesomeBarChart from '../cmps/charts/awesome-bar-chart.vue'
import awesomePieChart from '../cmps/charts/awesome-pie-chart.vue'

export default {
  components: {
    awesomeBarChart,
    awesomePieChart
  },
  data() {
    return {
      barChartData: {
        labels: [...TAGS],
        datasets: [
          {
            data: [],
            backgroundColor: []
          }
        ]
      },
      pieChartData: {
        labels: ['In Stock', 'Out of Stock'],
        datasets: [
          {
            data: [],
            backgroundColor: []
          }
        ]
      }
    }
  },
  created() {
    this.$store.dispatch({ type: 'loadToys' })
      .then(() => this.loadDatasets())
  },
  computed: {
    toys() {
      return this.$store.getters.toys
    }
  },
  methods: {
    loadDatasets() {
      this.loadBarDataset()
      this.loadPieDataset()
    },
    loadBarDataset() {
      // Bar chart
      const dataset = this.barChartData.labels.map(lbl => {
        const toysWithCurrLbl = this.toys.filter(toy => toy.tags.includes(lbl))
        const sumOfPricesOfCurrLbl = toysWithCurrLbl
          .reduce((prev, curr) => {
            return curr.price + prev
          }, 0)

        // average price per toy with the current lebel
        const avg = sumOfPricesOfCurrLbl / toysWithCurrLbl.length
        const bgColor = utilService.getRandomColor()
        return { avg, bgColor }
      })

      dataset.forEach(data => {
        this.barChartData.datasets[0].data.push(data.avg)
        this.barChartData.datasets[0].backgroundColor.push(data.bgColor)
      })
    },
    loadPieDataset() {
      const dataset = this.pieChartData.labels.map(lbl => {
        const isInStock = lbl === 'In Stock' ? true : false

        const totalToys = this.toys.length
        const count = this.toys
          .reduce((prev, curr) => {
            if (curr.inStock === isInStock) return prev += 1
            return prev
          }, 0)

        // average price per toy with the current lebel
        const percent = Math.round((count / totalToys) * 100)
        const bgColor = utilService.getRandomColor()
        return { percent, bgColor }
      })

      dataset.forEach(data => {
        this.pieChartData.datasets[0].data.push(data.percent)
        this.pieChartData.datasets[0].backgroundColor.push(data.bgColor)
      })
    }
  }
}
</script>