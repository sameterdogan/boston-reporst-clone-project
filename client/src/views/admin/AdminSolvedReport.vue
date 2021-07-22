<template>
  <admin-side-bar>
    <solved-report-table/>
  </admin-side-bar>
</template>

<script>
import AdminSideBar from "@/components/admin/bar/AdminSideBar";
import SolvedReportTable from "@/components/admin/report/SolvedReportTable";
export default {
  name: "AdminSolvedReport",
  components: {SolvedReportTable, AdminSideBar}
}
</script>

<style scoped>

</style>