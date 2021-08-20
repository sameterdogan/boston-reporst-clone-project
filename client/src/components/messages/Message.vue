<template>
  <transition name="fadeAway">
    <v-alert
        color="red"
        dismissible
        elevation="8"
        type="error"
        transition="fade-transition"
        v-if="message.color==='danger'"
    >
      <span v-html="message.message"></span>
    </v-alert>
    <v-alert
        color="green"
        dismissible
        elevation="8"
        type="success"
        v-if="message.color==='success'"

    >
      <span v-html="message.message"></span>

    </v-alert>

  </transition>

</template>

<script>
export default {
  name: 'message',
  props:["message"],
  methods: {
    dismiss() {
      this.$store.commit("DELETE_MESSAGE",this.message.id) ;
    }
  },
}
</script>

<style >
.fadeAway-enter-active {
  transition: all 0.3s ease;
}
.fadeAway-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.fadeAway-leave-to,
.fadeAway-enter {
  opacity: 0;
  transform: translateX(100px);
}
</style>