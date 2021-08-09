
import AdminModel from "./models/admin"


export default async ()=>{
    const superAdminUserEmail=process.env.SUPER_ADMIN_EMAIL
    const superAdminPassword=process.env.SUPER_ADMIN_PASSWORD
    const superAdminName=process.env.SUPER_ADMIN_NAME
    const superAdminLastName=process.env.SUPER_ADMIN_LAST_NAME
    console.log(await AdminModel.countDocuments({role:"superAdmin"}))
    if(await AdminModel.countDocuments({role:"superAdmin"})===0){
      await  AdminModel.create({name:superAdminName,lastName:superAdminLastName,email:superAdminUserEmail,password:superAdminPassword,role:"superAdmin"})
    }else{
        console.log("Süper admin zaten tanımlanmış")
    }
}
