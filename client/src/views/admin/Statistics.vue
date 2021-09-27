<template>
  <admin-side-bar>
    <div class="">
      <div class="row mt-5">
        <div class="col-4 text-center" >
          <h5>Departmanlara göre şikayet istatistiği</h5>
          <ReportsCategoryChart></ReportsCategoryChart>
        </div>

        <div class="col-4 text-center">
          <h5>Departmanlara göre çözülmüş şikayet istatistiği</h5>
          <solved-reports-chart></solved-reports-chart>
        </div>
        <div class="col-4 text-center">
          <h5>Alt kategorilere göre şikayet istatistiği</h5>
          <reports-sub-category-chart></reports-sub-category-chart>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-4 text-center">
          <h5>İlçelere göre  şikayet istatistiği</h5>
          <district-reports-chart></district-reports-chart>
        </div>
        <div class="col-4 text-center">
          <h5>Cevap verme süresi istatistiği</h5>
         <response-time-chart></response-time-chart>
        </div>

      </div>
    </div>


  </admin-side-bar>

</template>

<script>

import AdminSideBar from "@/components/admin/bar/AdminSideBar";
import ReportsCategoryChart from "@/components/admin/statistics/ReportsCategoryChart";
import ReportsSubCategoryChart from "@/components/admin/statistics/ReportsSubCategoryChart";
import SolvedReportsChart from "@/components/admin/statistics/SolvedReportsChart";
import DistrictReportsChart from "@/components/admin/statistics/DistrictReportsChart";
import ResponseTimeChart from "@/components/admin/statistics/ResponseTimeChart";


export default {
  components: {
    ResponseTimeChart,
    DistrictReportsChart,
    SolvedReportsChart,
    ReportsSubCategoryChart,
    ReportsCategoryChart,
    AdminSideBar
  },
  data () {
    return {}
  },
  created() {},
  computed:{},
  methods: {},



}
</script>

<style>
.small {
  max-width: 600px;
  margin:  150px auto;
}
</style>