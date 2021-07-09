<template>
  <v-row
      >
    <v-col
        cols="6"
        sm="12"
        md="6"
    >
      <v-text-field
          label="Ara"
          v-model="search"
          placeholder="Başlığa göre ara."
      ></v-text-field>
    </v-col>
    <v-col
        cols="6"
        sm="12"
        md="6"
        class="mt-5"
    >
      <v-btn
          @click="handleSearch"
          depressed>
        Ara
      </v-btn>
    </v-col>

  </v-row>
</template>

<script>
export default {
  name: "searchBar",
  data(){
    return{
      search:""
    }
  },
  methods: {
    handleSearch(){
      this.$store.commit("PUBLIC_REPORTS_CHANGE_SEARCH_TITLE",this.search)
      this.$store.dispatch("initPublicReports")
    }
  }
}
</script>

<style scoped>

</style>