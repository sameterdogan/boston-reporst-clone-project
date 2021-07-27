<template>
   <v-container>
     <div class="px-3 py-3">
       <h4 class="lead">Şikayetleri Görüntüle</h4>
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
             <public-report-list/>
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


import PublicReportList from "@/components/index/report/publicReports/publicReportList";
import SearchBar from "@/components/index/report/searchBar";
import PaginationBar from "@/components/index/report/paginationBar";
import HomeCategoryList from "@/components/index/category/HomeSubCategoryList";
import HomeBox from "@/components/index/HomeBox";
export default {
  name: "home",
  components: {HomeBox, HomeCategoryList, PaginationBar, SearchBar, PublicReportList},
}
</script>

<style scoped>

</style>