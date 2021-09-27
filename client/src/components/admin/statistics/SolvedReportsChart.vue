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
    await this.$store.dispatch("initSolvedReportsChartData")
    this.chartdata.datasets[0].data = this.$store.getters.getSolvedReportsCharData.data
    this.chartdata.labels = this.$store.getters.getSolvedReportsCharData.labels
    this.chartdata.datasets[0].backgroundColor=this.$store.getters.getSolvedReportsCharData.backgroundColor
    this.renderChart(this.chartdata, this.options)
  },
  watch: {
    async "$route"() {
      await this.$store.dispatch("initSolvedReportsChartData")
      this.chartdata.datasets[0].data = this.$store.getters.getSolvedReportsCharData.data
      this.chartdata.labels = this.$store.getters.getSolvedReportsCharData.labels
      this.chartdata.datasets[0].backgroundColor=this.$store.getters.getSolvedReportsCharData.backgroundColor
      this.renderChart(this.chartdata, this.options)
    }
  }
}
</script>