const technomecanicModel = require('../models/technomecanicModel')
const { sendEmail } = require('../config/email.config')

const getAll = async(req,res)=>{
    try{
        const technomecanics = await technomecanicModel.getAll()
        if(technomecanics.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'No hay tecnomecanicas registradas'
            })
        }
        res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            tecnomecanicas:technomecanics
        })
    }catch(error){
        res.status(500).json({
            status:'Error',
            mensaje:'Error al obtener las tecnomecanicas'
        })
    }
}

const getById = async(req,res)=>{
    try{
        const {id} = req.params
        const id_technomecanic = id
        const technomecanic = await technomecanicModel.getById(id_technomecanic)
        if(!technomecanic){
            return res.status(404).json({
                status:'Error',
                mensaje:'No se encontro la tecnomecanica'
            })
        }
        res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            tecnomecanica:technomecanic
        })
    }catch(error){
        res.status(500).json({
            status:'Error',
            mensaje:'Error al obtener la tecnomecanica'
        })
    }
}

const getByIdUser = async(req,res)=>{
    try{
        const {id} = req.params
        const id_user = id
        const technomecanics = await technomecanicModel.getByIdUser(id_user)
        if(technomecanics.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'No se encontraron tecnomecanicas para este usuario'
            })
        }
        res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            tecnomecanicas:technomecanics
        })
    }catch(error){
        res.status(500).json({
            status:'Error',
            mensaje:'Error al obtener las tecnomecanicas del usuario'
        })
    }
}

const create = async(req,res)=>{
    try{
        const {id_user, id_temporal_client, id_mechanic, id_vehicle, documents_vehicle, description, last_service_date} = req.body
        if(!id_user || !id_mechanic || !description || !last_service_date){
            return res.status(400).json({
                status:'Error',
                mensaje:'Faltan datos requeridos'
            })
        }
        const client = await technomecanicModel.getUserById(id_user)
        if(!client){
            return res.status(404).json({
                status:'Error',
                mensaje:'No se encontro el cliente'
            })
        }
        const email = client.email
        const mechanic = await technomecanicModel.getMechanicById(id_mechanic)
        if(!mechanic){
            return res.status(404).json({
                status:'Error',
                mensaje:'No se encontro el mecanico'
            })
        }

        console.log(mechanic)
        const technomecanic = await technomecanicModel.create(id_user, id_temporal_client, id_mechanic, id_vehicle, documents_vehicle, description, last_service_date)
        await sendEmail({
            from: `"Soporte" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: 'Tu tecnomecanica ha finalizado',
            text: `Tu tecnomecanica ha finalizado y estos son tus resultados\n\n${description}\n\nSi tienes alguna pregunta comunicate con tu tecnico: ${mechanic.name_user} ${mechanic.lastname_user}, correo: ${mechanic.user_email}`
        })
        res.status(201).json({
            status:'Success',
            mensaje:'Tecnomecanica creada exitosamente',
            tecnomecanica:technomecanic
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            status:'Error',
            mensaje:'Error al crear la tecnomecanica'
        })
    }
}

module.exports = {
    getAll,
    getById,
    getByIdUser,
    create
}