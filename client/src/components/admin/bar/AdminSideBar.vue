<template>
  <div class="sb-nav-fixed">

    <div id="layoutSidenav">
      <div id="layoutSidenav_nav">
        <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
          <div class="sb-sidenav-menu">
            <div class="nav">
              <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages"
                 aria-expanded="false" aria-controls="collapsePages">
                <v-icon aria-hidden="false"
                        class="sb-nav-link-icon"
                        color="white"
                        small
                >
                  {{ icons.mdiAlertOctagon }}
                </v-icon>
                Şikayetler
                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
              </a>
              <div class="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                <nav class="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                  <router-link
                      to="/admin/reports/active-reports"
                      class="nav-link"
                  >
                    <v-icon aria-hidden="false"
                            class="sb-nav-link-icon"
                            color="white"
                            small
                    >
                      {{ icons.mdiAlertOctagon }}
                    </v-icon>
                    Aktif Şikayetler
                  </router-link>
                  <router-link
                      to="/admin/reports/waiting-reports"
                      class="nav-link"
                  >
                    <v-icon aria-hidden="false"
                            class="sb-nav-link-icon"
                            color="white"
                            small
                    >
                      {{ icons.mdiAlertOctagon }}
                    </v-icon>
                    Açılmayı Bekleyen Şikayetler
                  </router-link>
                  <router-link
                      to="/admin/reports/solved-reports"
                      class="nav-link"
                  >
                    <v-icon aria-hidden="false"
                            class="sb-nav-link-icon"
                            color="white"
                            small
                    >
                      {{ icons.mdiAlertOctagon }}
                    </v-icon>
                    Çözülen Şikayetler
                  </router-link>
                </nav>
              </div>
              <!--            <div class="sb-sidenav-menu-heading">Addons</div>-->
              <router-link
                  v-if="admin.role==='superAdmin' "
                  :to="{name:'admin-admins'}"
                  class="nav-link"
              >
                <v-icon aria-hidden="false"
                        class="sb-nav-link-icon"
                        color="white"
                >
                  mdi-lock
                </v-icon>
                Yöneticiler
              </router-link>
              <router-link
                  to="/admin-categories"
                  class="nav-link"
              >
                <v-icon aria-hidden="false"
                        class="sb-nav-link-icon"
                        color="white"
                        small
                >
                  {{ icons.mdiShape }}
                </v-icon>
                Kategoriler
              </router-link>

            </div>
          </div>
          <div class="sb-sidenav-footer">
            <div class="small">Manyak bişi bu ya</div>
            Boston 098
          </div>
        </nav>
      </div>
      <div id="layoutSidenav_content">
        <main>
          <div class="container-fluid px-4">
            <slot/>
          </div>
        </main>
        <footer class="py-4 bg-light mt-auto">
          <div class="container-fluid px-4">
            <div class="d-flex align-items-center justify-content-between small">
              <div class="text-muted">Copyright &copy; Your Website 2021</div>
              <div>
                <a href="#">Privacy Policy</a>
                &middot;
                <a href="#">Terms &amp; Conditions</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>


  </div>


</template>

<script>
import {mdiAlertOctagon, mdiShape} from '@mdi/js';
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      icons: {
        mdiAlertOctagon, mdiShape
      }
    }
  },
  computed:{
    ...mapGetters({admin:"getAdmin"})
  }
}
</script>

<style scoped>

</style>