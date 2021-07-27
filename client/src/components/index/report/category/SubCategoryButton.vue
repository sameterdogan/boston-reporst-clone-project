<template>
  <a @click="selectedNewReportCategory" class="category-list-item" href=""> {{subCategory.subCategory}}</a>
</template>

<script>
export default {
  name: "SubCategoryButton",
  props:["subCategory"],
  methods:{
    selectedNewReportCategory(e){
      e.preventDefault()
      this.$router.push({ name: 'new-report',params:{categoryId:this.subCategory.category,subCategoryId:this.subCategory._id} })
      this.$store.dispatch("selectCategory",this.subCategory)
    }
  }
}
</script>

<style scoped>
.category-list-item{
  color: #0099B9;
  text-decoration-color: transparent  ;
}
.category-list-item:hover{
  text-decoration-color: #0099B9;
}
</style>