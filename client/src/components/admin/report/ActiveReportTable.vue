<template>
  <v-data-table
      :headers="headers"
      :items="reports"
      :search="search"
      class="elevation-1 my-5"

  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>Aktif Şikayetler</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Şikayet Numarasına göre ara"
            single-line
            hide-details
        ></v-text-field>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Bu işlemi geri alamazsın yinede silinsin mi ?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">İptal</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Sil</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogCloseReport" max-width="500px"
        >

          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-form
                      ref="closeReportForm"
                      v-model="valid"
                      lazy-validation
                  >
                    <v-text-field
                        v-model="closeReportDescription"
                        label="Açıklama"
                        :rules="descriptionRules"

                    ></v-text-field>

                  </v-form>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
              >
                İptal
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  :disabled="!valid"
                  @click="validate"
              >
                Şikayeti kapat
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
          small
          @click="closeReport(item)"
          class="mx-2"
      >
        mdi-pencil
      </v-icon>

      <router-link
          :to="{name:'report-detail',params:{reportId:item._id}} "
          target= '_blank'
          class="to-report-detail"
      >
        <v-icon
            small
        >
          {{icons.mdiEye }}
        </v-icon>
      </router-link>
    </template>
    <template v-slot:no-data>
      <v-btn
          color="primary"
          @click="initialize"
      >
        Sıfırla
      </v-btn>
    </template>
    <template v-slot:item.createdAt="{ item }">
      {{ formatDate(item.createdAt) }}
    </template>
    <template v-slot:item.public="{ item }">
      {{ isPublic(item.public) }}
    </template>
    <template v-slot:item.status="{ item }">
      {{ status(item.status) }}
    </template>
  </v-data-table>
</template>

<script>
import {mapGetters} from "vuex";
import moment from "moment";
import { mdiEye } from '@mdi/js';
export default {
  data: () => ({
    icons:{
      mdiEye
    },
    dialog: false,
    dialogDelete: false,
    dialogCloseReport:false,
    headers: [
      {text: "Şikayet Numarası",value: "_id"},
      {text: 'Gizlilik', value: 'public'},
      {text: 'Durum', value: 'status'},
      {text: "İlçe", value: "location.district"},
      {text: "Mahalle", value: "location.neighborhood"},
      {text: "Oluşturulma Tarihi", value: "createdAt"},
      {text: 'İsim ', value: 'user.name'},
      {text: 'Soyad', value: 'user.surname',},
      {text: 'E-posta', value: 'user.email'},
      {text: 'Telefon', value: 'user.phone'},
      {text: "Aksiyonlar", value: "actions"}
    ],
    deleteReportId: null,
    closeReportId: null,
    valid:false,
    closeReportDescription:"",
    descriptionRules:[
      v => !!v || 'Açıklama alanı boş bırakılamaz',
      v => (v && v.length >= 10) || 'Açıklama en az 10 karakter olmalı.',
    ],
    search: '',
  }),

  created() {
    this.initialize()
    this.$store.dispatch('initActiveReports')
  },
  computed: {
    formTitle() {
      return 'Düzenle'
    },
    ...mapGetters({reports: 'getActiveReports'}),
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },


  methods: {
    initialize() {
      this.desserts = []
    },

    formatDate(createdAt) {
      return moment(createdAt).locale("tr").format('LL');
    },
    isPublic(value) {
      return value ? "Halka Açık" : "Halka kapalı"
    },
    status(status) {
      switch (status) {
        case 0:
          return "Bekliyor";
        case 1:
          return "Açık";
        case 2:
          return "Kapalı";
      }
    },
    validate() {

      if (this.$refs.closeReportForm.validate()) {

        this.$store.dispatch("closeReport", {description:this.closeReportDescription,reportId:this.closeReportId})
        this.dialogCloseReport = false
        this.close()

      }


    },
    closeReport(item) {
      this.closeReportId = item._id
      this.dialogCloseReport = true
    },
    ReportConfirm(){
      this.$store.dispatch("openReport",this.openReportId)
      this.dialogOpenReport=false
    },

    deleteItem(item) {
      console.log(item)
      this.deleteReportId = item._id
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.$store.dispatch("deleteReport", this.deleteReportId)
      /*      this.desserts.splice(this.editedIndex, 1)*/
      this.closeDelete()
    },

    close() {
      this.dialogCloseReport = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDialogOpenReport(){
      this.dialogOpenReport=false
    },
    save() {

      this.$store.dispatch("editUser", this.editedItem)
      this.close()
    },
  },
}
</script>