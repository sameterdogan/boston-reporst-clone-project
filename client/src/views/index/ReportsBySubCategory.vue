<template>
  <v-container>
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
        <h2>Talimatlar</h2>
        <p class="my-2">
          Bildirmek istediğiniz sorunu en iyi açıklayan listeden bir hizmet seçin.
        </p>
        <p class="my-2">
          BOS:311, mobil kullanıcıları şehrin gözü ve kulağı haline getirerek
          vatandaşlarla gerçek zamanlı işbirliğini mümkün kılıyor. Vatandaşlar, cep telefonlarını kullanarak şehrin herhangi
          bir yerinden çukurları, duvar yazılarını ve diğer sorunları bildiriyor.          </p>
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
export default {
  name: "ReportsBySubCategory",
  components: {ReportBySubCategoryList, PaginationBar, SearchBar,HomeCategoryList}
}
</script>

<style scoped>

</style>