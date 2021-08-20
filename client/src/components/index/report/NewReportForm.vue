<template>
  <div class="wrapper-row">
    <v-col
        cols="12">

      <GmapAutocomplete
          class="my-4 px-2"
          :options="{fields: ['geometry', 'formatted_address', 'address_components']}"
          name="location"  style="width: 100%;border: 1px solid black" @place_changed="setPlace"
          @keyup.enter="usePlace">
      </GmapAutocomplete>


      <GmapMap style="width: auto; height: 300px;" :zoom="17" :center="map_center">
        <GmapMarker v-for="(marker, index) in markers"
                    :key="index"
                    :position="marker.position"
        />
        <GmapMarker
            v-if="this.place"
            :position="{
                  lat: this.place.geometry.location.lat(),
                 lng: this.place.geometry.location.lng(),
        }"
        />
      </GmapMap>
    </v-col>
    <v-form ref="newReportForm"
            @submit.prevent='handleNewReport'
    >
      <v-row>

        <!--       <v-text-field
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
               ></v-text-field>-->
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
            :rules="fileRules"
            small-chips
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

      <v-row class="my-16">
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
  name: "newReportForm",
  data() {
    return {
      valid: true,
      /*      districtRules: [
              v => !!v || 'İlçe alanı boş bırakılamaz',
            ],
            neighborhoodRules: [
              v => !!v || 'Mahalle alanı boş bırakılamaz',

            ],
            streetRules: [
              v => !!v || 'Sokak alanı boş bırakılamaz',
            ],*/
      titleRules: [
        v => !!v || 'Başlık alanı boş bırakılamaz',
        v => (v && v.length > 5) || 'Başlık alanı en az 5 karakter olmalı.',
      ],
      descriptionRules: [
        v => !!v || 'Açıklama alanı boş bırakılamaz',
        v => (v && v.length > 20) || 'Açıklama alanı en az 20 karakter olmalı.',
      ],
      fileRules:[
        v=>v.length <= 4 || "En fazla 4 resim ekleyebilirsin."
      ],
      markers: [],
      place: null,
      newReport: {
        user: {
          name: "",
          surname: "",
          email: "",
          phone: ""
        },
        category: "",
        subCategory: "",
        title: "",
        description: "",
        province: "",
        district: "",
        neighborhood: "",
        street: "",
        no: null,
        postCode: "",
        address: "",
        lat: null,
        lng: null
        ,
        files: [],
        public: true
      },
      map_center: {lat: 41.015137, lng: 28.979530},


    }
  },
  created() {
    this.newReport.category = this.$route.params.categoryId
  },
  methods: {
    setPlace(place) {
      this.place = place
    },
    usePlace() {
      setTimeout(() => {
      console.log(this.place)
        if (this.place && this.place.address_components) {
          this.resetLocation()
          this.setLocation(this.place.address_components)
          if (this.newReport.street) {
            this.map_center.lat = this.place.geometry.location.lat()
            this.map_center.lng = this.place.geometry.location.lng()
            this.newReport.lat = this.place.geometry.location.lat()
            this.newReport.lng = this.place.geometry.location.lng()
            this.newReport.address = this.place.formatted_address
            this.markers.splice(0, this.markers.length)
            this.markers.push({
              position: {
                lat: this.map_center.lat,
                lng: this.map_center.lng
              }
            })
            this.place = null;
          } else {
            this.$store.commit("INIT_MESSAGE", {message: "Lütfen daha detaylı adres giriş yapınız.", color: "danger"})
          }

        }

      }, 300)

    },
    setLocation(address_components) {
      console.log("gelaşsdş")
      address_components.forEach(comp => {
        switch (comp.types[0]) {
          case "street_number": {
            this.newReport.no = comp.long_name;
            break
          }
          case "administrative_area_level_1": {
            this.newReport.province = comp.long_name;
            break
          }
          case "administrative_area_level_2": {
            this.newReport.district = comp.long_name;
            break
          }
          case "administrative_area_level_4": {
            this.newReport.neighborhood = comp.long_name;
            break
          }
          case "route": {
            this.newReport.street = comp.long_name;
            break
          }
        }
      })
    },
    resetLocation() {

      this.newReport.province = ""
      this.newReport.district = ""
      this.newReport.neighborhood = ""
      this.newReport.street = ""
      this.newReport.no = null
      this.newReport.postCode = ""
      this.newReport.address = ""
      this.newReport.lat = null
      this.newReport.lng = null

    },

    handleNewReport() {
      if (this.$refs.newReportForm.validate()) {
        console.log(this.newReport)
        if (this.newReport.street) {
          const reportForm = new FormData(this.$refs.newReportForm.$el)
          reportForm.append("category", this.$route.params.categoryId)
          reportForm.append("subCategory", this.$route.params.subCategoryId)
          reportForm.append("public", this.newReport.public)
          reportForm.append("district", this.newReport.district)
          reportForm.append("province", this.newReport.province)
          reportForm.append("neighborhood", this.newReport.neighborhood)
          reportForm.append("street", this.newReport.street)
          reportForm.append("address", this.newReport.address)
          reportForm.append("lat", this.newReport.lat)
          reportForm.append("lng", this.newReport.lng)
          console.log(reportForm)
          this.$store.dispatch("newReport", reportForm)
        } else {
          this.$store.commit("INIT_MESSAGE", {message: "Konum girilmesi zorunlu alandır..", color: "danger"})
        }


      }
    },

  },

}
</script>

<style >
.wrapper-row{
  padding: 1rem;
}

@media screen and (max-width: 426px) {
  .wrapper-row{
    padding: .4rem;
  }
}
</style>