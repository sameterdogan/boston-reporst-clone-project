<template>
  <v-app >
    <loading/>
    <component :is='layout'>
      <messages/>
      <router-view></router-view>
    </component>
  </v-app>
</template>

<script>

import Messages from "@/components/messages/Messages";
import Loading from "@/components/loading";
const defaultLayout = 'default'
export default {
  name: 'App',
  components: {
    Loading,
    Messages

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
.container{
  max-width: 1150px !important;
}
.muted{
  color: #999;
}

</style>