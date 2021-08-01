<template>
  <div>
    <li v-for="subCategory in subCategories" :key="subCategory._id" >
      <home-sub-category-list-item-button :subCategory="subCategory"/>
    </li>
  </div>


</template>

<script>

import HomeSubCategoryListItemButton from "@/components/index/category/HomeSubCategoryListItemButton";

export default {
  name: "HomeSubCategoryListItem",
  components: {HomeSubCategoryListItemButton},
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