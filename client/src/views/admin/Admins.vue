<template>
  <admin-side-bar>
    <user-table/>
  </admin-side-bar>

</template>

<script>

import AdminSideBar from "@/components/admin/bar/AdminSideBar";
import UserTable from "@/components/admin/user/AdminTable";
export default {
  name: "Admins",
  components: {UserTable, AdminSideBar}
}
</script>

<style scoped>

</style>