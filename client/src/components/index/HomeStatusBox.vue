<template>
<div>
  <ul style="list-style-type: none">
    <li v-if="activeStatus==1 || activeStatus==0">
      <a @click="resetActivePage(1)" class="category-list-item" >
        Açık
      </a>
      <span class="muted">( {{openCount}} )</span>

      <a @click="resetActivePage(0)" v-if="activeStatus==1" class="category-list-item" >İptal</a>
    </li>
    <li  v-if="activeStatus==2 || activeStatus==0">
      <a @click="resetActivePage(2)" class="category-list-item" >
        Kapalı
      </a>
      <span class="muted">( {{closeCount}} )</span>

      <a @click="resetActivePage(0)" class="category-list-item" v-if="activeStatus==2 " >İptal</a>
    </li>
  </ul>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeStatusBox",
  data(){
    return{
      openCount:0,
      closeCount:0,
      activeStatus:0
    }
  },
  created() {
    switch (this.$route.query.s){
      case "1":this.activeStatus=1
            break;
      case "2":this.activeStatus=2
            break;
      default:this.activeStatus=0
    }
    if(this.$route.name=="reports-by-sub-category"){
      axios.get(`/reports/counts?q=${this.$route.query.q||""}&s=${1}&c=${this.$route.params.subCategoryId}`)
          .then(res=>{
            this.openCount=res.data.count
          }).catch(err=>{
        console.log(err.response)
      })
      axios.get(`/reports/counts?q=${this.$route.query.q||""}&s=${2}&c=${this.$route.params.subCategoryId}`)
          .then(res=>{
            this.closeCount=res.data.count
          }).catch(err=>{
        console.log(err.response)
      })

    }
    if(this.$route.name=="home"){
      axios.get(`/reports/counts?q=${this.$route.query.q||""}&s=${1}`)
          .then(res=>{
            this.openCount=res.data.count
            console.log(res)
          }).catch(err=>{
        console.log(err.response)
      })
      axios.get(`/reports/counts?q=${this.$route.query.q||""}&s=${2}`)
          .then(res=>{
            this.closeCount=res.data.count
            console.log(res)
          }).catch(err=>{
        console.log(err.response)
      })
    }
  },
  methods: {
    resetActivePage(status) {
      this.$store.commit("RESET_PUBLIC_REPORT_PAGINATION_CARD_INFO_ACTIVE_PAGE")
      let q, s, p, l,c
      q = this.$route.query.q || ""
      s = status
      p = 1
      l = 10
      this.activeStatus=status
      if(this.$route.name=="reports-by-sub-category"){
        c=this.$route.params.subCategoryId

        this.$router.push({
          name: 'reports-by-sub-category',
          params: {subCategoryId: c},
          query: {q, s, p, l}
        })
      }
      if(this.$route.name=="home"){
        this.$router.push({
          name: 'home',
          query: {q, s, p, l}
        })
      }
    }
  },
  watch:{
    $route (to){

      console.log(to.query.s+"query s yazıdlıı")
      if(to.query.s==1){
        this.activeStatus=1
      }else if(to.query.s==2){
        this.activeStatus=2
      }else{
        this.activeStatus=0
      }

      if(this.$route.name=="reports-by-sub-category"){
        axios.get(`/reports/counts?q=${to.query.q||""}&s=${1}&c=${to.params.subCategoryId}`)
            .then(res=>{
              this.openCount=res.data.count
            }).catch(err=>{
          console.log(err.response)
        })
        axios.get(`/reports/counts?q=${to.query.q||""}&s=${2}&c=${to.params.subCategoryId}`)
            .then(res=>{
              this.closeCount=res.data.count
              console.log(res)
            }).catch(err=>{
          console.log(err.response)
        })
      }
      if(this.$route.name=="home"){
        axios.get(`/reports/counts?q=${to.query.q||""}&s=${1}`)
            .then(res=>{
              this.openCount=res.data.count
            }).catch(err=>{
          console.log(err.response)
        })
        axios.get(`/reports/counts?q=${to.query.q||""}&s=${2}`)
            .then(res=>{
              this.closeCount=res.data.count
            }).catch(err=>{
          console.log(err.response)
        })
      }
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


