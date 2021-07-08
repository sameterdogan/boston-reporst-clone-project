<template>


  <v-container >
    <v-row no-gutters>
      <v-col
          cols="12"
          sm="8"
          class="grey lighten-5 p-3"

      >
<!--        <h4 class="my-3">Bir Kategori Seçin</h4>-->
<new-report-form/>
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
      </v-col>
    </v-row>
  </v-container>



</template>

<script>
import newReportForm from "@/components/index/report/NewReportForm"
export default {
  components:{newReportForm},
  data() {
    return {

    }
  },


}
</script>

<style scoped>

</style>