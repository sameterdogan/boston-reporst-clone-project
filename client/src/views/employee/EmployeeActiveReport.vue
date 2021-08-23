<template>
 <employee-side-bar>
   <active-report-table/>
 </employee-side-bar>

</template>

<script>
import EmployeeSideBar from "@/components/employee/bar/EmployeeSideBar";
import ActiveReportTable from "@/components/admin/report/ActiveReportTable";
export default {
  name: "Employee",
  components: {ActiveReportTable, EmployeeSideBar}
}
</script>

<style scoped>

</style>