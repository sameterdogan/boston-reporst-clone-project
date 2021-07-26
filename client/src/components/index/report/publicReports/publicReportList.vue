<template>
  <div>
    <div v-if="publicReports.length>0">
      <public-report-list-item  v-for="publicReport in publicReports" :key="publicReport._id" :publicReport="publicReport"/>
    </div>

    <v-row v-else>
      <v-card class="my-5">
        Şikayet Bulunamadı
      </v-card>
    </v-row>
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