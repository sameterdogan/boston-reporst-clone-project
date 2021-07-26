<template>
  <v-container>
    <v-row no-gutters>
      <v-col
          cols="12"
          sm="8"
          class="grey lighten-5 p-5 my-16"
      >
        <v-alert
            color="blue"
            class="text-center"
            text
        >
          <p class="text-muted m-0">
              <span v-if="report.status===0" class=" badge mx-2">
                              BEKLİYOR
                    </span>
            <span v-else-if="report.status===1" class="report-status-open badge mx-2">
                              AÇILDI
                    </span>
            <span v-else-if="report.status===2" class="report-status-close badge mx-2">
                              KAPANDI
                    </span>

            <small class="timesTap">{{ reportDate(report.openingDate) }}</small>
          </p>


        </v-alert>

        <v-card class="report-detail-image-card" v-for="image in report.images" :key="image._id">
          <v-img
                 :src="`http://localhost:5000/assets/image/${image.image}`"
                 class="white--text align-end my-4"
                 gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                 max-height="700px"
          >
            <v-card-title>
              <p class="mx-auto">
              {{reportDateLL(report.createdAt)}}     Gönderildi
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
          <p>
             {{report.description}}
          </p>
        </v-alert>
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
              <div style="width: 100%"><iframe width="100%" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=300&amp;hl=en&amp;q=ko%C5%9Fuyolu+(kad%C4%B1k%C3%B6y)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe><a href="https://www.maps.ie/draw-radius-circle-map/">Google radius map</a></div>
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


        <span class="report-detail-location " style="font-weight: 900">Adres:</span> <span> {{report.location.neighborhood}} MH. {{report.location.street}} SK. {{report.location.district}}</span>
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
    console.log(this.$route.params.reportId)
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
</style>