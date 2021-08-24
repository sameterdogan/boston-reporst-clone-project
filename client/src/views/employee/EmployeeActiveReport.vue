<template>
 <employee-side-bar>
   <active-employee-reports-table/>
 </employee-side-bar>

</template>

<script>
import EmployeeSideBar from "@/components/employee/bar/EmployeeSideBar";
import ActiveEmployeeReportsTable from "@/components/employee/reprot/EmployeeActiveReportsTable";
export default {
  name: "Employee",
  components: {ActiveEmployeeReportsTable, EmployeeSideBar}
}
</script>

<style scoped>

</style>