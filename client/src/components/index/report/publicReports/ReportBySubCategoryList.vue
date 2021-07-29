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
    let q,s,p,l
    q=this.$route.query.q || ""
    s=this.$route.query.s || ""
    p=this.$route.query.p || 1
    l=this.$route.query.l || 3
    this.$store.dispatch("initReportBySubCategoryId",{subCategoryId:this.$route.params.subCategoryId,q,s,p,l})
  },
  computed:{
    ...mapGetters({reportsBySubCategory:"getReportsBySubCategory"})
  },
  watch:{
    $route(to){
      let q,s,p,l
      q=to.query.q || ""
      s=to.query.s || ""
      p=to.query.p || 1
      l=to.query.l || 3
      this.$store.dispatch("initReportBySubCategoryId",{subCategoryId:this.$route.params.subCategoryId,q,s,p,l})
    }
  }

}
</script>

<style scoped>

</style>