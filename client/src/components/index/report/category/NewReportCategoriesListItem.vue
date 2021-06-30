<template>
<ul style="list-style-type: none">
  <li v-for="subCategory in subCategories" :key="subCategory._id" >
    <sub-category-button :subCategory="subCategory  "/>

  </li>
</ul>
</template>

<script>


import SubCategoryButton from "@/components/index/report/category/SubCategoryButton";
export default {
  name: "NewReportCategoriesListItem",
  components: {SubCategoryButton},
  props:["subCategories"],
}
</script>

<style scoped>
.category-list-item{
  text-decoration-color: transparent  ;
}
.category-list-item:hover{
  text-decoration-color: #0d6efd;
}
</style>