<template>
  <div>
    <li v-for="subCategory in subCategories" :key="subCategory._id" >
      <a
          @click="resetActivePage(subCategory._id)"
          class="category-list-item d-inline-block my-1"
      >
       {{subCategory.subCategory}}

      </a>
      <span class="small">  ( 150 )</span>
    </li>
  </div>


</template>

<script>
export default {
  name: "HomeSubCategoryListItem",
  props:["subCategories"],
  methods:{
    resetActivePage(subCategoryId){
      this.$store.commit("RESET_PUBLIC_REPORT_PAGINATION_CARD_INFO_ACTIVE_PAGE")
      this.$store.commit("PUBIC_REPORTS_CHANGE_PAGINATION",1)
      this.$store.commit("PUBLIC_REPORTS_CHANGE_SEARCH_TITLE","")
      this.$router.push({name:'reports-by-sub-category',params:{subCategoryId:subCategoryId}})

      console.log("değştii")
    }
  }
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