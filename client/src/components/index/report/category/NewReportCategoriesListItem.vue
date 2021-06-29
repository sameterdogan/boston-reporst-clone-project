<template>
<ul>
  <li v-for="subCategory in subCategories" :key="subCategory._id" >
    <button class="btn "> {{subCategory.subCategory}}</button>
  </li>
</ul>
</template>

<script>


export default {
  name: "NewReportCategoriesListItem",
  props:["subCategories"],
}
</script>

<style scoped>

</style>