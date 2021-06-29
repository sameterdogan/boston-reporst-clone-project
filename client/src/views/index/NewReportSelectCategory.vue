<template>
  <div class="container">
    <h4 class="my-5">Şikayet Oluştur</h4>
    <NewReportCategoryList/>
  </div>

</template>

<script>
import NewReportCategoryList from "@/components/index/report/category/NewReportCategoryList";
export default {
  name: "NewReportSelectCategory",
  components: {NewReportCategoryList}
}
</script>

<style scoped>

</style>