<template>
 <div class="p-3">
   <v-form action="">
     <v-row>
      <v-col
      cols="12">
        <label class="py-3">
          Yer
          <GmapAutocomplete class="mx-5" style="border: 1px solid black" @place_changed="setPlace">
          </GmapAutocomplete>
          <button class="mx-4" @click="usePlace">Ara</button>
        </label>
        <br/>

        <GmapMap style="width: auto; height: 300px;" :zoom="1" :center="{lat: 0, lng: 0}">
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
      </v-col>

     </v-row>
     <v-row>
       <v-col
           cols="8"
       >
         <v-file-input
             multiple
             accept="image/png, image/jpeg, image/bmp"
             placeholder="Resim"
             prepend-icon="mdi-camera"
             label="Resim"
         ></v-file-input>
       </v-col>
     </v-row>
     <v-row>
       <v-col
           cols="8"
       >
         <v-textarea
             solo
             name="input-7-1"
             label="Açıklama"
         ></v-textarea>

       </v-col>
     </v-row>
     <v-row>
       <h4>Muhabir <span class="lead">(Kamuoyu ile paylaşılmayacak)</span></h4>
       <hr>
       <v-col
           cols="8">
         <v-text-field
             label="İsim"
         ></v-text-field>
         <v-text-field
             label="Soyadı"

         ></v-text-field>
         <v-text-field
             label="E-posta"

         ></v-text-field>
         <v-text-field
             label="Telefon"
         ></v-text-field>
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
      markers: [],
      place: null,
    }
  },
  description: 'Autocomplete Example (#164)',
  methods: {
    setDescription(description) {
      this.description = description;
    },
    setPlace(place) {
      this.place = place
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
    }
  }
}
</script>

<style scoped>

</style>