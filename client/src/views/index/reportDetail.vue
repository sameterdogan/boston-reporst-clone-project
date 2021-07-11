<template>
  <v-container>
    {{report}}
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "reportDetail",
  created() {
    console.log(this.$route.params.reportId)
    this.$store.dispatch("initReport",this.$route.params.reportId)
  },
  computed:{
    ...mapGetters({report:"getReport"})
  }
}
</script>

<style scoped>

</style>