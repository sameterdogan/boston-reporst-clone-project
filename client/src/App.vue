<template>
  <v-app >
    <component :is='layout'>
      <router-view></router-view>
    </component>
  </v-app>
</template>

<script>

const defaultLayout = 'default'
export default {
  name: 'App',

  components: {

  },
  data: () => ({
    //
  }),
  computed: {
    layout() {
      return (this.$route.meta.layout || defaultLayout) + '-layout'
    },
  },
};
</script>

<style lang="css">
@import "assets/css/index.css";
@import "assets/css/styles.css";

</style>