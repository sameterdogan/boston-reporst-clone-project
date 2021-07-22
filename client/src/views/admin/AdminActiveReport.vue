<template>
  <admin-side-bar>
    <active-report-table/>
  </admin-side-bar>
</template>

<script>
import AdminSideBar from "@/components/admin/bar/AdminSideBar";
import ActiveReportTable from "@/components/admin/report/ActiveReportTable";
export default {
  name: "AdminReport",
  components: {ActiveReportTable, AdminSideBar}
}
</script>

<style scoped>

</style>