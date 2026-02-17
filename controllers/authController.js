const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const register = async(req,res)=>{
    try{
        const {email,password,document} = req.body
        if(!email || !password || !document){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerida toda la informacion'
            })
        }
        const existsUser = await userModel.getByEmail(email)
        if(existsUser.length > 0){
            return res.status(400).json({
                status:'Error',
                mensaje:'Correo en uso'
            })
        }
        const existsDocument = await userModel.getByDocumentExact(document)
        if(existsDocument){
            return res.status(400).json({
                status:'Error',
                mensaje:'Documento en uso'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await userModel.registerUser(3,email, hashedPassword,document)
        return res.status(201).json({
            status:'Success',
            mensaje:'Registro exitoso',
            usuario:user
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo registrar el usuario'
        })
    }
}

const login = async(req,res)=>{
    try{
        const {email,password} = req.body
        const existsUser = await userModel.getByEmail(email)
        if(existsUser.length === 0){
            return res.status(400).json({
                status:'Error',
                mensaje:'Correo no registrado'
            })
        }
        const isMatch = await bcrypt.compare(password, existsUser[0].password)
        if(!isMatch){
            return res.status(400).json({
                status:'Error',
                mensaje:'Contraseña incorrecta'
            })
        }
        const token = jwt.sign({id:existsUser[0].id_user, name:existsUser[0].name, lastname:existsUser[0].lastname,role:existsUser[0].id_role}, process.env.JWT_SECRET, {expiresIn:'1h'})
        return res.status(200).json({
            status:'Success',
            mensaje:'Login exitoso',
            token:token
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo iniciar sesion'
        })
    }
}

module.exports = {
    register,
    login
}