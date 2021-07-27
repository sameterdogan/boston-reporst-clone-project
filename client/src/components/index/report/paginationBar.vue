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
      this.$store.commit("PUBIC_REPORTS_CHANGE_PAGINATION",page)
      if(this.$route.name==="reports-by-sub-category"){
       this.$store.dispatch("initReportBySubCategoryId",this.$route.params.subCategoryId)
      }else{
        this.$store.dispatch("initPublicReports")
      }

    }
  },

}
</script>

<style scoped>

</style>