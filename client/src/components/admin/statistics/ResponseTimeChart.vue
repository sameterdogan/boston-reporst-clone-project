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
    await this.$store.dispatch("initResponseTimeReportsChartData")
    console.log(this.$store.getters.getResponseTimeChartData.data)
    this.chartdata.datasets[0].data = this.$store.getters.getResponseTimeChartData.data
    this.chartdata.labels = this.$store.getters.getResponseTimeChartData.labels
    this.chartdata.datasets[0].backgroundColor=this.$store.getters.getResponseTimeChartData.backgroundColor
    this.renderChart(this.chartdata, this.options)
  },
  watch: {
    async "$route"() {
      await this.$store.dispatch("initResponseTimeReportsChartData")
      this.chartdata.datasets[0].data = this.$store.getters.getResponseTimeChartData.data
      this.chartdata.labels = this.$store.getters.getResponseTimeChartData.labels
      this.chartdata.datasets[0].backgroundColor=this.$store.getters.getResponseTimeChartData.backgroundColor
      this.renderChart(this.chartdata, this.options)
    }
  }
}
</script>