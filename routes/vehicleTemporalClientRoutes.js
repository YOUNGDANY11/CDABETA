const express = require('express')
const router = express.Router()

const vehicleTemporalClientController = require('../controllers/vehicleTemporalClientController')
const auth = require('../middlewares/auth.middleware')
const role = require('../middlewares/role.middleware')

//Rutas roles superiores
router.get('/', auth, role(1,2,3), vehicleTemporalClientController.getAll)
router.get('/id/:id', auth, role(1,2,3), vehicleTemporalClientController.getById)
//     Filtros
router.get('/plate',auth, role(1,2,3), vehicleTemporalClientController.getByPlate)
//      Creacion, Actualizacion y Eliminacion
router.post('/', auth, role(1,2,3), vehicleTemporalClientController.create)
router.put('/id/:id', auth, role(1,2,3), vehicleTemporalClientController.update)
router.delete('/id/:id', auth, role(1,2,3), vehicleTemporalClientController.deleteVehicleTemporalClient)
module.exports = router