<template>
  <v-data-table
      :headers="headers"
      :items="categories"
      sort-by="calories"
      class="elevation-1 my-5"
  >

    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>kategoriler</v-toolbar-title>
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
                <v-row>
                  <v-form
                      ref="categoryForm"
                      v-model="valid"
                      lazy-validation
                  >
                    <v-text-field
                        v-model="editedItem.category"
                        label="kategori"
                        :rules="categoryRules"

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
        <v-dialog  v-model="subCategoriesDialog"  max-width="500px">
          <sub-category-table :categoryId="subCategoriesDialogId"/>
        </v-dialog>
        <v-dialog  v-model="employeesDialog"  max-width="700px">
          <employees-by-category  :categoryId="employeesDialogId"/>
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
          class="mr-2"
      >
        mdi-delete
      </v-icon
      >
      <v-icon
          class="mr-2"
          small
          @click="showSubCategories(item)">
        {{icons.mdiSubtitles}}
      </v-icon>
      <v-icon

          small
          @click="showEmployees(item)">
        {{icons.mdiAccountMultiple}}
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
import { mdiSubtitles,mdiViewGridPlus,mdiAccountMultiple,mdiAccountPlus   } from "@mdi/js";
import SubCategoryTable from "@/components/admin/category/SubCategoryTable";
import EmployeesByCategory from "@/components/admin/category/EmployeesByCategory";

export default {
  components: {EmployeesByCategory, SubCategoryTable},
  data: () => ({

    //validation
    icons: {
      mdiSubtitles,
      mdiViewGridPlus,
      mdiAccountMultiple,
      mdiAccountPlus
    },
    valid: true,
    categoryRules: [
      v => !!v || 'Kategori alanı boş bırakılamaz',
      v => (v && v.length >= 3) || 'kategori en az 3 karakter olmalı.',
    ],
    //actions
    editDialog: false,
    deleteDialog: false,
    subCategoriesDialog:false,
    subCategoriesDialogId:null,
    employeesDialog:false,
    employeesDialogId:null,
    headers: [
      {text: 'Kategori', value: 'category'},
      {text: "Aksiyonlar", value: "actions"}
    ],
    deleteUserId: null,
    editUserId: null,
    editedIndex: -1,
    editedItem: {
      category: '',
    },
    defaultItem: {
      category: '',
    },
  }),

  created() {
    this.initialize()
    this.$store.dispatch('initCategories')
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Yeni Kategori' : 'Kategori Düzenle'
    },
    ...mapGetters({categories: 'getCategories'}),
  },

  watch: {
    editDialog(val) {
      val || this.close()
    },
    deleteDialog(val) {
      val || this.closeDelete()
    },
/*    subCategoriesDialog(val) {
      val || this.closeSubCategories()
    },*/

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
      this.deleteCategoryId = item._id
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.deleteDialog = true
    },

    deleteItemConfirm() {
      this.$store.dispatch("deleteCategory", this.deleteCategoryId)
      this.closeDelete()
    },

    close() {
      this.editDialog = false
      this.subCategoriesDialog=false
      this.employeesDialog=false
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
          this.$store.dispatch("editCategory", this.editedItem)
        } else {
          this.$store.dispatch("addCategory", this.editedItem)
        }
        this.close()

      }


    },
    showSubCategories(item){
      this.subCategoriesDialogId=item._id
      this.subCategoriesDialog=true
    },
    showEmployees(item){
      this.employeesDialogId=item._id
      this.employeesDialog=true
    }
  },
}
</script>