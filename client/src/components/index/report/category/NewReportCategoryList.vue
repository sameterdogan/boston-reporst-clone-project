<template>
  <ul style="list-style-type: none">
  <li v-for="category in categories" :key="category._id">
    <strong>    {{category.category}}</strong>
    <new-report-categories-list-item :subCategories="category.subCategories"/>
  </li>
</ul>
</template>

<script>
import {mapGetters} from "vuex";
import NewReportCategoriesListItem from "@/components/index/report/category/NewReportCategoriesListItem";

export default {
  name: "NewReportCategories",
  components: {NewReportCategoriesListItem},
  created() {
    this.$store.dispatch("initCategories")
  },
  computed:{
    ...mapGetters({categories:"getCategories"})
  }
}
</script>

<style scoped>

</style>