const express = require('express')
const router = express.Router()
const temporalClientController = require('../controllers/temporalClientController')
const {uploadImageOrDocument} = require('../middlewares/upfile.middleware')

const auth = require('../middlewares/auth.middleware')
const role = require('../middlewares/role.middleware')

//Rutas roles superiores
router.get('/', auth, role(1,2,3),temporalClientController.getAll)
router.get('/id/:id', auth, role(1,2,3),temporalClientController.getById)

//      Filtros
router.get('/name', auth, role(1,2,3),temporalClientController.getByName)
router.get('/lastname', auth, role(1,2,3),temporalClientController.getByLastName)
router.get('/email', auth, role(1,2,3),temporalClientController.getByEmail)
router.get('/document', auth, role(1,2,3),temporalClientController.getByDocument)
router.get('/phone', auth, role(1,2,3),temporalClientController.getByPhone)

//      Creacion, Actualizacion y Eliminacion
router.post('/', auth, role(1,2,3),temporalClientController.create)
router.put('/id/:id', auth, role(1,2,3),temporalClientController.update)
router.put('/licence/id/:id', uploadImageOrDocument('licence'), auth, role(1,2,3), temporalClientController.uploadLicence)
router.put('/soat/id/:id', uploadImageOrDocument('soat'), auth, role(1,2,3), temporalClientController.uploadSoat)
router.delete('/id/:id', auth, role(1,2,3),temporalClientController.deleteTemporalClient)

module.exports = router