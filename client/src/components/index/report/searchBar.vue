<template>
  <v-row
  >
    <v-col
        cols="3"
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
        cols="3"
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
    <v-col
        cols="5">
      <v-select
          item-text="name"
          item-value="value"
          v-model="defaultSelected"
          :items="statusObject"
          @change="statusChange"
      ></v-select>
    </v-col>
{{defaultSelected}}
  </v-row>
</template>

<script>
export default {
  name: "searchBar",
  created() {

    this.search = this.$store.getters.getSearch
    this.status=this.$store.getters.getStatus
    switch (this.status) {
      case "":      this.defaultSelected={name:"Hepsi",value:""}; break
      case "1":      this.defaultSelected={name:"Açık",value:"1"}; break
      case "2":      this.defaultSelected={name:"Kapalı",value:"2"}; break
    }
  },
  data() {
    return {
      search: undefined,
      status:undefined,
      defaultSelected: {
        name: "Hepsi",
        value: ""
      },
      statusObject: [
        {
          name: "Hepsi",
          value: ""
        }
        ,
        {
          name: "Açık",
          value: "1"
        },
        {
          name: "Kapalı",
          value: "2"
        },
      ]
    }
  },
  methods: {
    handleSearch() {
      this.$store.commit("PUBLIC_REPORTS_CHANGE_SEARCH", {title:this.search,status:this.defaultSelected})
      this.$store.commit("PUBIC_REPORTS_CHANGE_PAGINATION", 1)
      this.$store.commit("RESET_PUBLIC_REPORT_PAGINATION_CARD_INFO_ACTIVE_PAGE")
      if (this.$route.name === "reports-by-sub-category") {
        this.$store.dispatch("initReportBySubCategoryId", this.$route.params.subCategoryId)
      } else {
        this.$store.dispatch("initPublicReports")
      }

    },
    statusChange(){
      this.$store.commit("PUBLIC_REPORTS_CHANGE_SEARCH", {title:this.search,status:this.defaultSelected})
      this.$store.commit("PUBIC_REPORTS_CHANGE_PAGINATION", 1)
      this.$store.commit("RESET_PUBLIC_REPORT_PAGINATION_CARD_INFO_ACTIVE_PAGE")
      if (this.$route.name === "reports-by-sub-category") {
        this.$store.dispatch("initReportBySubCategoryId", this.$route.params.subCategoryId)

      } else {
        this.$store.dispatch("initPublicReports")
      }
    }
  },
  watch: {
    '$route' () {
      this.search = this.$store.getters.getSearch
      this.status=this.$store.getters.getStatus
      switch (this.status) {
        case "":      this.defaultSelected={name:"Hepsi",value:""}; break
        case "1":      this.defaultSelected={name:"Açık",value:"1"}; break
        case "2":      this.defaultSelected={name:"Kapalı",value:"2"}; break
      }
    }
  },
}
</script>

<style scoped>

</style>