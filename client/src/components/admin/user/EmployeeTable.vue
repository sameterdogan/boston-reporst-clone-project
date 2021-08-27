<template>

  <v-data-table
      :headers="headers"
      :items="employees"
      sort-by="calories"
      class="elevation-1 my-5"

  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>Çalışanlar</v-toolbar-title>
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
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                @click="this.formTitleSet=0"
                v-bind="attrs"
                v-on="on"
            >
              <v-icon
                  small
              >
                {{icons.mdiViewGridPlus}}

              </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-form
                    ref="adminForm"
                    v-model="valid"
                    lazy-validation
                >
                <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6"
                  >
                    <v-text-field
                        v-model="editedItem.name"
                        :rules="nameRules"
                        label="İsim"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6"
                  >
                    <v-text-field
                        v-model="editedItem.lastName"
                        :rules="lastNameRules"
                        label="soyisim"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6"
                  >
                    <v-text-field
                        :rules="emailRules"
                        v-model="editedItem.email"
                        label="E-posta"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6"
                  >
                    <v-text-field

                        v-model="editedItem.phone"
                        :rules="phoneRules"
                        label="Telefon"
                    ></v-text-field>
                  </v-col>

                </v-row>
                </v-form>
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
                  @click="save"
              >
                <span class="">{{ formHandleButton }}</span>
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
<!--      <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>-->
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
import {mdiViewGridPlus  } from "@mdi/js";
export default {
  data: () => ({
    icons:{
      mdiViewGridPlus
    },
    editedIndex: -1,
    dialog: false,
    dialogDelete: false,
    valid:false,
    nameRules: [
      v => !!v || 'İsim alanı boş bırakılamaz',
      v => (v && v.length >= 3) || 'İsim alanı en az 3 karakter olmalı.',
      v => (v && v.length <= 15) || 'İsim alanı en fazla 15 karakter olmalı.',
    ],
    lastNameRules: [
      v => !!v || 'Soyad alanı boş bırakılamaz',
      v => (v && v.length >= 3) || 'Soyad  alanı en az 3 karakter olmalı.',
      v => (v && v.length <= 15) || 'Soyad en fazla 15 karakter olmalı.',
    ],
    emailRules: [
      v => !!v || 'E-posta girilmesi zorunludur.',
      v => /.+@.+/.test(v) || 'E-posta İstenilen biçimde değil.',
    ],
    phoneRules:[
      v => !!v || 'Telefon girilmesi zorunludur.',
        v=> /^(?:\d{2}-\d{3}-\d{3}-\d{3}|\d{11})$/.test(v) || "Telefon numarası istenilen biçimde değil."
    ],
    headers: [
      { text: 'ip', value: 'ip' },
      { text: 'İsim ', value: 'name' },
      { text: 'Soyad', value: 'surname', },
      { text: 'Telefon', value: 'phone' },
      { text: 'E-posta', value: 'email' },
      {text:"Aksiyonlar",value:"actions"}
    ],
    formTitleSet:0,
    deleteAdminId:null,
    editUserId:null,
    editedItem: {
      name: '',
      lastName:'',
      phone: 0,
      email: '',
    },
    defaultItem: {
      name: '',
      lastName:'',
      phone: 0,
      email: '',
    },
  }),

  created () {
    this.initialize()
    this.$store.dispatch('initEmployeesByCategoryId')
  },
  computed: {
    formTitle () {
      return this.formTitleSet !== 1 ? 'Yeni Çalışan ' : 'Admin Düzenle'
    },
    formHandleButton(){
      return this.formTitleSet !== 1 ? 'Ekle ' : 'Kaydet'
    },
    ...mapGetters({ admins: 'getAdmins' }),
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
      this.formTitleSet = 1
      this.dialog = true
    },

    deleteItem (item) {
      console.log(item)
      this.deleteAdminId=item._id
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      console.log(this.deleteAdminId)
      this.$store.dispatch("deleteAdmin",this.deleteAdminId)
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
      if (this.editedIndex > -1) {
/*        this.$store.dispatch("editUser",this.editedItem)*/
      } else {
        this.$store.dispatch("newEmployee", this.editedItem)
      }

      this.close()
    },
  },
}
</script>