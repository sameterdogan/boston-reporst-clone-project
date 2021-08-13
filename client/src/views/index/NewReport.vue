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
 <home-box/>
      </v-col>
    </v-row>
  </v-container>



</template>

<script>
import newReportForm from "@/components/index/report/NewReportForm"
import HomeBox from "@/components/index/HomeBox";
export default {
  components:{HomeBox, newReportForm},
  data() {
    return {

    }
  },
  created() {
    document.title=this.$route.meta.title

  }


}
</script>

<style scoped>

</style>