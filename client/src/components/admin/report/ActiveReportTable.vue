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
                        name="description"
                        :rules="descriptionRules"

                    ></v-text-field>

                    <v-file-input
                        multiple
                        accept="image/png, image/jpeg, image/bmp"
                        placeholder="Resim"
                        prepend-icon="mdi-camera"
                        label="Resim"
                        v-model="closeReportForm.files"
                        :rules="fileRules"
                        small-chips
                        name="images"

                    ></v-file-input>
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
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
              small
              @click="closeReport(item)"
              v-bind="attrs"
              v-on="on"
              class="mx-2"
          >
            {{icons.mdiNotePlus }}
          </v-icon>
        </template>
        <span>Şikayeti Kapat</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <router-link
              :to="{name:'report-detail',params:{reportId:item._id}} "
              target= '_blank'
              class="to-report-detail"
          >
            <v-icon
                small
                v-bind="attrs"
                v-on="on"
            >
              {{icons.mdiEye }}
            </v-icon>
          </router-link>
        </template>
        <span>Şikayeti İncele</span>
      </v-tooltip>

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
import { mdiEye,mdiNotePlus } from '@mdi/js';

export default {
  data: () => ({
    icons:{
      mdiEye,
      mdiNotePlus
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
    fileRules:[
      v=>v.length <= 2 || "En fazla 2 resim ekleyebilirsin."
    ],
    search: '',
    closeReportForm:{
      files:[],
      description:""
    }
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
        const closeReportForm = new FormData(this.$refs.closeReportForm.$el)
        this.$store.dispatch("closeReport", {closeReportForm,reportId:this.closeReportId})
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