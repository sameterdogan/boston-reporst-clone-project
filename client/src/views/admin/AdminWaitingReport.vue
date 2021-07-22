<template>
  <admin-side-bar>
    <waiting-report-table/>
  </admin-side-bar>
</template>

<script>
import AdminSideBar from "@/components/admin/bar/AdminSideBar";
import WaitingReportTable from "@/components/admin/report/WaitingReportTable";
export default {
  name: "AdminPrivateReport",
  components: {WaitingReportTable, AdminSideBar}
}
</script>

<style scoped>

</style>