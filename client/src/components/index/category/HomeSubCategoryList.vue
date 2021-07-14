<template>
  <div>
    <v-card class="grey lighten-3 py-5 px-5">
      <h6>Kategoriler</h6>
      <ul style="list-style: none">
        <home-sub-category-list-item v-for="category in categories" :subCategories="category.subCategories" :key="category._id"/>
      </ul>

    </v-card>
  </div>
</template>

<script>
import HomeSubCategoryListItem from "@/components/index/category/HomeSubCategoryListItem";
import {mapGetters} from "vuex";
export default {
  name: "HomeSubCategoryList",
  components: {HomeSubCategoryListItem},
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