<template>
  <div>
    <div v-if="reportsBySubCategory.length>0">
      <public-report-list-item v-for="publicReport in reportsBySubCategory" :key="publicReport._id" :publicReport="publicReport"/>
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
  name: "ReportBySubCategoryList",
  components: {PublicReportListItem},
  created() {
    this.$store.dispatch("initReportBySubCategoryId",this.$route.params.subCategoryId)
  },
  computed:{
    ...mapGetters({reportsBySubCategory:"getReportsBySubCategory"})
  },
  watch:{
    $route(){
      this.$store.dispatch("initReportBySubCategoryId",this.$route.params.subCategoryId)
    }
  }

}
</script>

<style scoped>

</style>