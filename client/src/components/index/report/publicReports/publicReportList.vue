<template>
  <div>
    <div v-if="publicReports.length>0">
      <public-report-list-item  v-for="publicReport in publicReports" :key="publicReport._id" :publicReport="publicReport"/>
    </div>
    <div class="text-center" v-else>
        <h3>
          Şikayet Bulunamadı
        </h3>
    </div>
  </div>
</template>

<script>
import PublicReportListItem from "@/components/index/report/publicReports/publicReportListItem";
import {mapGetters} from "vuex";
export default {
  name: "publicReportList",
  components: {PublicReportListItem},
  created() {
    this.$store.dispatch("initPublicReports")
  },
  computed:{
    ...mapGetters({publicReports:"getPublicReports"})
  }


}
</script>

<style scoped>

</style>