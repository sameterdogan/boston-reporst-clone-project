import axios from 'axios'


const categoryStore = {
    state: {
        categories: [],
        subCategories: [],
        subCategory: {},
        loading:false
    },
    mutations: {
        INIT_CATEGORIES(state, categories) {
            state.categories = categories
        },
        INIT_SUBCATEGORIES(state, subCategories) {
            state.subCategories = subCategories
        },
        INIT_SUB_CATEGORY(state, subCategory) {
            state.subCategory = subCategory
        },
        ADD_CATEGORY(state, category) {
            state.categories.push(category)
        },
        ADD_SUB_CATEGORY(state, subCategory) {
            console.log(subCategory)
            state.subCategories.push(subCategory)
        },
        DELETE_CATEGORY(state, categoryId) {
            const categoryIndex = state.categories.findIndex(c => c._id === categoryId)
            if (categoryIndex >= 0) {
                state.categories.splice(categoryIndex, 1)
            }
        },
        DELETE_SUB_CATEGORY(state, subCategoryId) {
            const subCategoryIndex = state.subCategories.findIndex(c => c._id === subCategoryId)
            if (subCategoryIndex >= 0) {
                state.subCategories.splice(subCategoryIndex, 1)
            }
        },
        EDIT_CATEGORY(state, editCategory) {
            const categoryIndex = state.categories.findIndex(c => c._id === editCategory._id)
            if (categoryIndex >= 0) {
                state.categories.splice(categoryIndex, 1)
                state.categories.unshift(editCategory)
            }
        },
        EDIT_SUB_CATEGORY(state, editSubCategory) {
            const subCategoryIndex = state.subCategories.findIndex(c => c._id === editSubCategory._id)
            if (subCategoryIndex >= 0) {
                state.subCategories.splice(subCategoryIndex, 1)
                state.subCategories.unshift(editSubCategory)
            }
        },

    },
    actions: {
        initCategories: async ({commit}) => {
            try {
                const res = await axios.get("categories/all-categories")
                console.log(res)
                commit("INIT_CATEGORIES", res.data.allCategories)
            } catch (err) {
                console.log(err.response)
            }

        },
        initSubCategories: async ({commit}, categoryId) => {
            try {
                const res = await axios.get(`categories/${categoryId}/sub-category/sub-categories`)
                commit("INIT_SUBCATEGORIES", res.data.subCategories)
            } catch (err) {
                console.log(err.response)
            }

        },
        initSubCategory: async ({commit}, subCategoryId) => {
            try {
                console.log(subCategoryId)
                const res = await axios.get(`categories/${subCategoryId}`)
                console.log(res)
                commit("INIT_SUB_CATEGORY", res.data.subCategory)
            } catch (err) {
                console.log(err.response)
            }
        },
        addCategory: async ({commit}, category) => {
            try {
                const res = await axios.post("categories/new-category", category)
                commit("ADD_CATEGORY", res.data.newCategory)
                commit("INIT_MESSAGE", {message: res.data.message, color: "success"})

            } catch (err) {
                console.log(err.response)
                commit("INIT_MESSAGE", {message: err.response.data.message, color: "danger"})
            }
        },
        addSubCategory: async ({commit}, subCategoryInfo) => {
            try {
                const res = await axios.post(`categories/${subCategoryInfo.categoryId}/sub-category/new-sub-category`, subCategoryInfo.subCategory)
                commit("ADD_SUB_CATEGORY", res.data.newSubCategory)
                commit("INIT_MESSAGE", {message: res.data.message, color: "success"})

            } catch (err) {
                console.log(err.response)
                commit("INIT_MESSAGE", {message: err.response.data.message, color: "danger"})
            }
        },
        deleteCategory: async ({commit,state}, deleteCategoryId) => {
            try {
                state.loading=true
                const res = await axios.delete(`categories/delete-category/${deleteCategoryId}`)
                state.loading=false
                console.log(res)
                commit("DELETE_CATEGORY", deleteCategoryId)
                commit("INIT_MESSAGE", {message: res.data.message, color: "success"})
            } catch (err) {
                state.loading=false
                commit("INIT_MESSAGE", {message: err.response.data.message, color: "danger"})
                console.log(err.response)
            }
        },
        deleteSubCategory: async ({commit,state}, deleteSubCategoryInfo) => {
            try {
                state.loading=true
                const res = await axios.delete(`categories/${deleteSubCategoryInfo.categoryId}/sub-category/delete-sub-category/${deleteSubCategoryInfo.subCategoryId}`)
                console.log(res)
                state.loading=false
                commit("DELETE_SUB_CATEGORY", deleteSubCategoryInfo.subCategoryId)
                commit("INIT_MESSAGE", {message: res.data.message, color: "success"})
            } catch (err) {
                commit("INIT_MESSAGE", {message: err.response.data.message, color: "danger"})
                console.log(err.response)
            }
        },
        editCategory: async ({commit}, editCategoryInfo) => {
            try {
                const res = await axios.put(`categories/edit-category/${editCategoryInfo._id}`, editCategoryInfo)
                console.log(res)
                commit("EDIT_CATEGORY", res.data.editCategory)
                commit("INIT_MESSAGE", {message: res.data.message, color: "success"})
            } catch (err) {
                commit("INIT_MESSAGE", {message: err.response.data.message, color: "danger"})
                console.log(err.response)
            }
        },
        editSubCategory: async ({commit}, editSubCategoryInfo) => {
            try {
                console.log(editSubCategoryInfo)
                const res = await axios.put(`categories/${editSubCategoryInfo.categoryId}/sub-category/edit-sub-category/${editSubCategoryInfo.subCategory._id}`, editSubCategoryInfo.subCategory)
                console.log(res)
                commit("EDIT_SUB_CATEGORY", res.data.editSubCategory)
                commit("INIT_MESSAGE", {message: res.data.message, color: "success"})
            } catch (err) {
                commit("INIT_MESSAGE", {message: err.response.data.message, color: "danger"})
                console.log(err.response)
            }
        },


    },
    getters: {
        getCategories: state => state.categories,
        getSubCategories: state => state.subCategories,
        getSubCategory:state=>state.subCategory
    },
}

export default categoryStore