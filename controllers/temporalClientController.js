const temporalClientModel = require('../models/temporalClientModel')
const fs = require('fs')
const path = require('path')

const ensureDir = async(dir)=>{
    await fs.promises.mkdir(dir, { recursive: true })
}

const moveUploadedFile = async(file, targetDir)=>{
    if(!file || !file.path){
        return null
    }

    await ensureDir(targetDir)
    const targetPath = path.join(targetDir, file.filename)

    if(file.path !== targetPath){
        try{
            await fs.promises.rename(file.path, targetPath)
        }catch(error){
            if(error.code !== 'EXDEV'){
                throw error
            }
            await fs.promises.copyFile(file.path, targetPath)
            await fs.promises.unlink(file.path)
        }
    }

    return path.relative(path.join(__dirname,'..'), targetPath).replace(/\\/g,'/')
}

const deleteFileIfExists = async(filePath)=>{
    if(!filePath){
        return
    }

    const absolutePath = path.isAbsolute(filePath)
        ? filePath
        : path.join(__dirname,'..',filePath)

    try{
        await fs.promises.access(absolutePath, fs.constants.F_OK)
        await fs.promises.unlink(absolutePath)
    }catch(error){
        if(error.code !== 'ENOENT'){
            throw error
        }
    }
}

const getAll = async(req,res)=>{
    try{
        const temporalClients = await temporalClientModel.getAll()
        if(temporalClients.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'No hay clientes temporales registrados'
            })
        }

        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            clientes_temporales:temporalClients
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener los clientes temporales'
        })
    }
}

const getById = async(req,res)=>{
    try{
        const {id} = req.params
        const id_temporal_client = id
        const temporalClient = await temporalClientModel.getById(id_temporal_client)
        if(!temporalClient){
            return res.status(404).json({
                status:'Error',
                mensaje:'Cliente temporal no encontrado'
            })
        }
        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            cliente_temporal:temporalClient
        })
    }
    catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener el cliente temporal'
        })
    
    }
}

const getByName = async(req,res)=>{
    try{
        const name = (req.query?.name ?? req.body?.name)
        if(!name){
            return res.status(400).json({
                status:'Error',
                mensaje:'El nombre es requerido'
            })
        }
        const temporalClient = await temporalClientModel.getByName(name)
        if(temporalClient.length === 0){
            return res.status(404).json({   
                status:'Error',
                mensaje:'Cliente temporal no encontrado'
            })
        }
        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            clientes_temporales:temporalClient
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener el cliente temporal'
        })
    }
}

const getByLastName = async(req,res)=>{
    try{
        const lastname = (req.query?.lastname ?? req.body?.lastname)
        if(!lastname){
            return res.status(400).json({
                status:'Error',
                mensaje:'El apellido es requerido'
            })
        }
        const temporalClient = await temporalClientModel.getByLastName(lastname)
        if(temporalClient.length === 0){
            return res.status(404).json({   
                status:'Error',
                mensaje:'Cliente temporal no encontrado'
            })
        }
        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            clientes_temporales:temporalClient
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener el cliente temporal'
        })
    }
}

const getByEmail = async(req,res)=>{
    try{
        const email = (req.query?.email ?? req.body?.email)
        if(!email){
            return res.status(400).json({
                status:'Error',
                mensaje:'El correo es requerido'
            })
        }
        const temporalClient = await temporalClientModel.getByEmail(email)
        if(temporalClient.length === 0){
            return res.status(404).json({   
                status:'Error',
                mensaje:'Cliente temporal no encontrado'
            })
        }
        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            clientes_temporales:temporalClient
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener el cliente temporal'
        })
    }
}

const getByDocument = async(req,res)=>{
    try{
        const document = (req.query?.document ?? req.body?.document)
        if(!document){
            return res.status(400).json({
                status:'Error',
                mensaje:'El documento es requerido'
            })
        }
        const temporalClient = await temporalClientModel.getByDocument(document)
        if(temporalClient.length === 0){
            return res.status(404).json({   
                status:'Error',
                mensaje:'Cliente temporal no encontrado'
            })
        }
        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            clientes_temporales:temporalClient
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener el cliente temporal'
        })
    }
}

const getByPhone = async(req,res)=>{
    try{
        const phone = (req.query?.phone ?? req.body?.phone)
        if(!phone){
            return res.status(400).json({
                status:'Error',
                mensaje:'El telefono es requerido'
            })
        }
        const temporalClient = await temporalClientModel.getByPhone(phone)
        if(temporalClient.length === 0){
            return res.status(404).json({   
                status:'Error',
                mensaje:'Cliente temporal no encontrado'
            })
        }
        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            clientes_temporales:temporalClient
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener el cliente temporal'
        })
    }
}

