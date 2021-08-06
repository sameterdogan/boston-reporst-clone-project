<template>
  <v-container>
    <div class="px-3 py-3">
      <h4 style="text-transform: capitalize" class="lead"> {{subCategory.subCategory}}  Kategorisine Ait Şikayetler</h4>
    </div>
    <v-row no-gutters>
      <v-col
          cols="12"
          sm="8"
          class="grey lighten-5 p-3"
      >
        <v-row
            style="min-height: 800px"
            class="align-items-start">
          <v-col
              cols="12"
              class="grey lighten-5 py-10">
            <search-bar/>
          </v-col>
          <v-col
              cols="12">
            <report-by-sub-category-list/>
          </v-col>
          <v-col
              cols="12"
          >
            <pagination-bar/>
          </v-col>
        </v-row>

      </v-col>
      <v-col
          cols="12"
          sm="4"
          class="px-5"
      >
        <home-box/>

        <home-category-list/>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import SearchBar from "@/components/index/report/searchBar";
import PaginationBar from "@/components/index/report/paginationBar";
import ReportBySubCategoryList from "@/components/index/report/publicReports/ReportBySubCategoryList";
import HomeCategoryList from "@/components/index/category/HomeSubCategoryList"
import HomeBox from "@/components/index/HomeBox";
import {mapGetters} from "vuex";
export default {
  name: "ReportsBySubCategory",
  components: { HomeBox, ReportBySubCategoryList, PaginationBar, SearchBar,HomeCategoryList},
  created() {
    document.title=this.$route.meta.title
    this.$store.dispatch("initSubCategory",this.$route.params.subCategoryId)
  },
  computed:{
    ...mapGetters({subCategory:"getSubCategory"})
  },
  watch: {
    '$route' (to) {
      this.$store.dispatch("initSubCategory",to.params.subCategoryId)
    }
  },
}
</script>

<style scoped>

</style>