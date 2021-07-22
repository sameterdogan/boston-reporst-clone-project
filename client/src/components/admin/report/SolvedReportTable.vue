<template>
  <v-data-table
      :headers="headers"
      :items="reports"
      sort-by="calories"
      class="elevation-1 my-5"

  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>Şikayetler</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            max-width="500px"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.name"
                        label="İsim"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.surname"
                        label="soyisim"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.phone"
                        label="Telefon"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.email"
                        label="E-posta"
                    ></v-text-field>
                  </v-col>
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
                  @click="save"
              >
                kaydet
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
          color="primary"
          @click="initialize"
      >
        Sıfırla
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'İsim ', value: 'user.name' },
      { text: 'Soyad', value: 'user.surname', },
      { text: 'Durum', value: 'status' },
      { text:"İlçe",value:"location.district"},
      { text:"Mahalle",value:"location.neighborhood"},
      { text: 'E-posta', value: 'user.email' },
      {text:"Oluşturulma Tarihi",value: "createdAt"},
      {text:"Aksiyonlar",value:"actions"}
    ],
    deleteReportId:null,
    editReportId:null,
    editedItem: {
      name: '',
      surname:'',
      state: 0,
      email: '',
    },
    defaultItem: {
      name: '',
      surname:'',
      phone: 0,
      state: '',
    },
  }),

  created () {
    this.initialize()
    this.$store.dispatch('initSolvedReports')
  },
  computed: {
    formTitle () {
      return 'Düzenle'
    },
    ...mapGetters({ reports: 'getSolvedReports' }),
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },



  methods: {
    initialize () {
      this.desserts = []
    },

    editItem (item) {
      this.editUserId=item._id
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      console.log(item)
      this.deleteReportId=item._id
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.$store.dispatch("deleteReport",this.deleteReportId)
      /*      this.desserts.splice(this.editedIndex, 1)*/
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {

      this.$store.dispatch("editUser",this.editedItem)
      this.close()
    },
  },
}
</script>