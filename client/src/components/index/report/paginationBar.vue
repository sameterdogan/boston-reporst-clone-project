<template>
  <v-row justify="center">
    <v-col cols="8">
      <v-container class="max-width">
        <v-pagination
            v-model="page"
            class="my-4"
            :length="paginationCardInfo.totalPage"
            @input="next"
        ></v-pagination>

      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "paginationBar",

   computed:{
     ...mapGetters({paginationCardInfo:"getPublicReportsPaginationCardInfo"}),
     ...mapGetters({page:"getActivePage"})
   },
  methods:{
    next(page){
      let q,s,p,l
      q=this.$route.query.q || ""
      s=this.$route.query.s || ""
      p=page
      l=this.$route.query.l || 3


      this.$store.commit("PUBIC_REPORTS_CHANGE_PAGINATION",page)
      if(this.$route.name==="reports-by-sub-category"){
        this.$router.push({name:"reports-by-sub-category",params:{subCategoryId:this.$route.params.subCategoryId},query:{q,s,p,l}})

/*        this.$store.dispatch("initReportBySubCategoryId",this.$route.params.subCategoryId)*/
      }else{
        this.$router.push({path:"/",query:{q,s,p,l}})
     /*   this.$store.dispatch("initPublicReports",{q,s,p,l})*/
      }

    }
  },

}
</script>

<style scoped>

</style>