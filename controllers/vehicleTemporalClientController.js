const vehicleTemporalClientModel = require('../models/vehicleTemporalClientModel')

const getAll = async(req,res)=>{
    try{
        const vehiclesTemporalClients = await vehicleTemporalClientModel.getAll()
        if(vehiclesTemporalClients.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'No se encontraron vehiculos de clientes temporales'
            })      
        }

        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            vehiculos:vehiclesTemporalClients
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener los vehiculos de clientes temporales'
        })
    }
}

const getById = async(req,res)=>{
    try{
        const {id} = req.params
        const id_vehicle_temporal_client = id
        const vehicleTemporalClient = await vehicleTemporalClientModel.getById(id_vehicle_temporal_client)
        if(!vehicleTemporalClient){
            return res.status(404).json({
                status:'Error',
                mensaje:'No se encontro este vehiculo del cliente temporal'
            })      
        }
        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            vehiculo:vehicleTemporalClient
        })
    }catch(error){
        return res.status(500).json({
            status:'Error', 
            mensaje:'No se pudo obtener el vehículo del cliente temporal'
        })
    }
}

const getByPlate = async(req,res)=>{
    try{
        const plate = (req.query?.plate ?? req.body?.plate)
        if(!plate){
            return res.status(400).json({
                status:'Error',
                mensaje:'La placa es requerida'
            })
        }
        const vehicleTemporalClient = await vehicleTemporalClientModel.getByPlate(plate)
        if(!vehicleTemporalClient){
            return res.status(404).json({
                status:'Error',
                mensaje:'No se encontro este vehiculo del cliente temporal'
            })      
        }
        return res.status(200).json({
            status:'Success',
            mensaje:'Consulta exitosa',
            vehiculo:vehicleTemporalClient
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener el vehículo del cliente temporal'
        })
    }
}

const create = async(req,res)=>{
    try{
        const {id_temporal_client,name,plate,brand,model,year,color,tipe} = req.body
        if(!id_temporal_client || !name || !plate || !brand || !model || !year || !color || !tipe){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerida toda la informacion'
            })
        }
        const existsPlate = await vehicleTemporalClientModel.getByPlate(plate)
        if(existsPlate){
            return res.status(400).json({
                status:'Error',
                mensaje:'Placa asociada a otro vehiculo del cliente temporal'
            })
        }
        const vehicleTemporalClient = await vehicleTemporalClientModel.create(id_temporal_client,name,plate,brand,model,year,color,tipe)
        return res.status(201).json({
            status:'Success',
            mensaje:'Vehiculo del cliente temporal creado exitosamente',
            vehiculo:vehicleTemporalClient
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo crear el vehículo del cliente temporal'
        })
    }
}

const update = async(req,res)=>{
    try{
        const {id} = req.params
        const id_vehicle_temporal_client = id
        const {name,plate,brand,model,year,color,tipe} = req.body
        if(!name || !plate || !brand || !model || !year || !color || !tipe){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerida toda la informacion'
            })
        }
        const existsVehicleTemporalClient = await vehicleTemporalClientModel.getById(id_vehicle_temporal_client)
        if(!existsVehicleTemporalClient){
            return res.status(404).json({
                status:'Error',
                mensaje:'No se encontro este vehiculo del cliente temporal'
            })
        }
        const existsPlate = await vehicleTemporalClientModel.getByPlate(plate)
        if(existsPlate && existsPlate.id_vehicle_temporal_client !== id_vehicle_temporal_client){
            return res.status(400).json({
                status:'Error',
                mensaje:'Placa asociada a otro vehiculo del cliente temporal'
            })
        }
        const vehicleTemporalClient = await vehicleTemporalClientModel.update(name,plate,brand,model,year,color,tipe,id_vehicle_temporal_client)
        return res.status(200).json({
            status:'Success',
            mensaje:'Vehiculo del cliente temporal actualizado exitosamente',
            vehiculo:vehicleTemporalClient
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:'Error', 
            mensaje:'No se pudo actualizar el vehículo del cliente temporal'
        })
    }
}

const deleteVehicleTemporalClient = async(req,res)=>{
    try{
        const {id} = req.params
        const id_vehicle_temporal_client = id
        const existsVehicleTemporalClient = await vehicleTemporalClientModel.getById(id_vehicle_temporal_client)
        if(!existsVehicleTemporalClient){   
            return res.status(404).json({
                status:'Error',
                mensaje:'No se encontro este vehiculo del cliente temporal'
            })
        }
        const vehicleTemporalClient = await vehicleTemporalClientModel.deleteVehicleTemporalClient(id_vehicle_temporal_client)
        return res.status(200).json({
            status:'Success',
            mensaje:'Vehiculo del cliente temporal eliminado exitosamente',
            vehiculo:vehicleTemporalClient  
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo eliminar el vehículo del cliente temporal'
        })
    }
}

module.exports = {
    getAll,
    getById,
    getByPlate,
    create,
    update,
    deleteVehicleTemporalClient
}