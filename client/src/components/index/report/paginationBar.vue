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
        {{paginationCardInfo}}
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "paginationBar",
   computed:{
    ...mapGetters({paginationCardInfo:"getPublicReportsPaginationCardInfo"})
   },
  data(){
    return{
      page:1
    }
  },
  methods:{
    next(page){
      console.log(page)
      this.$store.commit("PUBIC_REPORTS_CHANGE_PAGINATION",page)
      this.$store.dispatch("initPublicReports")
    }
  }

}
</script>

<style scoped>

</style>