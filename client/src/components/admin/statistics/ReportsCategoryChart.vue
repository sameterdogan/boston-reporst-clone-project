<script>
import {Pie} from 'vue-chartjs'


export default {
  extends: Pie,
  data: () => ({
    chartdata: {
      labels: [],
      datasets: [
        {
          backgroundColor: '',
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
    await this.$store.dispatch("initCategoryReportsChartData")
    this.chartdata.datasets[0].data = this.$store.getters.getCategoryReportsCharData.data
    this.chartdata.labels = this.$store.getters.getCategoryReportsCharData.labels
    this.chartdata.datasets[0].backgroundColor=this.$store.getters.getCategoryReportsCharData.backgroundColor
    this.renderChart(this.chartdata, this.options)
  },
  watch: {
    async "$route"() {
      await this.$store.dispatch("initCategoryReportsChartData")
      this.chartdata.datasets[0].data = this.$store.getters.getCategoryReportsCharData.data
      this.chartdata.labels = this.$store.getters.getCategoryReportsCharData.labels
      this.chartdata.datasets[0].backgroundColor=this.$store.getters.getCategoryReportsCharData.backgroundColor
      this.renderChart(this.chartdata, this.options)
    }
  }
}
</script>