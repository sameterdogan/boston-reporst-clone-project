<template>
  <admin-side-bar>
    <category-table/>
  </admin-side-bar>
</template>

<script>
import AdminSideBar from "@/components/admin/bar/AdminSideBar";
import CategoryTable from "@/components/admin/category/CategoryTable";
export default {
  name: "adminCategory",
  components: {CategoryTable, AdminSideBar}
}
</script>

<style scoped>

</style>