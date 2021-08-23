<template>
  <v-card>
    <v-card-title class="text-h5">Transfer Bilgisi </v-card-title>
    <v-card-text>
      <h4 class="info-bold">Transfer Tarihi:  <span class="info-light">{{formatDate(transfer.createdAt)}}</span></h4>
    </v-card-text>
    <v-card-title class="text-h5">Atanan Personelin Bilgisi </v-card-title>
    <v-card-text>
      <h4 class="info-bold">
        İsim - Soyisim:
        <span class="info-light">{{transfer.employee.name + " " + transfer.employee.surname}} </span>
      </h4>
      <h4 class="info-bold">
        E-posta :
        <span class="info-light">{{transfer.employee.email}} </span>
      </h4>
      <h4 class="info-bold">
        Telefon :
        <span class="info-light">{{transfer.employee.phone}} </span>
      </h4>
    </v-card-text>

    <v-card-title class="text-h5">Şikayet  Bilgisi </v-card-title>
    <v-card-text>
      <h4 class="info-bold">
        Adres:
        <span class="info-light">{{transfer.report.location.address}} </span>
      </h4>
      <h4 class="info-bold">
        Açıklama:
        <span class="info-light">{{transfer.report.description}} </span>
      </h4>

    </v-card-text>


    <v-card-actions>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapGetters} from "vuex"
import moment from "moment";

export default {
  name: "ShowTransfer",
  props:["transferId"],
  created() {
    this.$store.dispatch("initTransfer",this.transferId)
  },
  computed:{
    ...mapGetters({transfer:"getTransfer"})
  },
  methods:{
    formatDate(createdAt) {
      return moment(createdAt).locale("tr").format('LL');
    },
  }
}
</script>

<style scoped>

</style>