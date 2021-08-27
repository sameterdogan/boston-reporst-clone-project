<template>
  <v-container>
    <v-row no-gutters>
      <v-col
          cols="12"
          sm="8"
          class="report-detail-wrapper grey lighten-5 my-16"
      >
        <v-alert
            color="blue"
            class="text-center"
            text
        >
          <p class="text-muted m-0">
              <span v-if="report.status===0" class=" text-dark badge mx-2">
                              YÖNETİCİ TARAFINDAN ONAYLANMAYI BEKLİYOR
                    </span>
            <span v-else-if="report.status===1" class="report-status-open badge mx-2">
                              AÇILDI
                    </span>
            <span v-else-if="report.status===2" class="report-status-close badge mx-2">
                              KAPANDI
                    </span>

            <small v-if="report.status===1" class="timesTap"> {{reportDate(report.openingDate)}} </small>
            <small v-if="report.status===2" class="timesTap">{{reportDate(report.closingDate)}} </small>

          </p>


        </v-alert>
<!--                     :src="`http://localhost:3000/assets/image/${image.image}`"-->
        <v-card class="report-detail-image-card" v-for="image in report.images" :key="image._id">
          <v-img
                :src="`https://098.diciwall.com/api/assets/image/${image.image}`"
                 class="white--text img-fluid align-end my-4"
                 gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.3)"
                 max-height="700px"
          >
            <v-card-title>
              <p class="mx-auto">
              {{reportDateLL(report.createdAt)}}Gönderildi
              </p>
            </v-card-title>
          </v-img>
        </v-card>

        <v-alert class="report-detail-description"
            border="left"
            colored-border
            color="#eee"
            elevation="2"
        >
          <p style="    word-break: break-word;">
             {{report.description}}
          </p>
        </v-alert>

        <v-row  >
          <v-col v-if="report.response && report.response.description">
            <v-card  class="report-detail-image-card" v-for="image in report.response.images" :key="image._id">
              <v-img
                  :src="`https://098.diciwall.com/api/assets/image/${image.image}`"
                  class="white--text img-fluid align-end my-4"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.3)"
                  max-height="700px"
              >
                <v-card-title>
                  <p class="mx-auto">
                    {{reportDateLL(report.closingDate)}}     Gönderildi
                  </p>
                </v-card-title>
              </v-img>
            </v-card>
            <v-alert  class="report-detail-description"
                     border="left"
                      type="success"
                     colored-border

                     elevation="2"
            >
              <p style="   word-break: break-word;">
                {{report.response.description}}
              </p>
            </v-alert>
          </v-col>
        </v-row>




        <v-tabs
            v-model="tab"
            background-color="transparent"
            color="basil"
            grow
        >
          <v-tab>
            konum
          </v-tab>
          <v-tab>
            Notlar
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card
                color="basil"
                flat
            >
              <div style="width: 100%">
                <iframe
                    width="100%"
                    height="170"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    :src="`https://maps.google.com/maps?q=${report.location.lat},${report.location.lng}&hl=es&z=14&amp;output=embed&hl=tr`"
                >
                </iframe>
              </div>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card
                color="basil"
                flat

            >

              <v-simple-table>
                <template v-slot:default>
                  <thead>
                  <tr>
                    <th class="text-left">
                      Oluşturulma Tarihi
                    </th>
                    <th class="text-left">
                     Açıklama
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr
                      v-for="note in report.notes"
                      :key="note"
                  >
                    <td>{{reportNotesDate(note.createdAt)  }}</td>
                    <td>{{ note.description }}</td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </v-tab-item>
        </v-tabs-items>


        <span class="report-detail-location " style="font-weight: 900">Adres:</span>  <span>{{report.location.address}}</span>
      </v-col>

    </v-row>

  </v-container>
</template>

<script>
import {mapGetters} from "vuex";
import moment from "moment";

export default {
  name: "reportDetail",
  data(){
    return{
    tab:null
    }
  },
  created() {
    document.title=this.$route.meta.title
    this.$store.dispatch("initReport", this.$route.params.reportId)
  },
  computed: {
    ...mapGetters({report: "getReport"})
  },
  methods: {
    reportDate(date) {
      console.log()
      return moment(date).locale("tr").fromNow()
    },
    reportDateLL(date){
     return  moment(date).locale("tr").format('ll');
    },
    reportNotesDate(date){
      return moment(date).locale("tr").format("LLL")
    }
  }
}
</script>

<style scoped>
.report-status-open {
  background-color: #00A000;
}

.report-status-close {
  background-color: #0080FF;
}
.report-detail-wrapper{
  padding: 3rem !important;
}
@media screen and (max-width: 426px) {
  .report-detail-wrapper{
    padding: 1rem !important;
  }

}


</style>