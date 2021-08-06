<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #ECAB18">
    <div class="container" style="max-width: 1000px; padding: 0">
      <router-link
          to="/"
          class="navbar-brand">
        DİCİŞİKAYET
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a
            @click="toReports"
            class="nav-link">
              Şikayetleri Görüntüle
            </a>
          </li>
          <li class="nav-item">
            <router-link
                to="/new-report/select-category"
                class="nav-link">
              Şikayet Oluştur
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
                to="/"
                class="nav-link">
             Daha Fazla Bilgi Edinin
            </router-link>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  methods:{
    toReports(){
      this.$store.commit("RESET_PUBLIC_REPORT_PAGINATION_CARD_INFO_ACTIVE_PAGE")
      this.$store.commit("PUBIC_REPORTS_CHANGE_PAGINATION",1)
/*      this.$store.commit("PUBLIC_REPORTS_CHANGE_SEARCH_RESET")*/
      this.$router.push({path:"/",query:{q:"",s:"",p:1,l:10}})
    }
  }
}
</script>

<style scoped>

</style>