const create = async(req,res)=>{
    try{
        const {name,lastname,email,document,address,country,city,phone,contact_name,contact_phone} = req.body
        if(!name || !lastname || !email || !document || !address || !country || !city || !phone || !contact_name || !contact_phone){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerida toda la informacion'
            })
        }
        const existsEmail = await temporalClientModel.getByEmailExact(email)
        if(existsEmail){
            return res.status(400).json({
                status:'Error',
                mensaje:'El email ya esta registrado'
            })
        }
        const existsDocument = await temporalClientModel.getByDocumentExact(document)
        if(existsDocument){
            return res.status(400).json({
                status:'Error',
                mensaje:'El documento ya esta registrado'
            })
        }

        const temporalClient = await temporalClientModel.create(name,lastname,email,document,address,country,city,phone,contact_name,contact_phone)    
        return res.status(201).json({
            status:'Success',
            mensaje:'Cliente temporal creado exitosamente',
            cliente_temporal:temporalClient
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo crear el cliente temporal'
        })
    }
}

const uploadLicence = async(req,res)=>{
    try{
        const {id} = req.params
        const id_temporal_client = id
        const file = req.file

        const existsCliente = await temporalClientModel.getById(id_temporal_client)
        if(!existsCliente){
            return res.status(404).json({
                status:'Error',
                mensaje:'No existe este cliente temporal'
            })
        }

        if(!file){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerida la licencia'
            })
        }

        const licenceDir = path.join(__dirname,'..','uploads','licences')
        const licencePath = await moveUploadedFile(file, licenceDir)
        const temporalClient = await temporalClientModel.updateLicense(licencePath,id_temporal_client)
        return res.status(201).json({
            status:'Success',
            mensaje:'Ingreso de licencia exitoso',
            cliente_temporal:temporalClient
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No fue posible actualizar o ingresar la licencia'
        })
    }
}

const uploadSoat = async(req,res)=>{
    try{
        const {id} = req.params
        const id_temporal_client = id
        const file = req.file

        const existsCliente = await temporalClientModel.getById(id_temporal_client)
        if(!existsCliente){
            return res.status(404).json({
                status:'Error',
                mensaje:'No existe este cliente temporal'
            })
        }

        if(!file){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerido el soat'
            })
        }

        const soatDir = path.join(__dirname,'..','uploads','soats')
        const soatPath = await moveUploadedFile(file, soatDir)
        const temporalClient = await temporalClientModel.updateSoat(soatPath,id_temporal_client)
        return res.status(201).json({
            status:'Success',
            mensaje:'Ingreso de soat exitoso',
            cliente_temporal:temporalClient
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No fue posible actualizar o ingresar la licencia'
        })
    }
}

const update = async(req,res)=>{
    try{
        const {id} = req.params
        const id_temporal_client = id
        const {name,lastname,email,document,address,country,city,phone,contact_name,contact_phone} = req.body
        if(!name || !lastname || !email || !document || !address || !country || !city || !phone || !contact_name || !contact_phone){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerida toda la informacion'
            })
        }

        const existsCliente = await temporalClientModel.getById(id_temporal_client)
        if(!existsCliente){
            return res.status(404).json({
                status:'Error',
                mensaje:'No existe este cliente temporal'
            })
        }

        const existsEmail = await temporalClientModel.getByEmailExact(email)
        if(existsEmail && existsEmail.id_temporal_client !== id_temporal_client){
            return res.status(400).json({
                status:'Error',
                mensaje:'El email ya esta registrado'
            })
        }
        const existsDocument = await temporalClientModel.getByDocumentExact(document)
        if(existsDocument && existsDocument.id_temporal_client !== id_temporal_client){
            return res.status(400).json({
                status:'Error',
                mensaje:'El documento ya esta registrado'
            })
        }

        const temporalClient = await temporalClientModel.update(name,lastname,email,document,address,country,city,phone,contact_name,contact_phone,id_temporal_client)
        return res.status(201).json({
            status:'Success',
            mensaje:'Actualizacion del cliente temporal exitosa',
            cliente_temporal:temporalClient
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No es posible actualizar el cliente temporal'
        })
    }
}

const deleteTemporalClient = async(req,res)=>{
    try{
        const {id} = req.params
        const id_temporal_client = id
        const existsCliente = await temporalClientModel.getById(id_temporal_client)
        if(!existsCliente){
            return res.status(404).json({   
                status:'Error',
                mensaje:'No existe este cliente temporal'
            })
        }
        await deleteFileIfExists(existsCliente.license)
        await deleteFileIfExists(existsCliente.soat)
        const temporalClient = await temporalClientModel.deleteTemporalClient(id_temporal_client)
        return res.status(200).json({
            status:'Success',
            mensaje:'Cliente temporal eliminado exitosamente',
            cliente_temporal:temporalClient
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo eliminar el cliente temporal'
        })
    }
}

module.exports = {
    getAll,
    getById,
    getByName,
    getByLastName,
    getByEmail,
    getByDocument,
    getByPhone,
    create,
    uploadLicence,
    uploadSoat,
    update,
    deleteTemporalClient
}