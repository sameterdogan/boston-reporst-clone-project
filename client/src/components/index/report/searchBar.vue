<template>
  <v-row
  >
    <v-col
        cols="8"
        sm="12"
        md="10"
        lg="8"
        class="px-2"
    >
      <v-text-field
          label="Ara"
          v-model="search"
          placeholder="Başlığa göre ara."
      ></v-text-field>

    </v-col>
    <v-col
        cols="4"
        sm="12"
        md="2"
        lg="4"
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
  created() {
   this.search=this.$route.query.q
   this.s=this.$route.query.s
   this.p=this.$route.query.p
    this.l=this.$route.query.l

  },
  data() {
    return {
      q:undefined,s:undefined,l:undefined,p:undefined,
      search: undefined,
    }
  },
  methods: {
    handleSearch() {
      console.log(this.s+"s yazıldı")
      if (this.$route.name === "reports-by-sub-category") {
        this.$router.push({name:"reports-by-sub-category",params:{subCategoryId:this.$route.params.subCategoryId},query:{q:this.search,s:this.s.value,p:1,l:this.l}})
      } else {
        this.$router.push({path:"/",query:{q:this.search,s:this.s,p:1,l:this.l}})
      }

    },
/*    statusChange(){

      if (this.$route.name === "reports-by-sub-category") {

        this.$router.push({name:"reports-by-sub-category",params:{subCategoryId:this.$route.params.subCategoryId},query:{q:this.search,s:this.defaultSelected,p:1,l:this.l}})

        /!*      this.$store.commit("PUBLIC_REPORTS_CHANGE_SEARCH", {title:this.search,status:this.defaultSelected})
              this.$store.commit("PUBIC_REPORTS_CHANGE_PAGINATION", 1)
              this.$store.commit("RESET_PUBLIC_REPORT_PAGINATION_CARD_INFO_ACTIVE_PAGE")*!/
        // this.$store.dispatch("initReportBySubCategoryId", this.$route.params.subCategoryId)

      } else {
        this.$router.push({path:"/",query:{q:this.search,s:this.defaultSelected,p:1,l:this.l}})
  /!*      this.$store.dispatch("initPublicReports")*!/
      }
    }*/
  },
  watch: {
    '$route' (to) {
      this.search = to.query.q
      this.s=to.query.s
      this.l=to.query.l
      this.p=to.query.p
      console.log(this.s+ "aaaaaa")
/*      switch (this.s) {
        case "":      this.defaultSelected={name:"Hepsi",value:""}; break
        case "1":      this.defaultSelected={name:"Açık",value:"1"}; break
        case "2":      this.defaultSelected={name:"Kapalı",value:"2"}; break
      }*/
    }
  },
}
</script>

<style scoped>

</style>