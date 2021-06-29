<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container" style="max-width: 1000px">
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
            <router-link
            to="/"
            class="nav-link">
              Şikayetleri Görüntüle
            </router-link>
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
  name: "Navbar"
}
</script>

<style scoped>

</style>