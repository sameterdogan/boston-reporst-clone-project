<template>
  <div>
    <admin-navbar/>
    <main class="main">
      <slot/>
    </main>
  </div>
</template>

<script>

import AdminNavbar from "@/components/admin/bar/AdminNavbar";
export default {
  name: "Admin",
  components: {AdminNavbar},
}
</script>

<style scoped>

</style>