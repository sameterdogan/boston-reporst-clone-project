import axios from "axios";

const adminStore = {
    state: {
        admins: [],
        unassignedAdmins: []
    },
    mutations: {
        INIT_ADMINS(state, admins) {
            state.admins = admins
        },
        NEW_ADMIN(state, newAdmin) {
            state.admins.push(newAdmin)
        },
        DELETE_ADMIN(state, adminId) {
            const adminIndex = state.admins.findIndex(a => a._id === adminId)
            if (adminIndex >= 0) {
                state.admins.splice(adminIndex, 1)
            }
        },
        INIT_UNASSIGNED_ADMINS(state, unassignedAdmin) {
            state.unassignedAdmins = unassignedAdmin
        },
        DELETE_UNASSIGNED_ADMINS(state, adminId) {
            const adminIndex = state.unassignedAdmins.findIndex(a => a._id === adminId)
            if (adminIndex >= 0) {
                state.unassignedAdmins.splice(adminIndex, 1)
            }
        },
        EDIT_ADMIN(state, editAdmin) {
            const adminIndex = state.admins.findIndex(a => a._id === editAdmin._id)
            if (adminIndex >= 0) {
                state.admins.splice(adminIndex, 1)
                state.admins.unshift(editAdmin)
            }
        }
    },
    actions: {
        async initAdmins({commit}) {
            try {
                const res = await axios.get("admins/all-admins")
                commit("INIT_ADMINS", res.data.allAdmins)
            } catch (err) {
                console.log(err.response)
            }
        },
        async initUnassignedAdmins({commit}) {
            try {
                const res = await axios.get("admins/unassigned-admins")
                commit("INIT_UNASSIGNED_ADMINS", res.data.unassignedAdmins)
            } catch (err) {
                console.log(err.response)
            }
        },
        async newAdmin({commit}, adminInfo) {
            try {
                const res = await axios.post("admins/new-admin", adminInfo)
                commit("NEW_ADMIN", res.data.newAdmin)
                commit("INIT_MESSAGE", {message: res.data.message, color: "success"})
                console.log(res.data)
            } catch (err) {
                commit("INIT_MESSAGE", {message: err.response.data.message, color: "danger"})
                console.log(err.response)
            }
        },
        async editAdmin({commit}, adminInfo) {
            try {
                const res = await axios.put("admins/edit-admin", adminInfo)
                commit("EDIT_ADMIN", res.data.editAdmin)
                commit("INIT_MESSAGE", {message: res.data.message, color: "success"})
                console.log(res.data)
            } catch (err) {
                commit("INIT_MESSAGE", {message: err.response.data.message, color: "danger"})
                console.log(err.response)
            }
        },
        async deleteAdmin({commit}, adminId) {
            try {
                const res = await axios.delete(`admins/delete-admin/${adminId}`)
                commit("DELETE_ADMIN", res.data.deleteAdmin._id)
                commit("INIT_MESSAGE", {message: res.data.message, color: "success"})
            } catch (err) {
                commit("INIT_MESSAGE", {message: err.response.data.message, color: "danger"})
                console.log(err.response)
            }
        }
    },
    getters: {
        getAdmins: state => state.admins,
        getUnassignedAdmins:state=>state.unassignedAdmins
    },
}

export default adminStore