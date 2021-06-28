<template>
  <admin-side-bar>
    <report-table/>
  </admin-side-bar>
</template>

<script>
import AdminSideBar from "@/components/admin/bar/AdminSideBar";
import ReportTable from "@/components/admin/report/ReportTable";
export default {
  name: "AdminReport",
  components: {ReportTable, AdminSideBar}
}
</script>

<style scoped>

</style>