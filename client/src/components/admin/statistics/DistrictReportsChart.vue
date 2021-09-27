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
    await this.$store.dispatch("initDistrictReportsChartData")
    this.chartdata.datasets[0].data = this.$store.getters.getDistrictReportsCharData.data
    this.chartdata.labels = this.$store.getters.getDistrictReportsCharData.labels
    this.chartdata.datasets[0].backgroundColor=this.$store.getters.getDistrictReportsCharData.backgroundColor
    this.renderChart(this.chartdata, this.options)
  },
  watch: {
    async "$route"() {
      await this.$store.dispatch("initDistrictReportsChartData")
      this.chartdata.datasets[0].data = this.$store.getters.getDistrictReportsCharData.data
      this.chartdata.labels = this.$store.getters.getDistrictReportsCharData.labels
      this.chartdata.datasets[0].backgroundColor=this.$store.getters.getDistrictReportsCharData.backgroundColor
      this.renderChart(this.chartdata, this.options)
    }
  }
}
</script>