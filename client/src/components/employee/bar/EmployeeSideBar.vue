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
                      to="/employee/reports/active-reports"
                      class="nav-link"
                  >
                    <v-icon aria-hidden="false"
                            class="sb-nav-link-icon"
                            color="white"
                            small
                    >
                      {{ icons.mdiAlertOctagon }}
                    </v-icon>
                    <p>      Aktif Şikayetler  <span>
                      <v-badge color="green">
                             <span slot="badge">{{employeeActiveReportCount}}</span>
                 <v-icon
                small
            >
              {{icons.mdiBellRing}}
            </v-icon>
          </v-badge>

                    </span></p>
                  </router-link>
                  <router-link
                      to="/employee/reports/solved-reports"
                      class="nav-link"
                  >
                    <v-icon aria-hidden="false"
                            class="sb-nav-link-icon"
                            color="white"
                            small
                    >
                      {{ icons.mdiAlertOctagon }}
                    </v-icon>
                    <p>  Çözülen Şikayetler   <span>
                      <v-badge color="green">
                             <span slot="badge"> {{employeeSolvedReportCount}}</span>
                 <v-icon
                     small
                 >
              {{icons.mdiBellRing}}
            </v-icon>
          </v-badge> </span></p>
                  </router-link>
                </nav>
              </div>
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
            <div class="d-flex align-items-center justify-content-between small">
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

import {mdiAlertOctagon, mdiShape,mdiAccountGroup} from '@mdi/js';
import {mapGetters} from "vuex";

export default {
  name:"employeeSideBar",
  data() {
    return {
      icons: {
        mdiAlertOctagon, mdiShape,mdiAccountGroup
      }
    }
  },
  created() {
    this.$store.dispatch("initEmployeeActiveReportsCount",this.$store.getters.getAdmin._id)
    this.$store.dispatch("initEmployeeSolvedReportsCount",this.$store.getters.getAdmin._id)
  },
  computed:{
    ...mapGetters({employee:"getEmployee"}),
    ...mapGetters({employeeActiveReportCount:"getEmployeeActiveReportsCount"}),
    ...mapGetters({employeeSolvedReportCount:"getEmployeeSolvedReportsCount"})
  }
}
</script>

<style scoped>

</style>