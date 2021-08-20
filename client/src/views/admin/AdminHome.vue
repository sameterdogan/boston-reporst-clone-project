<template>
  <div>
   <admin-side-bar>
     <user-table/>
   </admin-side-bar>

  </div>

</template>

<script>
import AdminSideBar from "@/components/admin/bar/AdminSideBar";
import UserTable from "@/components/admin/user/AdminTable";
export default {
  name: "Admin",
  components: {UserTable, AdminSideBar},
  created() {

  }
}
</script>

<style scoped>

</style>