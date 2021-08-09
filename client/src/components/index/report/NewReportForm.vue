<template>
 <div class="p-3">
   <v-form ref="newReportForm"
           @submit.prevent='handleNewReport'
   >
     <v-row>

       <input
           id="pac-input"
           class="controls"
           type="text"
           placeholder="Search Box"
       />
       <div id="map"></div>

<!--      <v-col
      cols="12">
        <label class="py-3">
          <GmapAutocomplete name="location" class="mx-5" style="width: 100%;border: 1px solid black" @place_changed="setPlace">
          </GmapAutocomplete>
          <button class="mx-4" @click="usePlace">Ara</button>
        </label>
        <br/>

        <GmapMap style="width: auto; height: 300px;" :zoom="7" :center="{lat: 41.015137, lng: 28.979530}">
          <GmapMarker v-for="(marker, index) in markers"
                      :key="index"
                      :position="marker.position"
          />
          <GmapMarker
              v-if="this.place"
              label="★"
              :position="{
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng(),
        }"
          />
        </GmapMap>
      </v-col>-->
       <v-text-field
           label="ilçe"
           name="district"
           v-model="newReport.location.district"
           :rules="districtRules"
       ></v-text-field>
       <v-text-field
           label="mahalle"
           name="neighborhood"
          :rules="neighborhoodRules"
           v-model="newReport.location.neighborhood"
       ></v-text-field>
       <v-text-field
           label="sokak"
           name="street"
           :rules="streetRules"
           v-model="newReport.location.street"
       ></v-text-field>
       <v-text-field
           label="Başlık"
           name="title"
           :rules="titleRules"
           v-model="newReport.title"
       ></v-text-field>
       <v-file-input
           multiple
           accept="image/png, image/jpeg, image/bmp"
           placeholder="Resim"
           prepend-icon="mdi-camera"
           label="Resim"
           v-model="newReport.files"
           name="images"

       ></v-file-input>
       <v-textarea
           v-model="newReport.description"
           name="description"
           :rules="descriptionRules"
           label="Açıklama"
       ></v-textarea>

       <v-checkbox
           v-model="newReport.public"
           label="Halka Paylaşılsın mı ?"
           color="success"
           hide-details
       ></v-checkbox>

     </v-row>

     <v-row  class="my-16">
       <h4>Şikayet Sahibi <span class="lead">(Halk ile paylaşılmayacak)</span></h4>

       <v-col
           cols="12">
         <v-text-field
             label="İsim"
             name="name"
             v-model="newReport.user.name"
         ></v-text-field>
         <v-text-field
             label="Soyadı"
             name="surname"
             v-model="newReport.user.surname"

         ></v-text-field>
         <v-text-field
             label="E-posta"
             name="email"
             v-model="newReport.user.email"
         ></v-text-field>
         <v-text-field
             name="phone"
             label="Telefon"
             v-model="newReport.user.phone"
         ></v-text-field>
<!--         <v-text-field
             name="category"
             v-model="newReport.category"
         ></v-text-field>-->
       </v-col>
     </v-row>
     <v-btn
         class="mr-4"
         type="submit"
     >
       Gönder
     </v-btn>
   </v-form>


 </div>
</template>

<script>
export default {
  name:"newReportForm",
  data() {
    return {
      valid:true,
      districtRules: [
        v => !!v || 'İlçe alanı boş bırakılamaz',
      ],
      neighborhoodRules: [
        v => !!v || 'Mahalle alanı boş bırakılamaz',

      ],
      streetRules: [
        v => !!v || 'Sokak alanı boş bırakılamaz',
      ],
      titleRules: [
        v => !!v || 'Başlık alanı boş bırakılamaz',
        v => (v && v.length > 5) || 'Başlık alanı en az 5 karakter olmalı.',
      ],
      descriptionRules: [
        v => !!v || 'Açıklama alanı boş bırakılamaz',
        v => (v && v.length > 20) || 'Açıklama alanı en az 20 karakter olmalı.',
      ],
      markers: [],
      place: null,
      newReport:{
        user:{
          name:"",
          surname:"",
          email:"",
          phone:""
        },
        category:"",
        subCategory:"",
        title:"",
        description:"",
        location:{
          district: "",
          neighborhood: "",
          street:""
        },
        files:[],
        public:true
      },


    }
  },
  created() {
    this.newReport.category=this.$route.params.categoryId
  },
  methods: {
/*    setPlace(place) {
      this.place = place
      console.log(this.place)
    },
    usePlace(place) {
      console.log(place)
      if (this.place) {
        this.markers.push({
          position: {
            lat: this.place.geometry.location.lat(),
            lng: this.place.geometry.location.lng(),
          }
        })
        this.place = null;
      }
    },*/
    handleNewReport(){
      if (this.$refs.newReportForm.validate()) {
        console.log(this.newReport)
        const reportForm = new FormData(this.$refs.newReportForm.$el)
        reportForm.append("category",this.$route.params.categoryId)
        reportForm.append("subCategory",this.$route.params.subCategoryId)
        reportForm.append("public",this.newReport.public)
        console.log(reportForm)
        this.$store.dispatch("newReport",reportForm)

      } else {
        console.log("admin true dmnd")
      }
    },

  },

}
</script>

<style scoped>
#map {
  height: 100%;
}

/* Optional: Makes the sample page fill the window. */
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#description {
  font-family: Roboto;
  font-size: 15px;
  font-weight: 300;
}

#infowindow-content .title {
  font-weight: bold;
}

#infowindow-content {
  display: none;
}

#map #infowindow-content {
  display: inline;
}

.pac-card {
  margin: 10px 10px 0 0;
  border-radius: 2px 0 0 2px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  outline: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  font-family: Roboto;
}

#pac-container {
  padding-bottom: 12px;
  margin-right: 12px;
}

.pac-controls {
  display: inline-block;
  padding: 5px 11px;
}

.pac-controls label {
  font-family: Roboto;
  font-size: 13px;
  font-weight: 300;
}

#pac-input {
  background-color: #fff;
  font-family: Roboto;
  font-size: 15px;
  font-weight: 300;
  margin-left: 12px;
  padding: 0 11px 0 13px;
  text-overflow: ellipsis;
  width: 400px;
}

#pac-input:focus {
  border-color: #4d90fe;
}

#title {
  color: #fff;
  background-color: #4d90fe;
  font-size: 25px;
  font-weight: 500;
  padding: 6px 12px;
}

#target {
  width: 345px;
}
</style>