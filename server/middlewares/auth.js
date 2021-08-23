import jwt from 'jsonwebtoken'
import AdminModel from "../models/admin"
import CustomError from '../util/CustomError'
import { contentToken, headersCheckToken } from '../util/tokenFragmentation'
export const isLogin =async (req,res,next)=>{
    try {
        if (!headersCheckToken(req))
            return next(new CustomError('Buraya girme iznin yok !', 401))
        const token = contentToken(req)
        const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = await AdminModel.findById(verifiedToken._id)
        req.user.password=null

       return   next()

    } catch (err) {
        console.log(err)
        next(new CustomError('Oturmun süresi dolmuş.', 403))
    }
}
export const isAdmin = async (req, res, next) => {
    try {
        if (!headersCheckToken(req))
            return next(new CustomError('Buraya girme iznin yok !', 401))
        const token = contentToken(req)
        const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.admin = await AdminModel.findById(verifiedToken._id)
        req.admin.password=null

        if(req.admin.role==="admin" || req.admin.role==="superAdmin")  return next()
        return  next(new CustomError('Buraya girme iznin yok !', 401))


    } catch (err) {
        console.log(err)
        next(new CustomError('Oturmun süresi dolmuş.', 403))
    }
}

export const isSuperAdmin=async (req,res,next)=>{
    if(req.admin.role==="superAdmin") return next()
    return  next(new CustomError('Buraya girme iznin yok !', 401))
}


export const isEmployee =async (req,res,next)=>{
    try {
        if (!headersCheckToken(req))
            return next(new CustomError('Buraya girme iznin yok !', 401))
        const token = contentToken(req)
        const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.employee = await AdminModel.findById(verifiedToken._id)
        if(!req.employee) return  next(new CustomError('Buraya girme iznin yok !', 401))
        req.employee.password=null

        if(req.employee.role==="employee")  return next()
        return  next(new CustomError('Buraya girme iznin yok !', 401))
    } catch (err) {
        console.log(err)
        next(new CustomError('Oturmun süresi dolmuş.', 403))
    }
}

