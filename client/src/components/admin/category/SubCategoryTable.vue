<template>
  <v-data-table
      :headers="headers"
      :items="subCategories"
      sort-by="calories"
      class="elevation-1"
  >

    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title> Alt Kategoriler</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="editDialog" max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            >
            <v-icon
            small>
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
                <v-row>
                  <v-form
                      ref="categoryForm"
                      v-model="valid"
                      lazy-validation
                  >
                    <v-text-field
                        v-model="editedItem.subCategory"
                        label="Alt Kategori"
                        :rules="subCategoryRules"

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
                kaydet
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="deleteDialog" max-width="500px">
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
import {mdiViewGridPlus  } from "@mdi/js";

export default {
  components: {},
  props:["categoryId"],
  data: () => ({
    icons:{
      mdiViewGridPlus
    },
    //validation
    valid: true,
    subCategoryRules: [
      v => !!v || 'Alt kategori alanı boş bırakılamaz',
      v => (v && v.length >= 3) || 'Alt kategori en az 3 karakter olmalı.',
    ],
    //actions
    editDialog: false,
    deleteDialog: false,
    subCategoriesDialog:true,
    headers: [
      {text: 'Alt Kategori', value: 'subCategory'},
      {text: "Aksiyonlar", value: "actions"}
    ],
    deleteUserId: null,
    editUserId: null,
    editedIndex: -1,
    editedItem: {
      subCategory: '',

    },
    defaultItem: {
      subCategory: '',
    },
  }),

  created() {
    this.initialize()
    this.$store.dispatch('initSubCategories',this.categoryId)
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Yeni Alt Kategori' : 'Alt Kategori Düzenle'
    },
    ...mapGetters({subCategories: 'getSubCategories'}),
  },

  watch: {
    editDialog(val) {
      val || this.close()
    },
    deleteDialog(val) {
      val || this.closeDelete()
    },
    categoryId(val){
      this.categoryId=val
      this.$store.dispatch('initSubCategories',this.categoryId)
    }
  },



  methods: {
    initialize() {
      this.desserts = []
    },

    editItem(item) {
      this.editCategoryId = item._id
      this.editedIndex = 1
      this.editedItem = Object.assign({}, item)
      this.editDialog = true
    },

    deleteItem(item) {
      console.log(item)
      this.deleteSubCategoryId = item._id
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.deleteDialog = true
    },

    deleteItemConfirm() {
      this.$store.dispatch("deleteSubCategory", {categoryId:this.categoryId,subCategoryId:this.deleteSubCategoryId})
      /*      this.desserts.splice(this.editedIndex, 1)*/
      this.closeDelete()
    },
    close() {
      this.editDialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
      this.$refs.categoryForm.resetValidation()
      this.$refs.categoryForm.reset()

    },

    closeDelete() {
      this.deleteDialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },


    validate() {

      if (this.$refs.categoryForm.validate()) {
        if (this.editedIndex > -1) {
          console.log(this.subCategory)
          this.$store.dispatch("editSubCategory", {categoryId:this.categoryId,subCategory:this.editedItem})
        } else {
          this.$store.dispatch("addSubCategory", {categoryId:this.categoryId,subCategory:this.editedItem})
        }
        this.close()

      }


    },
  },
}
</script>