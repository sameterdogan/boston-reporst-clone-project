<template>
  <admin-side-bar>
    <employees-by-category/>
  </admin-side-bar>

</template>

<script>
import EmployeesByCategory from "@/components/superAdmin/category/EmployeesByCategory";
import AdminSideBar from "@/components/admin/bar/AdminSideBar";
export default {
  name: "CategoryByEmployees",
  components: {EmployeesByCategory,AdminSideBar}
}
</script>

<style scoped>

</style>