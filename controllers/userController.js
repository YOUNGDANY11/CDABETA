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
        console.log(error)
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
        const name = (req.query?.name ?? req.body?.name)
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
        const lastname= (req.query?.lastname ?? req.body?.lastname)
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
        const email = (req.query?.email ?? req.body?.email)
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
        const document = (req.query?.document ?? req.body?.document)
        const users = await userModel.getByDocument(document)
        if(users.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'Usuario no encontrado'
            })
        }
        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            usuario:users
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
        const phone = (req.query?.phone ?? req.body?.phone)
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

const getByUserActive = async(req,res)=>{
    try{
        const {id} = req.user
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

const updateByUserActive = async(req,res)=>{
    try{
        const {id} = req.user
        const id_user = id
        const {name,lastname,email,document,address,country,city,phone,contact_name,contact_phone} = req.body
        if(!name || !lastname || !email || !document || !address || !country || !city || !phone || !contact_name || !contact_phone){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerida toda la informacion'
            })
        }
        const existsUser = await userModel.getUserById(id_user)
        if(!existsUser){
            return res.status(404).json({
                status:'Error',
                mensaje:'Usuario no encontrado'
            })
        }

        const existsDocument = await userModel.getByDocument(document)
        if(existsDocument.length > 0 && existsDocument[0].id_user !== id_user){
            return res.status(400).json({
                status:'Error',
                mensaje:'Documento en uso'
            })
        }

        const existsEmail = await userModel.getByEmail(email)
        if(existsEmail.length > 0 && existsEmail[0].id_user !== id_user){
            return res.status(400).json({
                status:'Error',
                mensaje:'Correo en uso'
            })
        }
        const updatedUser = await userModel.updateByUserActive(name,lastname,email,document,address,country,city,phone,contact_name,contact_phone,id_user)
        return res.status(200).json({
            status:'Success',
            mensaje:'Usuario actualizado',
            usuario:updatedUser
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No es posible actualizar el usuario'
        })
    }
}

const updateUser = async(req,res)=>{
    try{
        const {id} = req.params
        const id_user = id
        const {id_role,name,lastname,email,document,address,country,city,phone,contact_name,contact_phone} = req.body
        if(!id_role || !name || !lastname || !email || !document || !address || !country || !city || !phone || !contact_name || !contact_phone){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerida toda la informacion'
            })
        }
        const existsUser = await userModel.getUserById(id_user)
        if(!existsUser){
            return res.status(404).json({
                status:'Error',
                mensaje:'Usuario no encontrado'
            })
        }

        const existsDocument = await userModel.getByDocument(document)
        if(existsDocument.length > 0 && existsDocument[0].id_user !== id_user){
            return res.status(400).json({
                status:'Error',
                mensaje:'Documento en uso'
            })
        }

        const existsEmail = await userModel.getByEmail(email)
        if(existsEmail.length > 0 && existsEmail[0].id_user !== id_user){
            return res.status(400).json({
                status:'Error',
                mensaje:'Correo en uso'
            })
        }
        const updatedUser = await userModel.update(id_role,name,lastname,email,document,address,country,city,phone,contact_name,contact_phone,id_user)
        return res.status(200).json({
            status:'Success',
            mensaje:'Usuario actualizado',
            usuario:updatedUser
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:'Error',
            mensaje:'No es posible actualizar el usuario'
        })
    }
}

const deleteUser = async(req,res)=>{
    try{
        const {id} = req.params
        const id_user = id
        const existsUser = await userModel.getUserById(id_user)
        if(!existsUser){
            return res.status(404).json({
                status:'Error',
                mensaje:'Usuario no encontrado'
            })
        }
        await userModel.deleteUser(id_user)
        return res.status(200).json({
            status:'Success',
            mensaje:'Usuario eliminado'
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No es posible eliminar el usuario'
        })
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
    getByPhone,
    getByUserActive,
    updateByUserActive,
    updateUser,
    deleteUser
}