<script>
import {Pie} from 'vue-chartjs'

export default {
  extends: Pie,
  data: () => ({
    chartdata: {
      labels: [],
      datasets: [
        {
          backgroundColor: '#f87979',
          data: []
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  async mounted() {
    await this.$store.dispatch("initSubCategoryReportsChartData")
    this.chartdata.datasets[0].data = this.$store.getters.getSubCategoryReportsCharData.data
    this.chartdata.labels = this.$store.getters.getSubCategoryReportsCharData.labels
    this.chartdata.datasets[0].backgroundColor=this.$store.getters.getSubCategoryReportsCharData.backgroundColor
    this.renderChart(this.chartdata, this.options)
  },
  watch: {
    async "$route"() {
      await this.$store.dispatch("initSubCategoryReportsChartData")
      this.chartdata.datasets[0].data = this.$store.getters.getSubCategoryReportsCharData.data
      this.chartdata.labels = this.$store.getters.getSubCategoryReportsCharData.labels
      this.chartdata.datasets[0].backgroundColor=this.$store.getters.getSubCategoryReportsCharData.backgroundColor
      this.renderChart(this.chartdata, this.options)
    }
  }
}
</script>