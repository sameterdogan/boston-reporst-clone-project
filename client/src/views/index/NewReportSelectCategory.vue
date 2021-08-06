<template>
  <div class="container">
    <div class="px-3 py-2">
      <h4 class="lead">Şikayet Oluştur</h4>
    </div>

    <v-container >
      <v-row no-gutters>
        <v-col
            cols="12"
            sm="8"
            class="grey lighten-5 p-3"
            style="min-height: 500px"
        >
          <h4 class="my-3">Bir Kategori Seçin</h4>
          <NewReportCategoryList/>
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
            098, mobil kullanıcıları şehrin gözü ve kulağı haline getirerek
            vatandaşlarla gerçek zamanlı işbirliğini mümkün kılıyor. Vatandaşlar, cep telefonlarını kullanarak şehrin herhangi
            bir yerinden çukurları, duvar yazılarını ve diğer sorunları bildiriyor.          </p>
        </v-col>
      </v-row>
    </v-container>

  </div>

</template>

<script>
import NewReportCategoryList from "@/components/index/report/category/NewReportCategoryList";
export default {
  name: "NewReportSelectCategory",
  components: {NewReportCategoryList},
  created() {
    document.title=this.$route.meta.title
  }
}
</script>

<style scoped>

</style>