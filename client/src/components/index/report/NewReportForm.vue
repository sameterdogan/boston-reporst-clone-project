<template>
 <div>
   <div>
     <label class="py-3">
       Yer
       <GmapAutocomplete class="mx-5" style="border: 1px solid black" @place_changed="setPlace">
       </GmapAutocomplete>
       <button class="mx-4" @click="usePlace">Ara</button>
     </label>
     <br/>

     <GmapMap style="width: 500px; height: 300px;" :zoom="1" :center="{lat: 0, lng: 0}">
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
   </div>
   <v-row>
     <v-col>
       <v-file-input
           multiple
           :rules="rules"
           accept="image/png, image/jpeg, image/bmp"
           placeholder="Pick an avatar"
           prepend-icon="mdi-camera"
           label="Fotoğraf"
       ></v-file-input>
     </v-col>
   </v-row>
   <v-row>
     <v-col
     >
       <v-textarea
           solo
           name="input-7-1"
           label="Açıklama"
       ></v-textarea>

     </v-col>
   </v-row>
 </div>
</template>

<script>
export default {
  name:"newReportForm",
  data() {
    return {
      rules: [
        value => !value || value.size < 2000000 || 'Resim boyutu çok büyük (en fazla 2 mb) ',
      ],
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