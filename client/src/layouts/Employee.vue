<template>
  <div>

    <employee-nav-bar/>
    <main class="main" style="background-color: #EBEBEB">
      <slot/>
    </main>
  </div>
</template>

<script>
import EmployeeNavBar from "@/components/employee/bar/EmployeeNavBar";
export default {
  name: "Employee",
  components: {EmployeeNavBar}
}
</script>

<style scoped>

</style>