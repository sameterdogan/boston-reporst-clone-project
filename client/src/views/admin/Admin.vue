<template>
  <div>
   <admin-side-bar>
     geliyoo
   </admin-side-bar>

  </div>

</template>

<script>
import AdminSideBar from "@/components/admin/bar/AdminSideBar";
import axios from "axios";
export default {
  name: "Admin",
  components: {AdminSideBar},
  created() {
    axios.get("/users/get-admin",{withCredentials:true})
        .then(res=>{
          console.log(res)
        })
        .catch(err=>{
          console.log(err.response)
        })
  }
}
</script>

<style scoped>

</style>