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

                    <p class="d-flex">
                      <span class="navbar-span">Aktif Şikayetler </span>
                      <v-badge class="count-badge" color="green">
                             <span slot="badge">   {{activeReports}}</span>
                 <v-icon
                     small
                 >
              {{icons.mdiBellRing}}
            </v-icon>
          </v-badge>
                    </p>
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

                    <p class="d-flex">
                      <span class="navbar-span"> Açılmayı Bekleyen Şikayetler</span>
                           <v-badge class="count-badge" color="green">
                             <span slot="badge">   {{waitingReports}}</span>
                 <v-icon
                     small
                 >
              {{icons.mdiBellRing}}
            </v-icon>
          </v-badge>
                  </p>
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

                    <p class="d-flex">
                      <span class="navbar-span"> Çözülen Şikayetler   </span>
                          <v-badge class="count-badge" color="green">
                             <span slot="badge">  {{solvedReports}}</span>
                 <v-icon
                     small
                 >
              {{icons.mdiBellRing}}
            </v-icon>
          </v-badge>
                     </p>

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
                        small
                >
                  {{ icons.mdiAccountGroup }}
                </v-icon>
                Yöneticiler
              </router-link>
              <router-link
                  v-if="admin.role==='superAdmin' "
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
              <router-link
                  v-if="admin.role==='superAdmin'"
                  to="/admin/statistics"
                  class="nav-link"
              >
                <v-icon aria-hidden="false"
                        class="sb-nav-link-icon"
                        color="white"
                        small
                >
                  {{ icons.mdiChartPie }}
                </v-icon>
                İstatistik
              </router-link>
              <router-link
                  v-if="admin.role==='admin'"
                  to="/admin/employees"
                  class="nav-link"
              >
                <v-icon aria-hidden="false"
                        class="sb-nav-link-icon"
                        color="white"
                        small
                >
                  {{ icons.mdiShape }}
                </v-icon>
                   Personeller

              </router-link>

            </div>
          </div>
          <div class="sb-sidenav-footer">
<!--            <div class="small">Manyak bişi bu ya</div>-->
             098
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
            <div class="d-flex align-items-center justify-content-between ">
              <div class="text-muted"> 2021</div>
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

import {mdiAlertOctagon,mdiChartPie, mdiShape,mdiAccountGroup,mdiBellRing} from '@mdi/js';

import {mapGetters} from "vuex";

export default {
  data() {
    return {
      icons: {
        mdiAlertOctagon, mdiShape,mdiAccountGroup,mdiBellRing,mdiChartPie
      }
    }
  },
  created() {

   if(this.$store.getters.getAdmin.role==="admin") {
     this.$store.dispatch("initActiveReportsByCategoryCount",this.$store.getters.getAdmin.category)
     this.$store.dispatch("initSolvedReportsByCategoryCount",this.$store.getters.getAdmin.category)
     this.$store.dispatch("initWaitingReportsByCategoryCount",this.$store.getters.getAdmin.category)
   }else {
     this.$store.dispatch("initActiveReportsCount")
     this.$store.dispatch("initSolvedReportsCount")
     this.$store.dispatch("initWaitingReportsCount")
   }
  },
  computed:{
    ...mapGetters({admin:"getAdmin"}),
    ...mapGetters({activeReports:"getActiveReportsCount"}),
    ...mapGetters({waitingReports:"getWaitingReportsCount"}),
    ...mapGetters({solvedReports:"getSolvedReportsCount"})
  }
}
</script>

<style >
.navbar-span{
  z-index: 1100;
}
.count-badge{
  position: absolute;
  right: 22px;
}
</style>