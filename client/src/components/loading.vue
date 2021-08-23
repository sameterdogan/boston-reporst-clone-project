<template>
  <div id="overlay"
  :class="{show:loading}">
    <div class="cv-spinner">
   <span class="spinner-text">LÜTFEN BEKLEYİN</span>   <span class="spinner"></span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  name: "loading",
  computed:{
    ...mapGetters({loading:"getLoading"})
  }
}
</script>

<style scoped>
#overlay{
  position: fixed;
  top: 0;
  z-index: 999999;
  width: 100%;
  height:100%;
  display: none;
  background: rgba(0,0,0,0.6);
}
.cv-spinner {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.spinner {
  width: 40px;
  height: 40px;
  border: 4px #ddd solid;
  border-top: 4px #2e93e6 solid;
  border-radius: 50%;
  animation: sp-anime 0.8s infinite linear;
}
.spinner-text {
  margin: 2rem;
  font-size: 1rem;
  font-weight: 800;
  color: white;
  /*  border: 4px #ddd solid;
    border-top: 4px #2e93e6 solid;
    border-radius: 50%;
    animation: sp-anime 0.8s infinite linear;*/
}
@keyframes sp-anime {
  100% {
    transform: rotate(360deg);
  }
}
.is-hide{
  display:none;
}
.hide{
  display: none;
}
.show{
  display: block !important;
}
</style>