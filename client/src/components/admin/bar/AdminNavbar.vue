<template>
  <div class="sb-nav-fixed">


    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <!-- Navbar Brand-->
      <router-link
      to="/admin"
      class="navbar-brand ps-3"
      >
        398 BOSTON
      </router-link>
      <!-- Sidebar Toggle-->
      <v-app-bar-nav-icon class="mr-auto"  @click="sidebarToggle" style="color: white;border-bottom: none"></v-app-bar-nav-icon>
      <socket/>
      <!-- Navbar-->
      <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <li>
              <a
              class="dropdown-item btn"
              @click="logout">
                Çıkış Yap
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Socket from "@/components/admin/bar/socket";
export default {
  name: "AdminNavbar",
  components: {Socket},
  methods: {
    sidebarToggle() {
      event.preventDefault();
      document.body.classList.toggle('sb-sidenav-toggled');
      localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    },
    logout(){
      this.$store.dispatch("logout")
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>

</style>