<template>
  <div>
    <main class="main" style="background-color: #EBEBEB">
      <navbar/>
      <slot/>
    </main>
  </div>
</template>

<script>
import Navbar from "@/components/index/bar/Navbar";
export default {
  name: "Default",
  components: {Navbar}
}
</script>

<style scoped>

</style>