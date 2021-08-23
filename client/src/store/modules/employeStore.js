import axios from 'axios'


const employeeStore = {
    state: {
        employeesByCategory: []
    },
    mutations: {
        INIT_EMPLOYEE_BY_CATEGORY_ID(state,employees) {
            state.employeesByCategory = employees
        },
        NEW_EMPLOYEE(state,employee){
            state.employeesByCategory.push(employee)
        },
        DELETE_EMPLOYEE(state,userId)
        {
            const employeesByCategoryIndex=state.employeesByCategory.findIndex(u=>u._id===userId)
            if(employeesByCategoryIndex >=0){
                state.employeesByCategory.splice(employeesByCategoryIndex,1)
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
        initEmployeesByCategoryId:({commit},categoryId)=>{
         return    axios.get(`employees/employees-by-category/${categoryId}`)
                .then(res=>{
                    console.log(res)
                    commit("INIT_EMPLOYEE_BY_CATEGORY_ID",res.data.employeesByCategoryId)
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        newEmployee:({commit},employeeInfo)=>{
            return    axios.post(`employees/new-employee`,employeeInfo)
                .then(res=>{
                    console.log(res)
                    commit("NEW_EMPLOYEE",res.data.newEmployee)
                    commit("INIT_MESSAGE",{message:res.data.message,color:"success"})
                })
                .catch(err=>{
                    commit("INIT_MESSAGE",{message:err.response.data.message,color:"danger"})
                    console.log(err.response)
                })
        },
        deleteEmployee:({commit},deleteEmployeeId)=>{
            axios.delete(`users/delete-employee/${deleteEmployeeId}`)
                .then(res=>{
                    console.log(res)
                    commit("DELETE_EMPLOYEE",deleteEmployeeId)
                    commit("INIT_MESSAGE",{message:res.data.message,color:"success"})
                }).catch(err=>{
                console.log(err.response)
            })
        },




    },

    getters: {
        getEmployeesByCategory:state=>state.employeesByCategory
    },
}

export default employeeStore