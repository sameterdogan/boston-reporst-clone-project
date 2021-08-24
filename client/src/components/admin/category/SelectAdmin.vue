<template>
  <v-card>
    <v-card-title class="text-h5 mb-5" style="font-size: 15px !important;">Bu kategoriye bir Sorumlu atayın </v-card-title>
    <v-card-text>
      <v-row>
        <v-col
            class="d-flex"
            cols="8"
            lg="8"
            sm="12"
        >
          <v-form
              style="width: 100%"
              v-model="valid"
          >
            <v-select
                v-model="adminId"
                :items="admins"
                item-value='_id'
                label="Adminler"
                :rules="AdminRules"

                dense
            >
              <template slot="selection" slot-scope="data">
                <!-- HTML that describe how select should render selected items -->
                {{ data.item.name }}  {{ data.item.surname }}
              </template>
              <template slot="item" slot-scope="data">
                <!-- HTML that describe how select should render items when the select is open -->
                {{ data.item.name }}  {{ data.item.surname }}
              </template>

            </v-select>
          </v-form>


        </v-col>
        <v-col
            cols="4"
            lg="4"
            sm="12"
        >
          <v-btn :disabled="!valid" color="blue darken-1" text @click="assignAdmin">Sorumlu Ata</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "SelectAdmin",
  props:["categoryId"],
  data(){
    return{
      valid:false,
      adminId:null,
      AdminRules:[
        v => !!v || 'Admin seçimi yapmalısın.',
      ]
    }
  },
  created() {
    this.$store.dispatch("initUnassignedAdmins")
  },
  computed:{
    ...mapGetters({admins:"getUnassignedAdmins"})
  },
  watch:{
    '$route' () {
      this.$store.dispatch("initUnassignedAdmins")
    }
  },
  methods:{
    assignAdmin(){
      this.$store.dispatch("assignAdmin",{adminId:this.adminId,categoryId:this.categoryId})
    }
  }

}
</script>

<style scoped>

</style>