<template>
    <v-col cols="12">
      <v-row>

        <v-col
        cols="12"
        >
          <router-link
          :to="{name:'report-detail',params:{reportId:publicReport._id}}"
          class="to-report-detail"
          >
            <div class="card report-card" style="">
              <div v-if="publicReport.images.length>0" class="row g-0">
                <div class="col-8 col-sm-8 col-md-10">
                  <div class="card-body">
                    <h5 class="card-title report-title">    {{ publicReport.title }}</h5>
                    <p class="card-text report-description line-clamp">{{ publicReport.description }}</p>
                    <p class="card-text">
                    <span v-if="publicReport.status===0" class=" badge mx-2">
                              BEKLİYOR
                    </span>
                      <span v-else-if="publicReport.status===1" class="report-status-open badge mx-2">
                              AÇILDI
                    </span>
                      <span v-else-if="publicReport.status===2" class="report-status-close badge mx-2">
                              KAPANDI
                    </span>
                      <small v-if="publicReport.status===1" class="timesTap"> {{reportDate(publicReport.openingDate)}} #{{publicReport._id.slice(0,6)}}</small>
                      <small v-if="publicReport.status===2" class="timesTap">{{reportDate(publicReport.closingDate)}}  #{{publicReport._id.slice(0,6)}}</small>
                    </p>
                  </div>
                </div>
                <div class="col-4 col-sm-4 col-md-2">
                  <img v-if="publicReport.images.length>0" :src="`http://localhost:5000/assets/thumbnailImage/${publicReport.images[0].thumbnail}`" class="img-fluid rounded-start report-img"  alt="...">
                </div>
              </div>

              <div  v-if="publicReport.images.length===0" class="row g-0">
                <div class="col-md-12">
                  <div class="card-body">
                    <h5 class="card-title report-title">    {{ publicReport.title }}</h5>
                    <p class="card-text report-description line-clamp">{{ publicReport.description }}</p>
                    <p class="card-text">
                    <span v-if="publicReport.status===0" class=" badge mx-2">
                              BEKLİYOR
                    </span>
                      <span v-else-if="publicReport.status===1" class="report-status-open badge mx-2">
                              AÇILDI
                    </span>
                      <span v-else-if="publicReport.status===2" class="report-status-close badge mx-2">
                              KAPANDI
                    </span>
                      <small class="timesTap">{{reportDate(publicReport.createdAt)}}  #{{publicReport._id.slice(0,6)}}</small>
                    </p>
                  </div>
                </div>
<!--                <div class="col-md-2">

                  <img v-if="publicReport.images.length>0" :src="`http://localhost:5000/assets/thumbnailImage/${publicReport.images[0].thumbnail}`" class="img-fluid rounded-start report-img"  alt="...">
                </div>-->
              </div>
            </div>
          </router-link>

        </v-col>

      </v-row>
    </v-col>

</template>

<script>
import moment from "moment"
export default {
  name: "publicReportListItem",
  props: ["publicReport"],
  methods:{
    reportDate(date){
      console.log()
    return   moment(date).locale("tr").fromNow()
    }
  }

}
</script>

<style scoped>
.report-title{
  line-height: 22px;
  font-size: 16px;
  font-weight: bold;
  color: #333 !important;
  margin-bottom: 0.5em;
  overflow: hidden; /* taşanları gizle */
  white-space: nowrap; /* alt satıra hiç inme */
  text-overflow: ellipsis; /* eğer uzunsa üç nokta koy */
  text-transform: capitalize;
  text-decoration: none;
}
.report-description{
  overflow: hidden; /* taşanları gizle */
  text-overflow: ellipsis; /* eğer uzunsa üç nokta koy */
  line-height: 20px;
  text-align: left;
  color: #444;
}
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.report-card{
  background-color: #FAFAFA !important;
  border: none;
  border-top: solid 1px #97A3A6;
  border-radius: 0;
  transition: all .5s;
}
.report-card:hover{
  background-color: #E3F1FA !important
}
.report-img{
  margin-top: 15px;
  height: 100px;
  width: 100px;
}
.report-status-open{
  background-color: #00A000;
}
.report-status-close{
  background-color: #0080FF;
}
.to-report-detail{
  text-decoration: none!important;
}
.timesTap{
  color: #999!important;
  font-size: 11px;

}
</style>