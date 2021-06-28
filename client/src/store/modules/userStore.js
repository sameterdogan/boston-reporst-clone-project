import axios from 'axios'


const userStore = {
    state: {
        user: null,
        users: []
    },
    mutations: {
        INIT_USERS(state,users) {
            state.users = users
        },
        DELETE_USER(state,userId)
        {
            const userIndex=state.users.findIndex(u=>u._id===userId)
            if(userIndex >=0){
                state.users.splice(userIndex,1)
            }
        },
        EDIT_USER(state,editUser){
            const userIndex=state.users.findIndex(u=>u._id===editUser._id)
            if(userIndex >=0){
                state.users.splice(userIndex,1)
                state.users.unshift(editUser)
            }
        }
    },
    actions: {
        initUsers:({commit})=>{
            axios.get("users/all-users")
                .then(res=>{
                    console.log(res)
                    commit("INIT_USERS",res.data.allUsers)
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        deleteUser:({commit},deleteUserId)=>{
            axios.delete(`users/delete-user/${deleteUserId}`)
                .then(res=>{
                    console.log(res)
                    commit("DELETE_USER",deleteUserId)
                    commit("INIT_MESSAGE",{message:res.data.message,color:"success"})
                }).catch(err=>{
                    console.log(err.response)
            })
        },
        editUser:({commit},editUserInfo)=>{
            axios.put(`users/edit-user/${editUserInfo._id}`,editUserInfo)
                .then(res=>{
                    console.log(res)
                    commit("EDIT_USER",res.data.editUser)
                    commit("INIT_MESSAGE",{message:res.data.message,color:"success"})
                }).catch(err=>{
                console.log(err.response)
            })
        },


    },

    getters: {
        getUsers:state=>state.users
    },
}

export default userStore