<template>
 <div>
   <a @click="resetActivePage" class="category-list-item"> {{subCategory.subCategory}}</a>
   <span class="muted">   ( {{count}} )</span>

 </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeSubCategoryListItemButton",
  props: ["subCategory"],
  data(){
    return{
      count:0
    }
  },
  created() {
    axios.get(`/reports/counts?q=${this.$route.query.q||""}&s=${this.$route.query.s||0}&c=${this.subCategory._id}`)
    .then(res=>{
      this.count=res.data.count
    }).catch(err=>{
      console.log(err.response)
    })
  },
  methods: {
    resetActivePage() {
      this.$store.commit("RESET_PUBLIC_REPORT_PAGINATION_CARD_INFO_ACTIVE_PAGE")
      let q, s, p, l
      q = this.$route.query.q || ""
      s = this.$route.query.s || 0
      p = 1
      l = 3
      this.$router.push({
        name: 'reports-by-sub-category',
        params: {subCategoryId: this.subCategory._id},
        query: {q, s, p, l}
      })
    }
  },
  watch:{
    $route (to){
      axios.get(`/reports/counts?q=${to.query.q||""}&s=${to.query.s||0}&c=${this.subCategory._id}`)
          .then(res=>{
            this.count=res.data.count
          }).catch(err=>{
        console.log(err.response)
      })
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