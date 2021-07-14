<template>
  <div>
    <li v-for="subCategory in subCategories" :key="subCategory._id" >
      <a  class="category-list-item d-inline-block my-1" href="">{{subCategory.subCategory}}</a>
    </li>
  </div>


</template>

<script>
export default {
  name: "HomeSubCategoryListItem",
  props:["subCategories"]
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