const userModel = require('../models/userModel')


const getAll = async(req,res)=>{
    try{
        const users = await userModel.getAll()
        if(users.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'No hay usuarios registrados'
            })
        }

        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            usuarios:users
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No es posible obtener todos los usuarios'
        })
    }
}

const getById = async(req,res)=>{
    try{
        const {id} = req.params
        const id_user = id
        const user = await userModel.getUserById(id_user)
        if(!user){
            return res.status(404).json({
                status:'Error',
                mensaje:'Usuario no encontrado'
            })
        }
        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            usuario:user
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No es posible obtener el usuario'
        })
    }
}

const getByName = async(req,res)=>{
    try{
        const {name} = req.body
        const user = await userModel.getByName(name)
        if(user.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'Usuario no encontrado'
            })
        }
        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            usuario:user[0]
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No es posible obtener el usuario'
        })
    }
}

const getByLastName = async(req,res)=>{
    try{
        const {lastname} = req.body
        const user = await userModel.getByLastname(lastname)
        if(user.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'Usuario no encontrado'
            })
        }
        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            usuario:user[0]
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No es posible obtener el usuario'
        })
    }
}

const getByEmail = async(req,res)=>{
    try{
        const {email} = req.body
        const user = await userModel.getByEmail(email)
        if(user.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'Usuario no encontrado'
            })
        }
        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            usuario:user[0]
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No es posible obtener el usuario'
        })
    }
}

const getByDocument = async(req,res)=>{
    try{
        const {document} = req.body
        const user = await userModel.getByDocument(document)
        if(user.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'Usuario no encontrado'
            })
        }
        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            usuario:user[0]
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No es posible obtener el usuario'
        })
    }
}

const getByPhone = async(req,res)=>{
    try{
        const {phone} = req.body
        const user = await userModel.getByPhone(phone)
        if(user.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'Usuario no encontrado'
            })
        }
        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            usuario:user[0]
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No es posible obtener el usuario'
        })
    }
}

const update = async(req,res)=>{
    try{

    }catch(error){
        
    }
}
module.exports = {
    getAll,
    getById,
    getByEmail,
    getByName,
    getByLastName,
    getByEmail,
    getByDocument,
    getByPhone
}