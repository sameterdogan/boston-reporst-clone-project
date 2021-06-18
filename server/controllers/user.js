import UserModel from "../models/user"

export const newUser = async (req, res, next) => {
    const userInfo = {
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
    }
    try {
        const newUser = await UserModel.create(userInfo)

        res.status(201).json({
            success:true,
            message:"Yeni kullanıcı başarıyla oluşturuldu",
            newUser
        })
    } catch (err) {
           next(err)
    }

}
