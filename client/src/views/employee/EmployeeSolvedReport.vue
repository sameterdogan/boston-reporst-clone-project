<template>
  <employee-side-bar>
    <employee-solved-reports/>
  </employee-side-bar>
</template>

<script>
import EmployeeSideBar from "@/components/employee/bar/EmployeeSideBar";
import EmployeeSolvedReports from "@/components/employee/reprot/EmployeeSolvedReportsTable";
export default {
  name: "EmployeeSolvedReport",
  components: {EmployeeSolvedReports, EmployeeSideBar}
}
</script>

<style scoped>

</style>